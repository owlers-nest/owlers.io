import { Flex } from "@chakra-ui/react";
import Influencer from "../components/influencer";
import { Project } from "../types";

interface Props {
    projects: Project[];
    display: "list" | "card";
}

const ProjectCards = ({ projects }: { projects: Project[] }) => {
    return (
        <Flex gap={1}>
            {
                projects.map(item => (
                    <Influencer
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        image={item.logoUrl}
                    />
                ))
            }
        </Flex>
    )
}

const Projects = ({ projects }: Props) => {
    return (
        <>
            {/* {display === "list" ? (
                <Stack width="full">
                    <ProjectList projects={projects} />
                </Stack>

            ) : (} */}
            <ProjectCards projects={projects} />
        </>
    );
}

export default Projects;