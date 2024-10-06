import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const orderBy = searchParams.get("orderBy");
  const orderType = searchParams.get("orderType");
  const order = orderBy ? { [orderBy]: orderType } : undefined;
  const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit") || "") : undefined;
  try {
    const result = await prisma.releaseVersion.findMany({
      orderBy: order,
      take: limit,
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
  }
}
