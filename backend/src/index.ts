import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import messageRoutes from "./routes/message.routes";
import userRoutes from "./routes/user.routes";

import connectToDB from "./db/connect";
import { app, server } from "./sockets/socket";

dotenv.config();

const PORT: string = process.env.PORT || "8080";

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
  connectToDB();
  console.log(`Server running on port ${PORT}`);
});