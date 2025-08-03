import { Table } from "@chakra-ui/react";
import ProjectListItem from "./project-list-item/project-list-item";
import type { Project } from "../types";
import ProjectListItemSkeleton from "./project-list-item/project-list-item-skeleton";

export interface Props {
    projects: Project[];
    isLoading: boolean;
}

const ProjectList = ({ projects, isLoading }: Props) => {
    return (
        <Table.Root>
            <Table.Body>
                {
                     isLoading ? Array.from({ length: 8}).map((_, i) => <ProjectListItemSkeleton key={i} isLastElement={i === 7} />):
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