import { ErrorRes } from "@/app/api/helper/ErrorRes";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error: any) {
    return ErrorRes(false, error.message, 500);
  }
}
