import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

import { connectDb } from "@/app/api/middleware/mongoose";
import User from "@/app/api/models/user";
import sentToken from "@/app/api/helper/JwtAuthToken";
import { ErrorRes } from "@/app/api/helper/ErrorRes";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectDb();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Please Enter username and password" },
        { status: 400 }
      );
    }

    // check if user exist
    const user = await User.findOne({ email }).select("+password");
    if (!user) return ErrorRes(false, "Invalid email or password.", 401);

    // check if password is correct
    const validatePassword = await bcryptjs.compare(password, user.password);
    if (!validatePassword)
      return ErrorRes(false, "Invalid email or password.", 401);

    const response: NextResponse = await sentToken(
      user,
      "Login Successfull.",
      200
    );

    return response;
  } catch (error: any) {
    return ErrorRes(false, error.message, 500);
  }
}
