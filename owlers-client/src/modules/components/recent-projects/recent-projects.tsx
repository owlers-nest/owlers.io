import { Card, Heading } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjectCard from "../project-card/project-card";
import { Project } from "../../types";
import Slider from "../slider/slider";
import ProjectCardSkeleton from "../project-card/project-card-skeleton";
import styles from "./recent-projects.module.scss";

interface Props {
    projects: Project[];
    isLoading: boolean;
}

const RecentProjects = ({ projects, isLoading }: Props) => {
    return (
        <Card.Root width="full" borderRadius={24} borderColor={"transparent"} marginBottom={5}>
            <Card.Header>
                <Heading as="h1" fontWeight="normal" className={styles.recentProjectsTitle}>Recently Added</Heading>
            </Card.Header>
            <Card.Body position={"relative"}>
                <div className="slider-container">
                    <Slider>
                        { isLoading ? Array.from({ length: 4 }).map(() => <ProjectCardSkeleton />) :
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