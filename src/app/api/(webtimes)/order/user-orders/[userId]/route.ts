import { ErrorRes } from "@/app/api/helper/ErrorRes";
import { connectDb } from "@/app/api/middleware/mongoose";
import Order from "@/app/api/models/order";
import { NextRequest, NextResponse } from "next/server";

// get all user orders -- FOR USER
export const GET = async (req: NextRequest, { params }: any) => {
  try {
    await connectDb();
    const { userId } = params;

    const orders = await Order.find({ userId: userId });

    if (!orders) return ErrorRes(false, "Something went wrong!", 400);

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error: any) {
    console.log(error);
    return ErrorRes(false, error.message, 500);
  }
};
