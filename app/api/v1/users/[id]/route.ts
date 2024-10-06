import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const result = await prisma.vttsUser.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { filter1, filter2 } = await req.json();
  console.log(filter1, filter2);
  let data = {};
  if (filter1 === undefined && filter2 === undefined) {
    return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
  }
  if (filter1 === "" && filter2 === "") {
    return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
  }
  if (filter1 !== undefined && filter1 != "") {
    data = { ...data, srFilter1: filter1 };
  }
  if (filter2 !== undefined && filter2 != "") {
    data = { ...data, srFilter2: filter2 };
  }

  try {
    const result = await prisma.vttsUser.update({
      where: {
        id: parseInt(params.id),
      },
      data: data,
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update data" }, { status: 500 });
  }
}
