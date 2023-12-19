import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  projectName: {
    type: String,
    required: true,
  },
  serviceId: {
    type: String,
    required: true,
  },
  service: {
    name: String,
    title: String,
    thumbnail: String,
  },
  orderDetails: {
    type: Object,
    required: true,
  },
  extras: [
    {
      type: Object,
    },
  ],
  userId: {
    // type: Schema.ObjectId,
    type: String,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Processing",
  },
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  paidAt: {
    type: Date,
    default: Date.now(),
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
