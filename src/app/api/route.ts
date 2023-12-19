// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse, NextRequest } from "next/server";

export const GET = (req: NextRequest, res: NextResponse) => {
  return NextResponse.json({ message: "Success" }, { status: 200 });
};
