import dotenv from "dotenv";
import connectDb from "./db/db.js";
import { server } from "./services/events/socket.js";


dotenv.config();

connectDb()

server.listen(3000, () => {
  console.log("Server running on 3000");
});