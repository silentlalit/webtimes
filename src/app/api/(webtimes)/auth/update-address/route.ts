import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/app/api/middleware/mongoose";
import { ErrorRes } from "@/app/api/helper/ErrorRes";
import User from "@/app/api/models/user";

export const POST = async (req: NextRequest) => {
  try {
    await connectDb();

    const { _id, ...otherData } = await req.json();

    const user = await User.findById(_id);

    if (!user) return ErrorRes(false, "User not find", 400);

    user.address = otherData;
    user.save();

    return NextResponse.json({
      success: true,
      message: "updated",
      address: user.address,
    });
  } catch (error: any) {
    return ErrorRes(false, error.message, 500);
  }
};
