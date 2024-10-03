import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
  try {
    const result = await prisma.testStatus.findMany({
      orderBy: {
        displayOrder: "asc",
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
  }
}
