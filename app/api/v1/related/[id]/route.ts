import { NextResponse } from "next/server";
import type { NextApiRequest } from "next";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const result = await prisma.relatedSr.findUniqueOrThrow({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
  }
}
