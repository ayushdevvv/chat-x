import dotenv from "dotenv";
dotenv.config();

import connectDb from "./db/db.js";
import { server } from "./services/events/socket.js";
import "./src/app.js";

connectDb();

server.listen(3000, () => {
  console.log("Server running on 3000");
});