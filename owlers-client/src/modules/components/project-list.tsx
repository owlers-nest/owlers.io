import { Table } from "@chakra-ui/react";
import ProjectListItem from "./projects-list-item";
import type { Project } from "../types";

export interface Props {
    projects: Project[];
}

const ProjectList = ({ projects }: Props) => {
    return (
        <Table.Root>
            <Table.Body>
                {
                    projects.map((project, i) => (
                        <ProjectListItem 
                            name={project.name} 
                            image={project.logoUrl}
                            description={project.description}
                            id={project.id}
                            legitStats={project.decisionsStats}
                            isLastElement={projects.length - 1 === i}
                        />
                    ))
                }
            </Table.Body>
        </Table.Root>
    );
};

export default ProjectList;