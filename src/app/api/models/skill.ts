import mongoose from "mongoose";

const Schema = mongoose.Schema;

const skillModel = new Schema({
  position: {
    type: String,
    required: [true, "Please enter Job title"],
  },
  company: {
    type: String,
    required: [true, "Please enter Company name"],
  },
  companyLink: {
    type: String,
    required: [true, "Please enter Company url"],
  },
  technologies: [{ label: String, value: String }],
  startDate: {
    type: Date,
    required: [true, "Please enter Start Job date"],
  },
  workingNow: {
    type: Boolean,
    default: false,
  },
  endDate: {
    type: Date,
    default: null,
  },
  description: {
    type: String,
    required: [true, "Please enter Job description"],
  },
  image: {
    type: String,
    required: [true, "Please enter skill image"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

skillModel.path("companyLink").validate((val) => {
  const urlRegex =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, "Invalid URL.");

const Skill = mongoose.models.Skill || mongoose.model("Skill", skillModel);
export default Skill;
