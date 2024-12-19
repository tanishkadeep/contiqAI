import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const client = new PrismaClient();

async function getUser(email: string) {
  const userExists = await client.user.findUnique({
    where: {
      email,
    },
  });

  if (!userExists) {
    try {
      await client.user.create({
        data: {
          email,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  const user = await client.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

async function getContent(prompt: string, platform: string) {
  return "text";
}

export async function POST(req: NextRequest) {
  const { prompt, platform, email } = await req.json();

  const user = await getUser(email);

  if (!user) {
    return NextResponse.json({
      msg: "Authentication failed",
    });
  }

  if (user.points <= 0) {
    return NextResponse.json({
      msg: "Not enough points",
    });
  }

  const content: string = await getContent(prompt, platform);

  try {
    await client.thread.create({
      data: {
        title: prompt,
        platform,
        content,
        userId: user.id,
      },
    });
  } catch (e) {
    console.log(e);
  }

  try {
    await client.user.update({
      where: {
        id: user.id,
      },
      data: {
        points: user.points - 10,
      },
    });
  } catch (e) {
    console.log(e);
  }

  return NextResponse.json({
    user,
  });
}
