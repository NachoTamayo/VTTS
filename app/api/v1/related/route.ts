import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";

const prisma = new PrismaClient();

const authenticate = (req: NextRequest) => {
  const token = req.cookies.get("userAuth")?.value || req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET as string) as { id: number };
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const srNumber1 = searchParams.get("srNumber1");
  const srNumber2 = searchParams.get("srNumber2");
  const linkedBy = searchParams.get("linkedBy");
  const orderBy = searchParams.get("orderBy");
  const orderDirection = searchParams.get("orderDirection");

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
  if (orderBy && orderDirection) {
    whereClause = { ...whereClause, orderBy: { [orderBy]: orderDirection } };
  }

  try {
    const result = await prisma.relatedSr.findMany({
      where: whereClause,
      include: {
        srNumber1Relation: true,
        srNumber2Relation: {
          include: {
            srTypeRelation: true,
          },
        },
        linkedByRelation: true,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: Response) {
  const { srNumber1, srNumbers2 } = await req.json();
  const user = authenticate(req);
  const sr2s: string[] = srNumbers2.split(",");

  try {
    const del1 = await prisma.relatedSr.deleteMany({
      where: {
        srNumber1: parseInt(srNumber1),
      },
    });
    const del2 = await prisma.relatedSr.deleteMany({
      where: {
        srNumber2: parseInt(srNumber1),
      },
    });
    sr2s.forEach(async (srNumber2) => {
      const result1 = await prisma.relatedSr.create({
        data: {
          srNumber1: parseInt(srNumber1),
          srNumber2: parseInt(srNumber2),
          linkedBy: user.id,
        },
      });
      const result2 = await prisma.relatedSr.create({
        data: {
          srNumber1: parseInt(srNumber2),
          srNumber2: parseInt(srNumber1),
          linkedBy: user.id,
        },
      });
    });
    return NextResponse.json("success", { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: "Failed to create data" }, { status: 500 });
  }
}
