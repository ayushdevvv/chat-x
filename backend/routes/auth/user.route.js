import express from "express";
import { getMe } from "../../controllers/auth/user.controller.js";
import { authUser } from "../../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.get("/check", authUser, getMe);

export default authRouter;