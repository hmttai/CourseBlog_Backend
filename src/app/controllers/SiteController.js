import Course from "../models/Course.js";
import { multipleMongooseToObject } from "../../util/moongose.js";

const SiteController = {
  // [GET]
  index: async (req, res, next) => {
    // Course.find({}, function (err, courses) {
    //   if(!err) {
    //     res.json(courses)
    //   } else {
    //     res.status(400).json({ error: 'ERROR!!!' })
    //   }
    // });

    const data = await Course.find({});

    return res.status(200).json({ data });
  },

  //[GET]/search
  search: (req, res) => {
    res.render("search");
  },
};

export default SiteController;
