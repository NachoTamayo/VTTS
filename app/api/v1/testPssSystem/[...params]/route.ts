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

export async function GET(req: NextRequest, { params }: { params: { params: string[] } }) {
  const paramMap = {
    APP: params.params[0],
    RELEASE_VERSION: params.params[1],
    STAGE: params.params[2],
    SR_NUMBER: params.params[3],
  };
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

// Method for unlink the tester
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  await dbConnect();

  const objectId = new mongoose.Types.ObjectId(id);

  try {
    const doc = await TestPssSystem.updateOne({ _id: objectId }, { $set: { ASSIGNED: "" } }, { new: true });

    console.log(doc);

    // if (!resultado.acknowledged || resultado.modifiedCount === 0) {
    //   return NextResponse.json({ message: "Couldn't update" }, { status: 400 });
    // }

    return NextResponse.json({ message: "SR unlinked successfully" });
  } catch (error) {
    console.error("Error to update field:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
