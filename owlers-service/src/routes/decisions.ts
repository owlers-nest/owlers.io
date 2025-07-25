import { Router } from "express";
import { decisions } from "../controllers";

export const decisionsRouter = Router();

decisionsRouter.get("/decisions", decisions.getDecisions);
