import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/app/api/middleware/mongoose";
import { ErrorRes } from "@/app/api/helper/ErrorRes";
import Order from "@/app/api/models/order";

// Get order details
export const GET = async (req: NextRequest, { params }: any) => {
  try {
    await connectDb();

    const order = await Order.findById(params.id);

    if (!order)
      return ErrorRes(false, "Something went wrong, Id not found", 400);

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    return ErrorRes(false, error.message, 500);
  }
};

// update order status
export const POST = async (req: NextRequest, { params }: any) => {
  try {
    await connectDb();

    const { status } = await req.json();

    const order = await Order.findById(params.id);

    if (!order)
      return ErrorRes(false, "Something went wrong, Id not found", 400);

    order.status = status;
    order.save();

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    return ErrorRes(false, error.message, 500);
  }
};
