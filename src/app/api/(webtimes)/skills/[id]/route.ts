import { ErrorRes } from "@/app/api/helper/ErrorRes";
import { deleteImage, uploadImage } from "@/app/api/helper/utils";
import { connectDb } from "@/app/api/middleware/mongoose";
import Skill from "@/app/api/models/skill";
import { NextRequest, NextResponse } from "next/server";

// GET A SINGLE SKILL DETAILS
export const GET = async (req: NextRequest, { params }: any) => {
  try {
    await connectDb();

    const { id } = params;
    const skill = await Skill.findById(id).exec();

    if (!skill) {
      return ErrorRes(false, "id Not found", 400);
    }

    return NextResponse.json({ success: true, skill }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return ErrorRes(false, error.message, 500);
  }
};

// UPDATE a Servces
export const PATCH = async (req: NextRequest, { params }: any) => {
  try {
    await connectDb();

    const formData = await req.formData();
    const { id } = params;

    const image: any = formData.get("image");
    if (!image) return ErrorRes(false, "No file received.", 400);

    const skill = await Skill.findById(id);

    if (!skill) return ErrorRes(false, "skill id Not found", 400);
    const isUpload = skill.image !== image;
    const oldImage = skill.image;

    // upload a thumbmail
    const filename = isUpload
      ? await uploadImage("public/upload/", image)
      : image;

    const skillData = Object.fromEntries(formData);
    skillData.technologies = JSON.parse(String(skillData.technologies));
    skillData.image = filename;

    const updatedSkill = await Skill.findByIdAndUpdate(id, skillData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!updatedSkill) {
      isUpload && deleteImage("public/upload/", filename);

      return ErrorRes(false, "Something went wrong! update failed", 400);
    } else {
      isUpload && deleteImage("public/upload/", oldImage);
    }

    return NextResponse.json(
      { success: true, message: "Skill Updated.", skill: updatedSkill },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return ErrorRes(false, error.message, 500);
  }
};

// DELETE a skill
export const DELETE = async (req: NextRequest, { params }: any) => {
  try {
    await connectDb();

    const { id } = params;
    const skill: any = await Skill.findByIdAndDelete(id);

    if (skill) {
      deleteImage("public/upload/", skill.image);
    }

    return NextResponse.json({
      success: true,
      id: id,
      message: "Skill deleted",
    });
  } catch (error: any) {
    return ErrorRes(false, error.message, 500);
  }
};
