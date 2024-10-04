import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
  // srType=1&equalType=true&system=1&systemVersion=08.00.00&stageVersion=1&equalStageVersion=true&serviceRequest=ISR.1116&user=1&equalUser=true&systemStatus=1&equalSystemStatus=true&releaseNote=YES&
  const { searchParams } = new URL(req.url);
  const srType = searchParams.get("srType");
  const equalType = searchParams.get("equalType");
  const system = searchParams.get("system");
  const systemVersion = searchParams.get("systemVersion");
  const stageVersion = searchParams.get("stageVersion");
  const equalStageVersion = searchParams.get("equalStageVersion");
  const serviceRequest = searchParams.get("serviceRequest");
  const user = searchParams.get("user");
  const equalUser = searchParams.get("equalUser");
  const systemStatus = searchParams.get("systemStatus");
  const equalSystemStatus = searchParams.get("equalSystemStatus");
  const releaseNote = searchParams.get("releaseNote");

  let whereClause = {};
  if (srType) {
    if (equalType === "true") whereClause = { ...whereClause, srType: parseInt(srType) };
    else whereClause = { ...whereClause, srType: { not: parseInt(srType) } };
  }
  if (system) whereClause = { ...whereClause, app: parseInt(system) };
  if (systemVersion) whereClause = { ...whereClause, systemVersionRelation: { version: systemVersion } };
  if (stageVersion) {
    if (equalStageVersion === "true")
      whereClause = { ...whereClause, releaseVersionRelation: { stageRelation: { stage: stageVersion } } };
    else whereClause = { ...whereClause, releaseVersionRelation: { not: { stageRelation: { stage: stageVersion } } } };
  }
  if (serviceRequest) whereClause = { ...whereClause, srNumberRelation: { srNumber: serviceRequest } };
  if (user) {
    if (equalUser === "true") {
      if (user != "999") whereClause = { ...whereClause, assigned: parseInt(user) };
      else whereClause = { ...whereClause, assigned: null };
    } else {
      if (user != "999") whereClause = { ...whereClause, assigned: { not: parseInt(user) } };
      else whereClause = { ...whereClause, assigned: { not: null } };
    }
  }
  if (systemStatus) {
    if (equalSystemStatus === "true") whereClause = { ...whereClause, status: parseInt(systemStatus) };
    else whereClause = { ...whereClause, status: { not: parseInt(systemStatus) } };
  }
  if (releaseNote) whereClause = { ...whereClause, releaseNote: releaseNote };
  console.log(whereClause);
  try {
    const result = await prisma.testPssSystem.findMany({
      include: {
        testAttachedInfo: true,
        srNumberRelation: {
          include: {
            lastTesterRelation: true,
            srTypeRelation: true,
          },
        },
        assignedRelation: true,
        statusRelation: true,
        releaseVersionRelation: {
          include: {
            stageRelation: true,
            systemVersion: true,
            appRelation: true,
          },
        },
      },
      where: whereClause,
      orderBy: {},
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
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
