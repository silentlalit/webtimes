import mongoose from "mongoose";

const Schema = mongoose.Schema;

const testimonialModel = new Schema({
  name: {
    type: String,
    required: [true, "Please enter testimonial title"],
    unique: true,
  },
  comment: {
    type: String,
    required: [true, "Please enter your comment"],
  },
  serviceCat: { label: String, value: String },
  avatar: {
    type: String,
    required: [true, "Please enter your image"],
  },
  rating: {
    type: Number,
    required: [true, "Please enter your rating"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model("Testimonial", testimonialModel);
export default Testimonial;
