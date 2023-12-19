import { User } from "@/utils/interface";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// creating token and saving in cookies
const getJWTTOKEN = async (user: User) => {
  const tokenData = {
    id: user._id,
    username: user.username,
    email: user.email,
  };

  //create token
  const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  return token;
};

const sentToken = async (user: User, msg: string, statuscode: number) => {
  const token = await getJWTTOKEN(user);

  // options for cookies
  const options = {
    expires: new Date(
      Date.now() + Number(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
  };

  const response = NextResponse.json(
    {
      success: true,
      message: msg,
      user,
      token,
    },
    { status: statuscode }
  );

  response.cookies.set("token", token, options);

  return response;
};

export default sentToken;
