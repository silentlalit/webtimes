import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/app/api/middleware/mongoose";
import User from "@/app/api/models/user";
import { ErrorRes } from "@/app/api/helper/ErrorRes";

export async function GET(req: NextRequest) {
  try {
    await connectDb();

    const users = await User.find().select("-password");

    if (!users)
      return ErrorRes(
        false,
        "No users is registerd or you are not allowed to access",
        400
      );

    return NextResponse.json({
      success: true,
      message: "Users List is here!",
      data: users,
    });
  } catch (error: any) {
    return ErrorRes(false, error.message, 500);
  }
}
