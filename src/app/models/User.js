import mongoose from "mongoose";
const Schema = mongoose.Schema;
import mongooseDelete from "mongoose-delete";
import slug from "mongoose-slug-generator";
import mongooseSequence from "mongoose-sequence";
const AutoIncrement = mongooseSequence(mongoose);

const User = new Schema(
  {
    _id: { type: String },
    username: { type: String, required: true },
    password: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    isAdmin: { type: Boolean },
    slug: { type: String, slug: "username", unique: true },
  },
  {
    _id: false,
    timestamps: true,
  }
);

//plugins

mongoose.plugin(slug);
// User.plugin(mongooseDelete, {
//   overrideMethods: "all",
//   deletedAt: true,
// });

// User.plugin(AutoIncrement);

// mogo tự động convert thành dạng snaking
export default mongoose.model("User", User);
// trả về một list gồm các object là các docs của bảng
