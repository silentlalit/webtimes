import mongoose from "mongoose";

const Schema = mongoose.Schema;

const projectModel = new Schema({
  title: {
    type: String,
    required: [true, "Please enter project title"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please enter project description"],
  },
  categories: [{ label: String, value: String }],
  technologies: [{ label: String, value: String }],
  thumbnail: {
    type: String,
    required: [true, "Please enter project image"],
  },
  images: [
    {
      type: String,
    },
  ],
  github: {
    type: String,
  },
  link: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project =
  mongoose.models.Project || mongoose.model("Project", projectModel);
export default Project;
