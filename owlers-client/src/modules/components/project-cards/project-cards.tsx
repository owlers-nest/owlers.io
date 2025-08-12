import { Grid, GridItem } from "@chakra-ui/react";
import ProjectCard from "../project-card/project-card";
import { Project } from "../../types";
import ProjectCardSkeleton from "../project-card/project-card-skeleton";
import styles from "./project-cars.module.scss";

interface Props {
  projects: Project[];
  isLoading: boolean;
}

const ProjectCards = ({ projects, isLoading }: Props) => {
  return (
    <Grid className={styles.projectsContainer}>
      {isLoading
        ? Array.from({ length: 6 }).map(() => <ProjectCardSkeleton />)
        : projects.map((project) => (
            <GridItem>
              <ProjectCard
                id={project.id}
                image={project.logoUrl}
                key={project.id}
                name={project.name}
                description={project.description}
                legitStats={project.decisionsStats}
              />
            </GridItem>
          ))}
    </Grid>
  );
};

export default ProjectCards;
