import { NextResponse } from "next/server";
import type { NextApiRequest } from "next";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { get } from "http";

const prisma = new PrismaClient();

type Data = {
  success: boolean;
  data?: any;
  error?: string;
};

function getParams(params: string[]) {
  return {
    APP: params[0],
    RELEASE_VERSION: params[1],
    STAGE: params[2],
    SR_NUMBER: params[3],
  };
}

export async function GET(req: NextRequest, { params }: { params: { params: string[] } }) {
  const paramMap = getParams(params.params);
  try {
    const result = await prisma.tEST_PSS_SYSTEM.findUniqueOrThrow({
      where: {
        SR_NUMBER_APP_RELEASE_VERSION_STAGE: {
          SR_NUMBER: paramMap.SR_NUMBER,
          APP: paramMap.APP,
          RELEASE_VERSION: paramMap.RELEASE_VERSION,
          STAGE: paramMap.STAGE,
        },
      },
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

export async function PATCH(req: NextRequest, { params }: { params: { params: string[] } }) {
  const paramMap = getParams(params.params);
  const { ASSIGNED } = await req.json();
  try {
    const resultado = await prisma.tEST_PSS_SYSTEM.update({
      where: {
        SR_NUMBER_APP_RELEASE_VERSION_STAGE: {
          APP: paramMap.APP,
          SR_NUMBER: paramMap.SR_NUMBER,
          RELEASE_VERSION: paramMap.RELEASE_VERSION,
          STAGE: paramMap.STAGE,
        },
      }, // O el identificador que estés usando
      data: {
        ASSIGNED: ASSIGNED, // Campo que deseas actualizar
      },
    });
    console.log(resultado);
    // if (!resultado.acknowledged || resultado.modifiedCount === 0) {
    //   return NextResponse.json({ message: "Couldn't update" }, { status: 400 });
    // }

    return NextResponse.json({ message: "SR unlinked successfully" });
  } catch (error) {
    console.error("Error to update field:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
