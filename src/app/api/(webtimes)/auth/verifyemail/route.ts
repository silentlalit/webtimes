import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { ErrorRes } from "@/app/api/helper/ErrorRes";
import { connectDb } from "@/app/api/middleware/mongoose";
import User from "@/app/api/models/user";
import sendToken from "@/app/api/helper/JwtAuthToken";

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const { token } = await req.json();

    const newUser = await jwt.verify(token, process.env.ACTIVATION_SECRET_KEY!);

    if (!newUser) {
      return ErrorRes(false, "Invalid token", 400);
    }

    const { email, password, ...otherUser }: any = newUser;

    let isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return ErrorRes(false, "User already exists", 400);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashPassword,
      ...otherUser,
    });

    const response: NextResponse = await sendToken(
      user,
      "Account activated successfully",
      201
    );

    return response;
  } catch (error: any) {
    console.log("error", error);
    return ErrorRes(false, error.message, 400);
  }
}
