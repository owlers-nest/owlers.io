import { Schema, model } from 'mongoose';


interface IDecision {
    walletAddress: string;
    decision: "LEGIT" | "SCAM";
    project: IProject;
}

interface IRoadMapItem {
    step: number;
    title: string;
    steps: [
        {
            title: string;
            description: string;
        }
    ]
}

interface IProject {
    id: string;
    name: string;
    symbol: string;
    contracts: {
        name: string;
        isContractVerified: boolean;
        decimals: number;
        address: string;
        link: string;
    }[];
    logoUrl: string;
    links: {
        type: string;
        link: string
    }[];
    isTopRated: boolean;
    description: string;
    tokenDistributionLink: string;
    tokenDistribution?: [{
        title: string;
        percentage: string;
        isPercentage: boolean;
    }],
    status: "PRESALE" | "LAUNCHED" | 'UNDETERMINED';
    decisionsStats: {
        legit: number;
        scam: number;
    },
    decisions: IDecision;
    roadMap: IRoadMapItem[];
}

const decisionSchema = new Schema<IDecision>({
    walletAddress: {
        type: String,
        required: true
    },
    decision: {
        type: String,
        enum: ["LEGIT", "SCAM"],
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Project"
    }
});

const projectSchema = new Schema<IProject>({
    name: { type: String, required: true },
    symbol: String,
    contracts: [{
        name: String,
        isContractVerified: Boolean,
        decimals: Number,
        address: String,
        link: String
    }],
    logoUrl: String,
    links: [{
        type: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        }
    }],
    isTopRated: {
        type: Boolean,
        default: false
    },
    description: String,
    tokenDistributionLink: String,
    tokenDistribution: [{
        title: String,
        percentage: String,
        isPercentage: Boolean
    }],
    status: {
        type: String,
        enum: ["PRESALE", "LAUNCHED", 'UNDETERMINED'],
        default: "PRESALE"
    },
    decisionsStats: {
        legit: {
            type: Number,
            default: 0
        },
        scam: {
            type: Number,
            default: 0
        },
    },
    decisions: [{
        type: Schema.Types.ObjectId,
        ref: "Decision"
    }],
    roadMap: [{
        step: Number,
        title: String,
        steps: [
            {
                title: String,
                description: String,
            }
        ]
    }]
});

projectSchema.set('toJSON', {
    virtuals: true
});

export const Project = model<IProject>('Project', projectSchema);
export const Decision = model<IDecision>('Decision', decisionSchema);