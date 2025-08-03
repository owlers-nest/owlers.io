import { Card, Flex } from "@chakra-ui/react";
import { Button } from "../../../components/ui/button";
import ViewList from "../../../assets/view-list.svg";
import ViewCard from "../../../assets/view-card.svg";
import ArrowForward from "../../../assets/arrow-forward.svg";
import { useState } from "react";
import ProjectCards from "../project-cards";
import ProjectList from "../project-list";

import type { Project } from "../../types";
import { useNavigate } from "react-router-dom";

import Empty from "../empty/empty";

export interface Props {
    projects: Project[];
    isLoading: boolean;
}

const Projects = ({ projects, isLoading }: Props) => {
    const [display, setDisplay] = useState<"list" | "card">("list");
    const navigate = useNavigate();

    const handleDisplayChange = (display: "list" | "card") => {
        setDisplay(display)
    }

    return (
        <Card.Root width="full" borderRadius={24} borderColor={"transparent"}>
            <Card.Header>
                <Flex justify={"space-between"} align={"center"}>
                    <Card.Title>
                        <Flex justifyContent={"center"}>
                            <h1 style={{ fontSize: "30px", fontWeight: "400" }}>All Projects</h1>
                            <Button onClick={() => navigate("/projects")} variant={"plain"} style={{ color: "#535EF9" }}>View all projects <img style={{ display: "inline" }} src={ArrowForward} /></Button>
                        </Flex>
                    </Card.Title>

                    <Flex>
                        <Button disabled={projects.length === 0} onClick={() => handleDisplayChange("card")} variant={"outline"} marginRight={"8px"} padding={"5px"}>
                            <img width="20" height="16" src={ViewList} alt="" />
                        </Button>

                        <Button disabled={projects.length === 0} onClick={() => handleDisplayChange("list")} variant={"outline"} padding={"5px"}>
                            <img width="24" height="24" src={ViewCard} alt="" />
                        </Button>

                    </Flex>
                </Flex>
            </Card.Header>
            <Card.Body gap="2">
                {
                    display === "list" ? <ProjectList projects={projects} isLoading={isLoading} /> : <ProjectCards projects={projects} isLoading={isLoading} />
                }
                {projects.length === 0 && !isLoading ?  <Empty />  : null}
            </Card.Body>
        </Card.Root>
    );
};

export default Projects;