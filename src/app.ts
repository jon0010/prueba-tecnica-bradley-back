import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import mainRouter from "./routes/mainRouter";
import connectToDatabase from "./db";

const server = express();

connectToDatabase();

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());
server.options("*", cors());

server.use((_req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", ["*", "http://localhost:5173"]);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use(mainRouter);

server.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const status = res.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.error(err);
  res.status(status).send(message);
});

export default server;
