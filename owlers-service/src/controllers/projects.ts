import { Request, Response } from "express";
import { Project, Decision } from "../models";
import { projectsSchema } from "../schemas";
import { getLimitAndOffset } from "../utils";

export const getProjects = async (req: any, res: any) => {
  const { page = 1 } = req.query;
  const { limit, offset } = getLimitAndOffset(Number(page));
  const projects = await Project.find().skip(offset).limit(limit);
  const count = await Project.countDocuments();
  res.status(200).send({
    success: true,
    data: projects,
    total: count,
    offset,
    limit,
  });
};

export const getProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  console.log(projectId);
  const project = await Project.findById(projectId)
    .populate("decisions")
    .exec();
  console.log(project);
  res.status(200).send({
    success: true,
    data: project,
  });
};

export const owl = async (req: any, res: any) => {
  try {
    const { projectId } = req.params;
    const { value, error } = projectsSchema.owlSchema.validate(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        data: [],
        message: error.message,
      });
    }
    const { walletAddress, decision } = value;
    const project = await Project.findById(projectId);
    if (project) {
      const previousDecision = await Decision.findOne({
        $and: [{ project: projectId }, { walletAddress }],
      });
      if (!previousDecision) {
        const decisionInstance = await new Decision({
          walletAddress,
          decision: decision.toUpperCase(),
          project: projectId,
        });

        await decisionInstance.save();

        const updated = await Project.findByIdAndUpdate(projectId, {
          $push: { decisions: decisionInstance.id },
          decisionsStats: {
            legit:
              decision === "legit"
                ? (project?.decisionsStats.legit || 0) + 1
                : project?.decisionsStats.legit,
            scam:
              decision === "scam"
                ? (project?.decisionsStats.scam || 0) + 1
                : project?.decisionsStats.scam,
          },
        });
        return res.status(200).send({
          success: true,
          data: updated,
        });
      } else {
        return res.status(400).send({
          success: false,
          data: [],
          message:
            "Already owled before, you can only owl one time only per project",
        });
      }
    }

    return res.status(400).send({
      success: false,
      message: "BadRequest",
      data: [],
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
};

export const searchProjects = async (req: Request, res: Response) => {
    try {
          const { q } = req.query;
          let result: any = [];
          if (q) {
            const match = new RegExp(q as string, 'i');
            const projects = await Project.find({ name: { $regex: match } }).exec();
            result = projects;
          }
        res.status(200).send({
            success: true,
            data: result,
        });
    } catch(err) {
        res.status(200).send({
            success: false,
            data: [],
        });
    }
};
