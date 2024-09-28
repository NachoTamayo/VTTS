import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const distinct = searchParams.get("distinct");
  try {
    if (distinct != null && distinct === "true") {
      const result = await prisma.systemVersion.findMany({
        distinct: ["version"],
        select: {
          version: true,
        },
      });
      return NextResponse.json(result, { status: 200 });
    } else {
      const result = await prisma.systemVersion.findMany({});
      return NextResponse.json(result, { status: 200 });
    }
    const result = await prisma.systemVersion.findMany({});
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
  }
}
