// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse, NextRequest } from "next/server";
import { connectDb } from "@/app/api/middleware/mongoose";
import Project from "@/app/api/models/project";
import ApiFeatures from "@/app/api/helper/ApiFeatures";
import { ErrorRes } from "@/app/api/helper/ErrorRes";
import { uploadImage, deleteImage } from "../../helper/utils";

// GET all Projects
export const GET = async (req: NextRequest) => {
  try {
    await connectDb();

    const resultPerPage = 10;
    const projectCount = await Project.countDocuments();

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    // console.log(searchParams);

    const apiFeature = new ApiFeatures(Project.find(), searchParams)
      .search()
      .filter()
      .pagination(resultPerPage);

    const projects = await apiFeature.query;

    return NextResponse.json(
      { success: true, projectCount, projects },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return ErrorRes(false, error.message, 500);
  }
};

// CREATE a project
export const POST = async (req: NextRequest) => {
  try {
    await connectDb();

    const formData = await req.formData();

    const thumbnail: any = formData.get("thumbnail");
    if (!thumbnail) return ErrorRes(false, "No file received.", 400);

    // uploading thumbnail
    const filename = await uploadImage("public/upload/projects/", thumbnail);

    const projectData = Object.fromEntries(formData);
    projectData.technologies = JSON.parse(String(projectData.technologies));
    projectData.categories = JSON.parse(String(projectData.categories));
    projectData.thumbnail = filename;

    const project = await Project.create(projectData);

    if (!project) {
      deleteImage("public/upload/projects/", filename);
      return ErrorRes(false, "Something went wrong!", 400);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Project created.",
        project,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return ErrorRes(false, error.message, 500);
  }
};
