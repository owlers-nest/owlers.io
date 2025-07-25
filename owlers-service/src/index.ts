import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { server } from "./config";
import { projectsRouter, decisionsRouter } from "./routes";
import { connectToDB } from "./utils";
import cors from "cors";
import { run as initProjects } from "./scripts/projects";

dotenv.config();

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", projectsRouter);
app.use('/api', decisionsRouter);

const start = async () => {
  await connectToDB();
  await initProjects();
  app.listen(server.PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${server.PORT}`);
  });
}
start();
