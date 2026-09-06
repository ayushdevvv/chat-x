import express from 'express'
import authRouter from '../routes/auth/user.route.js'
import messageRouter from '../routes/message/message.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { clerkMiddleware } from '@clerk/express'
import { clerkWebhook } from '../services/webhooks/clerk.webhook.js'
import {app} from '../services/events/socket.js'

app.use("/api/webhooks/clerk",express.raw({ type: 'application/json' }),clerkWebhook)
app.use(express.json())
app.use(cookieParser())
app.use(
  clerkMiddleware({
    authorizedParties: [process.env.CLIENT_URL],
  }),
);

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials:true
}))

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running!" });
});

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

export default app