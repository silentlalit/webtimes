import { Schema, model, models } from "mongoose";
import validator from "validator";

// const bcryptjs = require("bcryptjs"); // to crypt password
// const jwt = require("jsonwebtoken"); // to generate jwt token
// const crypto = require("crypto"); // buildIn module already exist

const userModel = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    username: {
      type: String,
      maxLength: [30, "username can not exceed 30 characters"],
      minLength: [3, "username should have 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: [validator.isEmail, "Please enter valid email Id"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password should be gtreater then 8 characters"],
      select: false,
    },
    avatar: {
      type: String,
      default: "/user.png",
    },
    number: {
      type: String,
    },
    address: {
      fullName: String,
      companyName: String,
      country: String,
      state: String,
      city: String,
      address: String,
      zipCode: String,
    },
    role: {
      type: String,
      default: "user",
    },
    socket_id: {
      type: String || null,
    },
    status: {
      type: String,
      default: "Offline",
    },
    conversation_id: {
      type: String || null,
      default: null,
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
  },
  { timestamps: true }
);

// userModel.pre("save", async function (next: any) {
//   if (!this.isModified("password")) {
//     next();
//   }

//   this.password = await bcryptjs.hash(this.password, 10);
// });

// // JWT TOKEN
// // generate a token and store it in cookies => can access the user logged in routes
// userModel.methods.getJWTTOKEN = function () {
//   // creating jwt token
//   return jwt.sign({ id: this._id }, process.env.JWT_SEC_KEY, {
//     expiresIn: process.env.JWT_KEY_EXPIRE,
//   });
// };

// // for comparing register password with login password
// userModel.methods.comparePassword = async function (password: any) {
//   return await bcryptjs.compare(password, this.password);
// };

// // ** IMPORTANT ** Generating reset password token **
// userModel.methods.getResetPasswordToken = function () {
//   // Generating Token
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   // Hashing and adding to userShema
//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   // adding password expire
//   this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

//   return resetToken;
// };

const User = models.User || model("User", userModel);
export default User;
