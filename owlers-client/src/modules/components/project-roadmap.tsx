import { Text, SkeletonText } from "@chakra-ui/react";
import {
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from "../../components/ui/timeline";
import { RoadMapItem } from "../types";
import { FC } from "react";

interface Props {
  roadMap: RoadMapItem[];
  isLoading: boolean;
}

const SkeletonRoadMap = () => {
  return (
    <TimelineRoot>
      {Array.from({ length: 4 }).map(() => (
        <TimelineItem>
          <TimelineConnector></TimelineConnector>
          <TimelineContent>
            <TimelineTitle fontSize={"20px"}>
              <SkeletonText noOfLines={1} width={"80px"} />
            </TimelineTitle>
            {Array.from({ length: 2 }).map(() => (
              <SkeletonText noOfLines={1} width={"120px"} />
            ))}
          </TimelineContent>
        </TimelineItem>
      ))}
    </TimelineRoot>
  );
};

const ProjectRoadmap: FC<Props> = ({ roadMap, isLoading }) => {
  return isLoading ? (
    <SkeletonRoadMap />
  ) : (
    <TimelineRoot>
      {roadMap.map((item) => (
        <TimelineItem>
          <TimelineConnector>{item.step}</TimelineConnector>
          <TimelineContent>
            <TimelineTitle fontSize={"20px"}>{item.title}</TimelineTitle>
            {item.steps.map((step) => (
              <>
                <Text textStyle={"md"}>
                  {step.title} {step.description}
                </Text>
              </>
            ))}
          </TimelineContent>
        </TimelineItem>
      ))}
    </TimelineRoot>
  );
};

export default ProjectRoadmap;
