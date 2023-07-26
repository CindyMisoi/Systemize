import React, {useContext} from "react";
import TopNavBar from "../NavigationBar/TopNavBar";
import { Context as ProjectContext } from "../../context/store/ProjectStore";
import NewProjectTile from "../projects/NewProjectTile";
import ProjectTile from "../projects/ProjectTile";
import TopNavBarProjects from "../NavigationBar/TopNavBarProjects";

const Projects = () => {
  const [projectState] = useContext(ProjectContext);

  const projectLists = projectState.projects;
  console.log(projectState.projects);
 

  const projectTiles = projectLists.map((project, i) => {
    return <ProjectTile project={project} key={i} id={project.id} />;
  });
  return (
    <>
      <TopNavBarProjects />
      <div className="home-projects-header">
                    <div>
                      <h2
                        style={{
                          color: "#151b26",
                          fontWeight: 500,
                          fontSize: "20px",
                        }}
                      >
                        Projects
                      </h2>
                    </div>
                    <div>
                </div>
                  </div>
                  <div className="home-projects--list">
                    {/* call get all projects for specific user route */}
                    {projectTiles}
                    
                    </div>
                   
    </>
  );
};

export default Projects;
