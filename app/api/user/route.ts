import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

const client = new PrismaClient();

export async function GET(req: NextRequest) {
  const userObj = await currentUser();

  if (!userObj) {
    return NextResponse.json({
      msg: "Authentication failed",
    });
  }

  const email = userObj?.emailAddresses[0].emailAddress;

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

  return NextResponse.json({
    msg: "Success",
  });
}
