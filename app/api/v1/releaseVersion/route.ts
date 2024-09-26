import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const result = await prisma.$queryRaw<Array<{ stage: string; version: string }>>`
  select DISTINCT(r.stage), s.version from SystemVersion s, ReleaseVersion r;`;
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
  }
}
