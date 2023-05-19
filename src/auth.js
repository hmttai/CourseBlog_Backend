import express from "express";
import AuthController from "../app/controllers/AuthControlller.js";

const router = express.Router();

router.get("/users", AuthController.getAllUser);
router.get("/sign-in", AuthController.signIn);
router.post("/store", AuthController.store);
router.patch("/:id", AuthController.update);
router.delete("/destroy", AuthController.destroy);

export default router;