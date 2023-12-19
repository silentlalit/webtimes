import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../../middleware/mongoose";
import { ErrorRes } from "../../helper/ErrorRes";
import Order from "../../models/order";

// get all orders -- FOR ADMIN
export const GET = async (req: NextRequest) => {
  try {
    await connectDb();

    const orders = await Order.find();

    if (!orders) return ErrorRes(false, "Something went wrong!", 400);

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error: any) {
    return ErrorRes(false, error.message, 500);
  }
};

// get All orders of a user -- User
// export const GET = async (req: NextRequest, res: NextResponse) => {
//   try {
//     const reqCookie = req.cookies;
//     console.log(reqCookie);

//     const orders = await Order.find({ userId: reqCookie });

//     return NextResponse.json({
//       success: true,
//       message: "orders fetched",
//       orders,
//     });
//   } catch (error: any) {
//     return ErrorRes(false, error.message, 500);
//   }
// };
