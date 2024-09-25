import { NextResponse } from "next/server";
import type { NextApiRequest } from "next";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Data = {
  success: boolean;
  data?: any;
  error?: string;
};

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const result = await prisma.testPssSystem.findUniqueOrThrow({
      where: {
        id: parseInt(params.id),
      },
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
        releaseVersionRelation: true,
        stageRelation: true,
      },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { ASSIGNED } = await req.json();
  try {
    const resultado = await prisma.testPssSystem.update({
      where: {
        id: parseInt(params.id),
      }, // O el identificador que estés usando
      data: {
        assigned: ASSIGNED, // Campo que deseas actualizar
      },
    });
    // if (!resultado.acknowledged || resultado.modifiedCount === 0) {
    //   return NextResponse.json({ message: "Couldn't update" }, { status: 400 });
    // }

    return NextResponse.json({ message: "SR unlinked successfully" });
  } catch (error) {
    console.error("Error to update field:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
