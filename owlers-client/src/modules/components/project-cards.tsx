import { Grid, GridItem } from "@chakra-ui/react";
import ProjectCard from "./project-card";
import { Project } from "../types";

interface Props {
    projects: Project[];
}

const ProjectCards = ({ projects }: Props) => {
    return (
        <Grid templateColumns="repeat(3, auto)" gap="2">
        {
            projects.map((project) => 
                <GridItem>
                <ProjectCard 
                    id={project.id} 
                    image={project.logoUrl} 
                    key={project.id} name={project.name} 
                    description={project.description} 
                    legitStats={project.decisionsStats}
                />
                </GridItem>
            )
        }
        </Grid>
    );
};

export default ProjectCards;