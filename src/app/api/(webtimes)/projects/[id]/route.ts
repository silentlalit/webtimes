import { NextRequest, NextResponse } from "next/server";
import { ErrorRes } from "@/app/api/helper/ErrorRes";
import { connectDb } from "@/app/api/middleware/mongoose";
import Project from "@/app/api/models/project";
import { uploadImage, deleteImage } from "@/app/api/helper/utils";

// GET A SINGLE Project DETAILS
export const GET = async (req: NextRequest, { params }: any) => {
  try {
    await connectDb();

    const { id } = params;
    const project = await Project.findById({ _id: id }).exec();

    if (!project) {
      return ErrorRes(false, "Id is invalid", 400);
    }

    return NextResponse.json({ success: true, project }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return ErrorRes(false, error.message, 500);
  }
};

// UPDATE a projects
export const PATCH = async (req: NextRequest, { params }: any) => {
  try {
    await connectDb();

    const formData = await req.formData();
    const { id } = params;

    const thumbnail: any = formData.get("thumbnail");
    if (!thumbnail) return ErrorRes(false, "No file received.", 400);

    const project = await Project.findById(id);

    if (!project) return ErrorRes(false, "Project id Not found", 400);
    const isUpload = project.thumbmail === thumbnail;
    const oldThumbnail = project.thumbnail;

    // upload thumbnial
    const filename = isUpload
      ? await uploadImage("public/upload/projects/", thumbnail)
      : thumbnail;

    const projectData = Object.fromEntries(formData);
    projectData.technologies = JSON.parse(String(projectData.technologies));
    projectData.categories = JSON.parse(String(projectData.categories));
    projectData.thumbnail = filename;

    const updatedProject = await Project.findByIdAndUpdate(id, projectData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!updatedProject) {
      isUpload && deleteImage("public/upload/projects/", filename);
      return ErrorRes(false, "Something went wrong! update failed", 400);
    } else {
      isUpload && deleteImage("public/upload/projects/", oldThumbnail);
    }

    return NextResponse.json(
      { success: true, message: "Project Updated.", project: updatedProject },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return ErrorRes(false, error.message, 500);
  }
};

// DELETE a Project
export const DELETE = async (req: NextRequest, { params }: any) => {
  try {
    await connectDb();

    const { id } = params;
    const project: any = await Project.findByIdAndDelete(id);

    if (project) {
      [project.thumbnail, ...project.images].forEach((file) =>
        deleteImage("public/upload/projects/", file)
      );
    }

    return NextResponse.json(
      {
        success: true,
        id: id,
        message: "Project deleted",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return ErrorRes(false, error.message, 500);
  }
};
