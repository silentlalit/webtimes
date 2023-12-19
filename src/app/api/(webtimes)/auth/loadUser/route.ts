import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/app/api/helper/getDataFromToken";
import { connectDb } from "@/app/api/middleware/mongoose";
import User from "@/app/api/models/user";
import { ErrorRes } from "@/app/api/helper/ErrorRes";

export async function GET(req: NextRequest) {
  try {
    await connectDb();

    const userId = await getDataFromToken(req);

    if (!userId) return;

    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) return ErrorRes(false, "user not found", 400);

    return NextResponse.json({
      success: true,
      message: "loggedIn User found.",
      user,
    });
  } catch (error: any) {
    const response = NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: 500 }
    );

    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  }
}
