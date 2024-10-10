import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { release } from "os";

const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
  // srType=1&equalType=true&system=1&systemVersion=08.00.00&stageVersion=1&equalStageVersion=true&serviceRequest=ISR.1116&user=1&equalUser=true&systemStatus=1&equalSystemStatus=true&releaseNote=YES&
  const { searchParams } = new URL(req.url);
  const srNumber1 = searchParams.get("srNumber1");
  const srNumber2 = searchParams.get("srNumber2");
  const linkedBy = searchParams.get("linkedBy");

  let whereClause = {};

  if (srNumber1) {
    whereClause = { ...whereClause, srNumber1Relation: { id: parseInt(srNumber1) } };
  }
  if (srNumber2) {
    whereClause = { ...whereClause, srNumber2Relation: { id: parseInt(srNumber2) } };
  }

  if (linkedBy) {
    whereClause = { ...whereClause, linkedByRelation: linkedBy };
  }

  try {
    const result = await prisma.relatedSr.findMany({
      where: whereClause,
      include: {
        srNumber1Relation: true,
        srNumber2Relation: true,
        linkedByRelation: true,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
  }
}
