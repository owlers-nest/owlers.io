import { Card, Heading } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjectCard from "../../components/project-card";
import { Project } from "../../types";
import Slider from "../slider/slider";

interface Props {
    projects: Project[];
}

const RecentProjects = ({ projects }: Props) => {
    return (
        <Card.Root width="full" borderRadius={24} borderColor={"transparent"} marginBottom={5}>
            <Card.Header>
                <Heading as="h1" size="3xl" fontWeight="normal">Recently Added</Heading>
            </Card.Header>
            <Card.Body position={"relative"}>
                <div className="slider-container">
                    <Slider>
                        {
                            projects.map(project =>
                                <ProjectCard legitStats={project.decisionsStats} name={project.name} image={project.logoUrl} id={project.id} description={project.description} />
                            )
                        }
                    </Slider>
                </div>
            </Card.Body>
        </Card.Root>
    );
}

export default RecentProjects;