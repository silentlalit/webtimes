import { NextRequest, NextResponse } from "next/server";
import { ErrorRes } from "@/app/api/helper/ErrorRes";
import { connectDb } from "@/app/api/middleware/mongoose";
import User from "@/app/api/models/user";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
  } catch (error: any) {
    return ErrorRes(false, error.message, 500);
  }
}
