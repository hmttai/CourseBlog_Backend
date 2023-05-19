import Course from "../models/Course.js";
import { multipleMongooseToObject } from "../../util/moongose.js";

const MeController = {
  // [GET] /me/stored/courses
  storedCourses: async (req, res, next) => {
    try {
      const coursesQuery = await Course.find({});

      if (req.query.hasOwnProperty("_sort")) {
        coursesQuery.sort({ [req.query.column]: req.query.type });
      }

      const number = await Course.countDocumentsDeleted();

      const courses = await coursesQuery;

      res.status(200).json({
        data: {
          number,
          courses: multipleMongooseToObject(courses).map((v) => ({
            ...v,
            createdAt: new Date(v?.createdAt).toDateString(),
          })),
        },
      });
    } catch (err) {
      res.status(500).json({ data: err });
      console.log(err);
    }

    // Promise.all([Course.countDocumentsDeleted(), coursesQuery])
    //   .then(([number, courses]) => {
    //     res.render("me/stored-courses", {
    //       number,
    //       courses: multipleMongooseToObject(courses).map((v) => ({
    //         ...v,
    //         createdAt: new Date(v?.createdAt).toDateString(),
    //       })),
    //     });
    //   })
    //   .catch(next);
  },

  // [GET] /me/trash/courses
  trashCourses: async (req, res, next) => {
    try {
      const courses = await Course.findDeleted({});

      res.status(200).json({
        data: {
          courses: multipleMongooseToObject(courses).map((v) => ({
            ...v,
            createdAt: new Date(v?.createdAt).toDateString(),
          })),
        },
      });
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }

    // .then((courses) =>
    //   res.render("me/trash-courses", {
    //     courses: multipleMongooseToObject(courses).map((v) => ({
    //       ...v,
    //       createdAt: new Date(v?.createdAt).toDateString(),
    //     })),
    //   })
    // )
    // .catch(next);
  },
};

export default MeController;
