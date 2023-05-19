import express from "express";
const router = express.Router();

import meController from "../app/controllers/MeControlller.js";

router.get("/stored/courses", meController.storedCourses);
router.get("/trash/courses", meController.trashCourses);

export default router;
