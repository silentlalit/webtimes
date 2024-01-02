import { NextResponse, NextRequest } from "next/server";
import { ErrorRes } from "../../../helper/ErrorRes";
import Order from "../../../models/order";
import { connectDb } from "@/app/api/middleware/mongoose";

// create order
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectDb();

    const orderData = await req.json();

    const order = await Order.create(orderData);

    if (!order)
      return ErrorRes(false, "Order not created., something went wrong", 400);

    return NextResponse.json({
      success: true,
      message: "Order Created successfilly",
      order,
    });
  } catch (error: any) {
    console.log(error);
    return ErrorRes(false, error.message, 500);
  }
};
