import mongoose from "mongoose";
const Schema = mongoose.Schema;
import mongooseDelete from "mongoose-delete";
import slug from "mongoose-slug-generator";
// const AutoIncrement = require('mongoose-sequence')(mongoose);
import mongooseSequence from "mongoose-sequence";
const AutoIncrement = mongooseSequence(mongoose);

const Course = new Schema(
  {
    _id: { type: Number },
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    videoid: { type: String, required: true },
    level: { type: String },
    slug: { type: String, slug: "name", unique: true },
    deleted: { type: Boolean, default: false },
  },
  {
    _id: false,
    timestamps: true,
  }
);

//plugins

mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

Course.plugin(AutoIncrement);

// mogo tự động convert thành dạng snaking
export default mongoose.model("Course", Course);
// trả về một list gồm các object là các docs của bảng
