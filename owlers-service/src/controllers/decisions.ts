import { Request, Response } from "express";
import { Decision } from "../models";

export const getDecisions = async (req: any, res: any) => {
    const { walletAddress } = req.query;
    console.log("walletAddress", walletAddress)
    if (walletAddress) {
        const decisions = await Decision.find({
            walletAddress
        }).populate("project", "name logoUrl id description decisionsStats");

        const legits = await Decision.countDocuments({
            decision: "LEGIT",
            walletAddress
        });
        const scams = await Decision.countDocuments({
            decision: "SCAM",
            walletAddress
        });
        return res.status(200).send({
            success: true,
            data: decisions,
            legits,
            scams
        });
    } else {
        const decisions = await Decision.find();
        return res.status(200).send({
            success: true,
            data: decisions
        });
    }
}
