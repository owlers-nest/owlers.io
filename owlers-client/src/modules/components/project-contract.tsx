import { HStack } from "@chakra-ui/react";
import { StatLabel, StatRoot } from "../../components/ui/stat";
import BNBCoinLogo from "../../assets/bnb-coin-logo.svg";
import ETHChainIcon from "../../assets/ETHChainIcon.svg";
import Solana from "../../assets/solana.svg";

interface Props {
    network: string;
}

const CONTRACT_ICONS = {
  ETHEREUM: <img width={"15px"} height={'15px'} src={ETHChainIcon} alt="" />,
  SOLANA: <img width={"15px"} height={'15px'} src={Solana} alt="" />,
  BSC: <img width={"15px"} height={'15px'} src={BNBCoinLogo} alt="" />,
}

const ProjectContract = ({ network }: Props) => (
    <StatRoot mr={2} maxW="240px" borderWidth="1px" p="4" rounded="md">
      <HStack justify="space-between">
        <StatLabel>{network}</StatLabel>
        {(CONTRACT_ICONS as any)[network as any]}
      </HStack>
    </StatRoot>
);

export default ProjectContract;