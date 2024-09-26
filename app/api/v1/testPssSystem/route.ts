import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const result = await prisma.testPssSystem.findMany({
      include: {
        testAttachedInfo: true,
        srTypeRelation: true,
        srNumberRelation: {
          include: {
            lastTesterRelation: true,
          },
        },
        assignedRelation: true,
        statusRelation: true,
        appRelation: true,
        systemVersionRelation: true,
        releaseVersionRelation: {
          include: {
            stageRelation: true,
          },
        },
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const test = await prisma.testPssSystem.create(body);
    return NextResponse.json({ success: true, data: test }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create data" }, { status: 400 });
  }
}
