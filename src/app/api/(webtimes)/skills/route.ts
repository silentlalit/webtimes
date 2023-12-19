// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse, NextRequest } from "next/server";
import Skill from "../../models/skill";
import { connectDb } from "../../middleware/mongoose";
import { ErrorRes } from "../../helper/ErrorRes";
import { deleteImage, uploadImage } from "../../helper/utils";

// GET all Skills
export const GET = async () => {
  try {
    await connectDb();

    const skills = await Skill.find();

    if (!skills) {
      return ErrorRes(false, "Skills not found", 500);
    }

    return NextResponse.json({ success: true, skills }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return ErrorRes(false, error.message, 500);
  }
};

// CREATE a skill
export const POST = async (req: NextRequest) => {
  let ifErrorDelete = "";

  try {
    await connectDb();

    const formData = await req.formData();

    const image: any = formData.get("image");
    if (!image) return ErrorRes(false, "No files received.", 400);

    // upload image
    const filename = await uploadImage("public/upload/", image);
    ifErrorDelete = filename;

    const skillData = Object.fromEntries(formData);
    skillData.technologies = JSON.parse(String(skillData.technologies));
    skillData.workingNow = JSON.parse(String(skillData.workingNow));
    skillData.image = filename;

    const skill = await Skill.create(skillData);

    if (!skill) {
      deleteImage("public/upload/", filename);
      return ErrorRes(false, "Something went wrong!", 400);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Skill created.",
        skill,
      },
      { status: 200 }
    );
  } catch (error: any) {
    deleteImage("public/upload/", ifErrorDelete);
    return ErrorRes(false, error.message, 500);
  }
};
