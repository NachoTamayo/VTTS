import { NextResponse } from "next/server";
import type { NextApiRequest } from "next";
import dbConnect from "@/lib/mongodb";
import TestPssSystem from "@/models/test_pss_system_model";
import type { NextRequest } from "next/server";
import mongoose from "mongoose";

type Data = {
  success: boolean;
  data?: any;
  error?: string;
};

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  await dbConnect();
  try {
    const result = await TestPssSystem.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "test_status",
          localField: "STATUS",
          foreignField: "ID_STATUS",
          as: "status",
        },
      },
      {
        $lookup: {
          from: "service_request",
          localField: "SR_NUMBER",
          foreignField: "SR_NUMBER",
          as: "srNumber",
        },
      },
      {
        $lookup: {
          from: "test_attached_info",
          let: {
            app: "$APP",
            releaseVersion: "$RELEASE_VERSION",
            srNumber: "$SR_NUMBER",
            stage: "$STAGE",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$APP", "$$app"] },
                    { $eq: ["$RELEASE_VERSION", "$$releaseVersion"] },
                    { $eq: ["$SR_NUMBER", "$$srNumber"] },
                    { $eq: ["$STAGE", "$$stage"] },
                  ],
                },
              },
            },
          ],
          as: "attachedInfo",
        },
      },
      {
        $addFields: {
          STATUS: {
            $cond: {
              if: { $isArray: "$status" },
              then: { $arrayElemAt: ["$status.DESC_STATUS", 0] },
              else: "$STATUS",
            },
          },
          SR_NUMBER: {
            $cond: {
              if: { $isArray: "$srNumber" },
              then: { $arrayElemAt: ["$srNumber.DESCRIPTION", 0] },
              else: "$SR_NUMBER",
            },
          },
        },
      },
      {
        $project: {
          statusInfo: 0,
        },
      },
    ]);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
  }
}
