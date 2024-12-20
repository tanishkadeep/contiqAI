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

  const user = await client.user.findUnique({
    where: {
      email: userObj?.emailAddresses[0].emailAddress,
    },
  });

  if (!user) {
    return NextResponse.json({
      points: 100,
    });
  }

  return NextResponse.json({
    points: user?.points,
  });
}
