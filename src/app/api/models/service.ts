import { Schema, model, models } from "mongoose";

const serviceModel = new Schema({
  name: {
    type: String,
    required: [true, "Please enter service name"],
    unique: true,
  },
  title: {
    type: String,
    required: [true, "Please enter service title"],
  },
  description: {
    type: String,
    required: [true, "Please enter service description"],
  },
  technologies: [{ label: String, value: String }],
  thumbnail: {
    type: String,
    required: [true, "Please enter service image"],
  },
  images: [
    {
      type: String,
    },
  ],

  priceList: [
    {
      type: { type: String },
      name: { type: String },
      price: { type: Number },
      about: { type: String },
      revisions: { type: Number },
      delivery: { type: Number },
    },
  ],

  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      serviceId: {
        type: String,
      },
      productId: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  ratings: {
    type: Number,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Service = models.Service || model("Service", serviceModel);
export default Service;
