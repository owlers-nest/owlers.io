import { HStack, SkeletonCircle, SkeletonText, Link } from "@chakra-ui/react";
import { StatLabel, StatRoot } from "../../components/ui/stat";
import BNBCoinLogo from "../../assets/bnb-coin-logo.svg";
import ETHChainIcon from "../../assets/ETHChainIcon.svg";
import Solana from "../../assets/solana.svg";
import { FC } from "react";

interface Props {
    network: string;
    isLoading: boolean;
    link: string;
}

const CONTRACT_ICONS = {
  ETHEREUM: <img width={"15px"} height={'15px'} src={ETHChainIcon} alt="" />,
  SOLANA: <img width={"15px"} height={'15px'} src={Solana} alt="" />,
  BSC: <img width={"15px"} height={'15px'} src={BNBCoinLogo} alt="" />,
}

const ProjectContract: FC<Props> = ({ network, isLoading, link }) => (
    <StatRoot mr={2} maxW="240px" borderWidth="1px" p="4" rounded="md">
      <HStack justify="space-between">
        <StatLabel>
          {isLoading ? <SkeletonText noOfLines={1} width={"50px"} /> : link ? <Link href={link}>{network}</Link> : network}
        </StatLabel>
        {isLoading ? <SkeletonCircle size={5}/> : (CONTRACT_ICONS as any)[network as any]}
      </HStack>
    </StatRoot>
);

export default ProjectContract;