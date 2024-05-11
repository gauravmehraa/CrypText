import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import connectToDB from "./db/connect";

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 8080;


app.use(express.json());

app.use("/api/auth", authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(PORT, () => {
  connectToDB();
  console.log(`Server running on port ${PORT}`);
});