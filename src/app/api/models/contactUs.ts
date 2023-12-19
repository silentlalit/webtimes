import { Schema, model, models } from "mongoose";

const contactSchema = new Schema({
  firstName: {
    type: String,
    require: [true, "First name is required*"],
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    require: [true, "Email is required*"],
  },
  phoneNumber: {
    type: String,
    require: [true, "Phone Number is required*"],
  },
  help: {
    type: String,
  },
  serviceIntrest: {
    type: [{ id: String, value: String }],
    require: [true, "service Intrest Array is required*"],
  },
  message: {
    type: String,
    require: [true, "Message is required*"],
  },
});

const ContactUs = models.ContactUs || model("ContactUs", contactSchema);
export default ContactUs;
