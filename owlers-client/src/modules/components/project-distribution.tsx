import { StatLabel, StatRoot, StatValueText } from "../../components/ui/stat";

interface Props {
    distribution: string;
    value: string;
    isPercentage: boolean;
}

const ProjectTokenDistribution = ({distribution, value, isPercentage}: Props) => {
    return (<StatRoot mr={2} borderWidth="1px" p="4" rounded="md" minW={"220px"} maxW={"220px"} marginY={"8px"}>
      <StatLabel justifyContent={'space-between'} info={distribution}>{distribution} </StatLabel>
      <StatValueText>{value}{isPercentage ? '%' : ''}</StatValueText>
    </StatRoot>);
};

export default ProjectTokenDistribution;