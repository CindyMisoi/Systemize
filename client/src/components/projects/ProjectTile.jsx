import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import apiServer from "../../config/apiServer";
import "../../css/Project.css";
import { AiOutlineProject } from "react-icons/ai";
import Loader from "../Loader";
import { Menu, MenuItem } from "@material-ui/core";
import { AiOutlineEllipsis } from "react-icons/ai";
import { Context as ProjectContext } from "../../context/store/ProjectStore";

const ProjectTile = ({ project, teamId, id }) => {
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState();
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [projectState, projectDispatch] = useContext(ProjectContext);
  
  const navigate = useNavigate()
  const getTeam = async () => {
    const res = await apiServer.get(`/projects/${project.id}/team`);
    setTeam(res.data);
    setLoading(false);
  };
  const handleMenuClick = (event) => {
    setIsMenuOpen(true);
    setAnchorMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const deleteProject = async (projectId) => {
    const userId = sessionStorage.getItem("userId");
    handleMenuClose();
    await apiServer.delete(`/projects/${projectId}`);
    const res = await apiServer.get(`/projects/user/${userId}`);
    await projectDispatch({ type: "get_user_projects", payload: res.data });
    console.log("project deleted");
    navigate("/");
  };


  useEffect(() => {
    getTeam();
  }, []);

  if (loading) {
    return <Loader />;
  }

   // Check if the project exists before rendering
   if (!projectState.userProjects.some((p) => p.id === project.id)) {
    return null; // or return an empty div
  }
  
  const team_id = teamId || team.id;
  return (
    <>
    <Link
      className="project-tile--link"
      to={`/teams/${team_id}/project/${project.id}/${project.name}`}
    >
      <div className={`project-tile-container`}>
        <div className="project-tile-box">
          <div className={`project-tile-icon project-tile-icon-${id}`}>
            <AiOutlineProject style={{ fontSize: "30px", color: "white" }} />
          </div>
        </div>
        <div className="project-tile-name">{project.name}</div>        
      </div>
    </Link>
     <div>
     <AiOutlineEllipsis onClick={handleMenuClick} />
     <Menu
       style={{ marginTop: "40px" }}
       anchorEl={anchorMenu}
       keepMounted
       open={isMenuOpen}
       onClose={handleMenuClose}
     >
       <MenuItem onClick= {deleteProject} >Delete Project</MenuItem>
     </Menu>
   </div>
   </>
  );
};

export default ProjectTile;
