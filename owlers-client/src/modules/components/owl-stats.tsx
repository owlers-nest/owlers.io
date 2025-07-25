import { HStack, Flex } from '@chakra-ui/react';
import { StatRoot, StatLabel, StatValueText } from "../../components/ui/stat";
import GreenCircle from "../../assets/green-circle.svg";
import RedCircle from "../../assets/red-circle.svg";

// type OwlStat = 'Legit' | 'Scam';

interface Props {
    legits: number;
    scams: number;
}

const OwlStats = ({ legits, scams }: Props) => {
    return (
        <HStack width={"100%"} display="flex" justifyContent={"flex-start"} alignItems={"center"}>

            <StatRoot maxW="225px" h={50} borderWidth="1px" paddingX="3" borderRadius={8} justifyContent={"center"}>
                <Flex justifyContent={"space-between"}>
                    <Flex alignItems={"center"}>
                        <img width="10" height="10" src={GreenCircle} alt="" /> <StatLabel marginLeft={1}>Legit</StatLabel></Flex>
                        <StatValueText fontSize={16} fontWeight={"medium"}>{`${legits}`}</StatValueText>
                    </Flex>
            </StatRoot>

            <StatRoot maxW="225px" h={50} borderWidth="1px" paddingX="3" borderRadius={8} justifyContent={"center"}>
                <Flex justifyContent={"space-between"}>
                    <Flex alignItems={"center"}>
                        <img width="10" height="10" src={RedCircle} alt="" /> <StatLabel marginLeft={1}>Scam</StatLabel></Flex>
                    <StatValueText fontSize={16} fontWeight={"medium"}>{`${scams}`}</StatValueText>
                </Flex>
            </StatRoot>

        </HStack>
    );
}

export default OwlStats;