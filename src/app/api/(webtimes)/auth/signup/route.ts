import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { connectDb } from "@/app/api/middleware/mongoose";
import User from "@/app/api/models/user";
import { sendEmail } from "@/app/api/helper/sendMail";
import { ErrorRes } from "@/app/api/helper/ErrorRes";
import { User as UserType } from "@/utils/interface";

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const newUser = await req.json();

    //check if user already exists
    const user = await User.findOne({ email: newUser.email });
    if (user) return ErrorRes(false, "User already exists", 400);

    // verification Token
    const verificationToken = createVarificationToken(newUser);

    // verification Url
    const verificationUrl = `${process.env.APP_URL}/userAuth/verifyemail/${verificationToken}`;

    await sendEmail({
      email: newUser.email,
      subject: "Verification your account",
      message: `<p>Hello ${newUser.name}<p/>, <br/> 
                <p>Click <a href="${verificationUrl}">here</a> to activate your account
            or copy and paste the link below in your browser. <br/> ${verificationUrl}</p>
            <br /> <br />
            <p>This url is valid untill 1 hr ONLY, If you have not initiated this, please ignore the mail.<p/>`,
    });

    return NextResponse.json({
      success: true,
      message: `please check your email:- ${newUser.email} to activate your account!`,
    });
  } catch (error: any) {
    console.log("error", error);
    return ErrorRes(false, error.message, 500);
  }
}

const createVarificationToken = (user: UserType) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET_KEY!, {
    expiresIn: "60m",
  });
};
