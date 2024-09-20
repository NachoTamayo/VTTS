import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const result = await prisma.tEST_PSS_SYSTEM.findMany({
      include: {
        serviceRequest: true,
        testStatus: true,
        attached: true,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const test = await TestPssSystem.create(body);
    return NextResponse.json({ success: true, data: test }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create data" }, { status: 400 });
  }
}
