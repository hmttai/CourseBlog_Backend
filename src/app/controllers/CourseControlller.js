import Course from "../models/Course.js";
import { mongooseToObject } from "../../util/moongose.js";

const CourseController = {
  // [GET] /courses/:slug
  show: async (req, res, next) => {
    try {
      const course = await Course.findOne({
        slug: req.params.slug,
      });
      console.log("🚀 ~ file: CourseControlller.js:11 ~ course:", course);
      res.status(200).json({ data: course });
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  // [POST] /courses/store
  store: async (req, res, next) => {
    try {
      const formData = req.body;
      formData.image = `https://img.youtube.com/vi/${formData.videoid}/sddefault.jpg`;
      const course = new Course(formData);
      const data = await course.save();
      res.status(200).json({ data: data });
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  // [GET] /courses/:id/edit
  edit: async (req, res, next) => {
    try {
      const course = await Course.findById(req.params.id);
      res.status(200).json({ data: mongooseToObject(course) });
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  // [PUT] /courses/:id
  update: async (req, res, next) => {
    try {
      const course = await Course.updateOne(
        { _id: Number(req.params.id) },
        req.body
      );
      res.status(200).json({ data: course });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //[DELETE] /courses/destroy
  destroy: async (req, res, next) => {
    try {
      const ids = req.body?.ids;
      await ids.forEach(async (v) => {
        const course = await Course.delete({ _id: v });
      });

      res.status(200).json({ data: "Delete successfully" });
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  //[DELETE] /courses/destroy/force
  forceDestroy: async (req, res, next) => {
    try {
      // const course = await Course.deleteOne({ _id: req.params.id });
      const course = await Course.deleteMany({
        _id: { $in: req.body?.ids || [] },
      });

      res.status(200).json({ data: course });
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  //[PATCH] /courses/restore
  restore: async (req, res, next) => {
    try {
      const ids = req.body?.data?.ids;
      ids.forEach(async (v) => {
        const course = await Course.restore({ _id: v });
      });

      res.status(200).json({ data: "Restore course successfully" });
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  //[POST] /courses/handle-form-action
  handleFormActions: async (req, res, next) => {
    let data;
    try {
      switch (req.body.action) {
        case "delete":
          data = await Course.delete({ _id: { $in: req.body.courseIds } });
          res.status(200).json({ data });
          break;
        case "force-delete":
          data = await Course.deleteMany({ _id: { $in: req.body.courseIds } });
          res.status(200).json({ data });
          break;
        case "restore":
          data = await Course.restore({ _id: { $in: req.body.courseIds } });
          res.status(200).json({ data });
          break;
        default:
          res.json({ message: "Action is invalid!" });
      }
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
};

export default CourseController;
