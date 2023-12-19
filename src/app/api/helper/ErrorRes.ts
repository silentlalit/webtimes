import { NextResponse } from "next/server";

export const ErrorRes = (
  success: boolean,
  errMsg: string,
  statusCode: number
) => {
  return NextResponse.json({ success, error: errMsg }, { status: statusCode });
};
