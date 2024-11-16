import { NextResponse } from "next/server";
import type { NextApiRequest } from "next";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const result = await prisma.serviceRequest.findUniqueOrThrow({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { srNumber, srType, statusSr, description, externalLink, trelloLink } = await req.json();
    console.log(srNumber, srType, statusSr, description, externalLink, trelloLink);
    const result = await prisma.serviceRequest.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        srNumber: srNumber,
        trelloLink: trelloLink,
        externalLink: externalLink,
        description: description,
        srType: parseInt(srType),
        statusSr: statusSr,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error updating service request", error);
    return NextResponse.json({ success: false, error: "Failed to update data" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Delete tested data about this service request
    //TODO

    // Delete related service requests
    await prisma.relatedSr.deleteMany({
      where: {
        srNumber1: parseInt(params.id),
      },
    });
    await prisma.relatedSr.deleteMany({
      where: {
        srNumber2: parseInt(params.id),
      },
    });
    await prisma.serviceRequest.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting service request", error);
    return NextResponse.json({ success: false, error: "Failed to delete data" }, { status: 500 });
  }
}
