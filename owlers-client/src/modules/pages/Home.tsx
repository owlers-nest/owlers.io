import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects, getRecentProjects } from "../store/selectors/projects";
import { useGetProjectsQuery } from "../services/projects";
import { insertProjects, updateProjectsStatus } from "../store/slices/projects";

import Projects from "../components/projects/projects";
import RecentProjects from "../components/recent-projects/recent-projects";
import ProjectsFilter from "../components/projects-filter/projects-filter";



const Home = () => {
    const projects = useSelector(getProjects);
    const recentProjects = useSelector(getRecentProjects);
    const dispatch = useDispatch();

    const { data: response } = useGetProjectsQuery(1);

    useEffect(() => {
        if (response) {
            dispatch(insertProjects(response.data))
        }
    }, [response]);

    return (
        <div>
            <ProjectsFilter onStatusChange={(status: any) => dispatch(updateProjectsStatus(status))}/>
            <RecentProjects projects={recentProjects || []} />
            <Projects projects={projects || []} />
        </div>
    )
}

export default Home;