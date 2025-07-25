import { Router } from "express";
import { projects } from "../controllers";

export const projectsRouter = Router();

projectsRouter.get("/projects", projects.getProjects);
projectsRouter.get("/projects/search", projects.searchProjects);
projectsRouter.get("/projects/:projectId", projects.getProject);
projectsRouter.post("/projects/:projectId/owl", projects.owl);
