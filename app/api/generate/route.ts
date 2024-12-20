import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { systemPrompt } from "@/lib/prompt";
dotenv.config();

const client = new PrismaClient();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function getContent(userPrompt: string, platform: string) {
  const prompt =
    systemPrompt + "prompt: " + userPrompt + "platform: " + platform;

  const result = await model.generateContent(prompt);

  return result.response.text();
}

export async function POST(req: NextRequest) {
  const { prompt, platform } = await req.json();

  const userObj = await currentUser();

  if (!userObj) {
    return NextResponse.json({
      msg: "Authentication failed",
    });
  }

  const email = userObj?.emailAddresses[0].emailAddress;

  const user = await client.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json({
      msg: "User not found",
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
    content,
  });
}
