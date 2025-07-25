import { projects} from "../constants/projects";
import { Project } from "../models"

const info = (msg: string) => console.info(`[INFO]: ${msg}`);

export const run = async () => {
    info("Saving projects...");

    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];

        const isProjectExist = await Project.findOne({
            symbol: project.symbol
        });

        if (!isProjectExist) {
            info(`Saving ${project.name}`);
            
            const newProject = new Project(project);
            await newProject.save();
    
    
            info(`${project.name} saved successfully! \n`);
        } else {
            info(`${project.name} is already exist!`);
        }

    }

}
