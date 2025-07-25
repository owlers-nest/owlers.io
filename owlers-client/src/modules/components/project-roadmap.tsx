import { Text } from "@chakra-ui/react"
import {
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from "../../components/ui/timeline"
import { RoadMapItem } from "../types"

interface Props {
  roadMap: RoadMapItem[];
}
const ProjectRoadmap = ({roadMap}: Props) => {
  return (
    <TimelineRoot>
      {roadMap.map(item => (
        <TimelineItem>
        <TimelineConnector>
          {item.step}
        </TimelineConnector>
        <TimelineContent>
          <TimelineTitle fontSize={'20px'}>{item.title}</TimelineTitle>
          {item.steps.map(step => (
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
  )
}

export default ProjectRoadmap;
