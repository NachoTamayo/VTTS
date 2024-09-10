import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import TestPssSystem from "@/models/test_pss_system_model";
import type { NextRequest } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const result = await TestPssSystem.aggregate([
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
      {
        $limit: 40,
      },
    ]);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const test = await TestPssSystem.create(body);
    return NextResponse.json({ success: true, data: test }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create data" }, { status: 400 });
  }
}
