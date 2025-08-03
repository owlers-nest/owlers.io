import { HStack, Flex, SkeletonText } from '@chakra-ui/react';
import { StatRoot, StatLabel, StatValueText } from "../../components/ui/stat";
import GreenCircle from "../../assets/green-circle.svg";
import RedCircle from "../../assets/red-circle.svg";
import { FC } from 'react';

// type OwlStat = 'Legit' | 'Scam';

interface Props {
    legits: number;
    scams: number;
    isLoading: boolean;
}

const OwlStats: FC<Props> = ({ legits, scams, isLoading }) => {
    return (
        <HStack width={"100%"} display="flex" justifyContent={"flex-start"} alignItems={"center"}>

            <StatRoot maxW="225px" h={50} borderWidth="1px" paddingX="3" borderRadius={8} justifyContent={"center"}>
                <Flex justifyContent={"space-between"}>
                    <Flex alignItems={"center"}>
                        <img width="10" height="10" src={GreenCircle} alt="" /> <StatLabel marginLeft={1}>Legit</StatLabel></Flex>
                        <StatValueText fontSize={16} fontWeight={"medium"}>
                            {isLoading ? <SkeletonText noOfLines={1} width={"10px"}/> : legits}
                        </StatValueText>
                    </Flex>
            </StatRoot>

            <StatRoot maxW="225px" h={50} borderWidth="1px" paddingX="3" borderRadius={8} justifyContent={"center"}>
                <Flex justifyContent={"space-between"}>
                    <Flex alignItems={"center"}>
                        <img width="10" height="10" src={RedCircle} alt="" /> <StatLabel marginLeft={1}>Scam</StatLabel></Flex>
                    <StatValueText fontSize={16} fontWeight={"medium"}>
                        {isLoading ? <SkeletonText noOfLines={1} width={"10px"}/> : scams}
                    </StatValueText>
                </Flex>
            </StatRoot>

        </HStack>
    );
}

export default OwlStats;