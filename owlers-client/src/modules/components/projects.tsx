import { Flex, Stack, HStack } from "@chakra-ui/react";
import { AccordionRoot, AccordionItem, AccordionItemTrigger, AccordionItemContent } from "../../components/ui/accordion";
import { ProjectItemContent, ProjectItemHeader } from "../components/project";
import ProjectCard from "../components/project-card";
import { Project } from "../types";
import {Button} from "../../components/ui/button"
import { useNavigate } from "react-router-dom";
import { RiArrowRightLine } from "react-icons/ri";
import { BiArrowToBottom, BiArrowToTop } from "react-icons/bi";

interface Props {
    projects: Project[];
    display: "list" | "card";
}

const ProjectList = ({ projects }: { projects: Project[] }) => {
    const navigate = useNavigate();
    return (
        <AccordionRoot collapsible defaultValue={["1"]}>
            {projects.map((project) => (
                <AccordionItem value={project.id} key={project.id}>
                    <AccordionItemTrigger>
                        <ProjectItemHeader project={project} />
                    </AccordionItemTrigger>
                    <AccordionItemContent display="flex" flexDir="column" justifyContent={"center"} width={"100%"} alignItems={"center"}>
                        <ProjectItemContent project={project} />
                        <Flex justifyContent={"flex-end"} width={"full"}>
                            <HStack justify={"flex-end"}>
                                <Button><BiArrowToBottom /> Owl <BiArrowToTop/></Button>
                                <Button variant="outline" onClick={() => navigate(`/projects/${project.id}`)}>View <RiArrowRightLine /></Button>
                            </HStack>
                        </Flex>
                    </AccordionItemContent>
                </AccordionItem>
            ))}
        </AccordionRoot>
    );
};

const ProjectCards = ({ projects }: { projects: Project[] }) => {
    return (
        <Flex gap={1}>
            {
                projects.map(item => (
                    <ProjectCard
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        image={item.logoUrl}
                        legitStats={item.decisionsStats}
                    />
                ))
            }
        </Flex>
    )
}

const Projects = ({ projects, display }: Props) => {
    return (
        <>
            {display === "list" ? (
                <Stack width="full">
                    <ProjectList projects={projects} />
                </Stack>

            ) : (<ProjectCards projects={projects} />)}
        </>
    );
}

export default Projects;