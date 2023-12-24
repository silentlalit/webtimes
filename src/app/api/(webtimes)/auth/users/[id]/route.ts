import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/app/api/middleware/mongoose";
import User from "@/app/api/models/user";
import { ErrorRes } from "@/app/api/helper/ErrorRes";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();

    const { id } = params;
    const user = await User.findById(id).select("-password");

    if (!user) return ErrorRes(false, "User not found!", 400);

    return NextResponse.json({
      success: true,
      message: "User is here.",
      data: user,
    });
  } catch (error: any) {
    return ErrorRes(false, error.message, 500);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();

    const userBody = await req.json();
    const { id } = params;

    const user = await User.findByIdAndUpdate({ _id: id }, userBody, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not Updated, something went wrong." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User Updated Successfully",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();

    const { id } = params;

    await User.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "User deleted.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
