import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../../middleware/mongoose";
import { ErrorRes } from "../../helper/ErrorRes";
import ContactUs from "../../models/contactUs";
import { sendEmail } from "../../helper/sendMail";

export const POST = async (req: NextRequest) => {
  try {
    await connectDb();

    const body = await req.json();

    const contactUs = await ContactUs.create(body);

    if (!contactUs) {
      return ErrorRes(false, "Something went wrong, Please try again", 500);
    }

    await sendEmail({
      email: process.env.SMPT_USER,
      subject: "New Message from Webtimes",
      message: `<p>Hello WebTimes, I am ${body.firstName} ${body.lastName}<p/>, <br/> 
                <ul>
                    <li>Name: ${body.firstName} ${body.lastName}</li>
                    <li>Email: ${body.email}</li>
                    <li>PhoneNumber: ${body.phoneNumber}</li>
                    <li>Message: ${body.message}</li>
                </ul>`,
    });

    return NextResponse.json({
      success: true,
      message: "Your Message has been sent Successfully.",
    });
  } catch (error: any) {
    return ErrorRes(false, error.message, 500);
  }
};
