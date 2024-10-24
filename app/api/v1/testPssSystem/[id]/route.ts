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
            appRelation: true,
            systemVersion: true,
          },
        },
      },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await req.json();
  try {
    const resultado = await prisma.testPssSystem.update({
      where: {
        id: parseInt(params.id),
      }, // O el identificador que estés usando
      data: {
        assigned: id, // Campo que deseas actualizar
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

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  //const { id, file, comments, status, releaseNote, dateTest } = await req.json();
  const formData = await req.formData();
  const { comments, status, releaseNote, dateTest, file, fileId, srNumber } = Object.fromEntries(formData);
  try {
    const result = await prisma.$transaction(async (prisma) => {
      const testPssSystem = await prisma.testPssSystem.update({
        where: {
          id: parseInt(params.id),
        },
        data: {
          comments: comments.toString() ?? "",
          status: parseInt(status.toString()) ?? 0,
          releaseNote: releaseNote.toString() ?? "no",
          dateTest: new Date(dateTest.toString()) ?? new Date(),
          dateModification: new Date(),
        },
      });
      let attachedInfo;
      if (fileId !== "") {
        attachedInfo = await prisma.testAttachedInfo.update({
          where: {
            id: parseInt(fileId.toString()),
          },
          data: {
            fileName: srNumber + "/" + file.toString(),
          },
        });
      } else {
        attachedInfo = await prisma.testAttachedInfo.create({
          data: {
            fileName: srNumber + "/" + file.toString(),
            testPssSystemRelation: {
              connect: {
                id: testPssSystem.id,
              },
            },
          },
        });
      }
      return { testPssSystem, attachedInfo };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error to update field:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
