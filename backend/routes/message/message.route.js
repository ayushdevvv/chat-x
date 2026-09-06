import express from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { getUsersForSidebar,getConversationsForSidebar,getMessages,sendMessage } from "../../controllers/message/message.controller.js";
import upload from "../middlewares/upload.middleware.js";
const messageRouter = express.Router();


messageRouter.get("/users", authUser,getUsersForSidebar);
messageRouter.get("/:conversation", authUser,getConversationsForSidebar);
messageRouter.get("/:id", authUser,getMessages);
messageRouter.post("/send/:id", authUser,upload.single("media"),sendMessage);
messageRouter.get("/receive/:id", authUser,receiveMessage);

export default messageRouter;