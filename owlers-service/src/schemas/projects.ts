import Joi from "joi";

export const owlSchema = Joi.object({
    id: Joi.string(),
    walletAddress: Joi.string(),
    decision: Joi.string().valid("legit", "scam")
});
