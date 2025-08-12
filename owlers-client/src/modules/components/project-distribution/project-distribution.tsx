import { FC } from "react";
import { StatLabel, StatRoot, StatValueText } from "../../../components/ui/stat";
import { SkeletonText } from "@chakra-ui/react";
import styles from "./project-distribution.module.scss";

interface Props {
  distribution: string;
  value: string;
  isPercentage: boolean;
  isLoading: boolean;
}

const ProjectTokenDistribution: FC<Props> = ({
  distribution,
  value,
  isPercentage,
  isLoading,
}) => {
  return (
    <StatRoot
      mr={2}
      borderWidth="1px"
      p="4"
      rounded="md"
      minW={"220px"}
      // maxW={"220px"}
      marginY={"8px"}
      minH={"80px"}
      className={styles.tokenDistribution}
    >
      <StatLabel justifyContent={"space-between"} info={distribution} alignItems={"center"}>
        {isLoading ? (
          <SkeletonText noOfLines={1} width={"100px"} />
        ) : (
          distribution
        )}
      </StatLabel>
      <StatValueText>
        {isLoading ? <SkeletonText noOfLines={1} width={"25px"} /> : value}
        {isPercentage ? "%" : ""}
      </StatValueText>
    </StatRoot>
  );
};

export default ProjectTokenDistribution;
