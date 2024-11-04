import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const distinct = searchParams.get("distinct");
  const srNumber = searchParams.get("srNumber");
  const srType = searchParams.get("srType");
  const status = searchParams.get("status");
  const orderBy = searchParams.get("orderBy");
  const orderDirection = searchParams.get("orderDirection");

  const whereClause = {
    srNumber: srNumber ? { contains: srNumber } : undefined,
    srType: srType ? { equals: parseInt(srType) } : undefined,
    statusSr: status ? { equals: status } : undefined,
  };
  const orderByClause = orderBy && orderDirection ? { [orderBy]: orderDirection } : undefined;
  try {
    if (distinct != null && distinct === "true") {
      const result = await prisma.serviceRequest.findMany({
        distinct: ["srNumber"],
        select: {
          srNumber: true,
        },
      });
      return NextResponse.json(result, { status: 200 });
    } else {
      const result = await prisma.serviceRequest.findMany({
        include: {
          srTypeRelation: true,
        },
        where: whereClause,
        orderBy: orderByClause,
      });
      return NextResponse.json(result, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching service request", error);
    return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(req: Request, res: Response) {
  const { srNumber, srType, statusSr, description, externalLink, trelloLink } = await req.json();
  externalLink != "" ? externalLink : undefined;
  trelloLink != "" ? trelloLink : undefined;
  try {
    const result = await prisma.serviceRequest.create({
      data: {
        srNumber,
        statusSr,
        description,
        externalLink,
        trelloLink,
        srTypeRelation: { connect: { id: parseInt(srType) } },
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error creating service request", error);
    return NextResponse.json({ success: false, error: "Failed to create data" }, { status: 500 });
  }
}
