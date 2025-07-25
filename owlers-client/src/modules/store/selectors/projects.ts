import { RootState } from "../store";


export const getProjects = (state: RootState) => {
    const status = state.projects.projectsStatus;
    const projects = state.projects.list || [];
    switch(status) {
        case 'all':
            return projects;
        case 'legit':
            return projects.filter(project => project.decisionsStats.legit > project.decisionsStats.scam);
        case 'scam':
            return projects.filter(project => project.decisionsStats.legit < project.decisionsStats.scam);
        case 'notSpecified':
            return projects.filter(project => project.decisionsStats.legit === project.decisionsStats.scam);
        default:
            return projects;

    }
};
export const getProject = (projectId: string) => (state: RootState) => state.projects.byIds[projectId];
export const getRecentProjects = (state: RootState) => state.projects.recent || [];
