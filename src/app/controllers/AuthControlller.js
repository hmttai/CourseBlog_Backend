import User from "../models/User.js";
import { mongooseToObject } from "../../util/moongose.js";
import { v4 as uuidv4 } from "uuid";

const AuthControlller = {
  // [GET] /auth/users
  getAllUser: async (req, res, next) => {
    try {
      const user = await User.find();

      res.status(200).json({ data: user });
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  // [GET] /auth/sign-in
  signIn: async (req, res, next) => {
    try {
      const user = await User.findOne({
        username: req?.query?.username,
        password: req?.query?.password,
      });

      delete user.password;

      res.status(200).json({ data: user });
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  // [POST] /auth/store
  store: async (req, res, next) => {
    try {
      const formData = req.body;
      const params = {
        ...formData,
        _id: uuidv4(),
        isAdmin: formData?.isAdmin || false,
      };

      const user = new User(params);
      const data = await user.save();
      res.status(200).json({ data: data });
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  // [PATCH] /auth/:id
  update: async (req, res, next) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ data: user });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //[DELETE] /auth/destroy
  destroy: async (req, res, next) => {
    try {
      const user = await User.deleteMany({ _id: { $in: req.body?.ids || [] } });

      res.status(200).json({ data: user });
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
};

export default AuthControlller;
