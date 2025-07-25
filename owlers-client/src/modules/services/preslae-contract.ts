import { parseUnits, formatUnits } from "viem";
import { readContract } from "@wagmi/core";
import { config } from "../web3/provider";
import { PRESALE_ABI, PRESALE_CONTRACT_ADDRESS } from "../../constants";
import { UserTokenAllocation } from "../types";


const formatTokensAmount = (owlTokenAmount: unknown) => Number(Number(formatUnits(owlTokenAmount as bigint, 18)).toFixed(2));

export const calculateAmountOfToken = async (amount: number) => {
    try {
        const usdtAmount = parseUnits(amount.toString(), 6);
        const owlTokenAmount = await readContract(config, {
            abi: PRESALE_ABI,
            address: PRESALE_CONTRACT_ADDRESS,
            functionName: 'previewTokenAmount',
            args: [usdtAmount],
        });
        return formatTokensAmount(owlTokenAmount);
    } catch(err) {
        console.error(err);
    }
}

export const getMyAllocations = async (address: string): Promise<UserTokenAllocation | undefined> => {
    try {
        const allocation = await readContract(config, {
            abi: PRESALE_ABI,
            address: PRESALE_CONTRACT_ADDRESS,
            functionName: 'getUserAllocation',
            args: [address],
        });
        const [sold, claimed, claimable] = allocation as number[];
        return {
            sold: formatTokensAmount(sold),
            claimed: formatTokensAmount(claimed),
            claimable: formatTokensAmount(claimable),
        };
    } catch(err) {
        console.error(err);
    }
}