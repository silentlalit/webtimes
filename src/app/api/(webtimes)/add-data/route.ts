import { NextRequest, NextResponse } from "next/server";

import { writeFile, readFile } from "fs/promises";
import path from "path";
import { ErrorRes } from "../../helper/ErrorRes";

export const POST = async (req: NextRequest) => {
  try {
    const { key, data: addData } = await req.json();

    const filePath = path.join(process.cwd(), "src/utils/static/static.json");

    const data = await readFile(filePath, "utf8");

    if (!data) return ErrorRes(false, "Something went wrong", 400);

    const parsedData = JSON.parse(data);

    const isAlreadyExist = parsedData[key].find(
      (data: any) => data.value === addData.value
    );
    if (isAlreadyExist) return ErrorRes(false, "Value already exists", 400);

    parsedData[key].push(addData);

    await writeFile(filePath, JSON.stringify(parsedData, null, 2), "utf8");

    return NextResponse.json(
      { success: true, message: "Success", data: parsedData },
      { status: 201 }
    );
  } catch (error: any) {
    return ErrorRes(false, error.message, 500);
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const p: any = req.nextUrl;
    const { key, value } = JSON.parse(p.searchParams.get("data"));

    const filePath = path.join(process.cwd(), "src/utils/static/static.json");

    const data = await readFile(filePath, "utf8");

    if (!data) return ErrorRes(false, "Something went wrong", 400);

    const parsedData = JSON.parse(data);
    parsedData[key] = parsedData[key].filter(
      (data: any) => data.value !== value
    );

    await writeFile(filePath, JSON.stringify(parsedData, null, 2), "utf8");

    return NextResponse.json(
      { success: true, message: "Success", data: parsedData },
      { status: 200 }
    );
  } catch (error: any) {
    return ErrorRes(false, error.message, 500);
  }
};
