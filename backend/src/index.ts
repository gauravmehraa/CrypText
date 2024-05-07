import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";

const app: Express = express();

dotenv.config();
const PORT = process.env.PORT || 8080;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});