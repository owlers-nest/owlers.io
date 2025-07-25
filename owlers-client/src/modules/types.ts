export interface Decision {
    walletAddress: string;
    decision: "LEGIT" | "SCAM";
}

export interface RoadMapItem {
    step: number;
    title: string;
    steps: [
        {
            title: string;
            description: string;
        }
    ]
}

export interface Project {
    id: string;
    name: string;
    symbol: string;
    contracts: {
        name: string;
        isContractVerified: boolean;
        decimals: number;
        links: string;
        address: string;

    }[];
    logoUrl: string;
    links: {
        type: string;
        link: string;
    }[];
    isTopRated: boolean;
    description: string;
    tokenDistributionLink: string;
    tokenDistribution?: [{
        title: string;
        percentage: string;
        isPercentage: boolean;
    }],
    status: "PRESALE" | "LAUNCHED";
    decisionsStats: {
        legit: number;
        scam: number;
    },
    decisions: Decision;
    roadMap: RoadMapItem[];
}

export interface UserTokenAllocation {
    sold: number;
    claimed: number;
    claimable: number;
};