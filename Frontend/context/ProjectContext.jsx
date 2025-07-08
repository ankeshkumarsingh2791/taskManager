import { createContext, useContext, useState, useEffect } from "react";
import apiProject from "../Service/apiProject";
import { useUserContext } from "./UserContext"; // assuming you already have this
import { data } from "react-router";

const ProjectContext = createContext();
const SingleProjectContext = createContext();


export function ProjectContextProvider({ children }) {
  const { fetchedData } = useUserContext();
  const userId = fetchedData?.data?._id;
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (userId) {
          
          const response = await apiProject.getAllProject(userId);
 
          setProjects(response?.data || []);
  
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, [userId]);
 
  return (
    <ProjectContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectContext.Provider>
  );
}


export function SingleProjectProvider({ children }) {
  const [projectData, setProjectData] = useState(null);

  const fetchProjectById = async (id) => {
    try {
      const response = await apiProject.getProjectById(id);
      setProjectData(response?.data);
    } catch (error) {
      console.error("Failed to fetch project by ID:", error);
    }
  };

  return (
    <SingleProjectContext.Provider value={{ projectData, fetchProjectById }}>
      {children}
    </SingleProjectContext.Provider>
  );
}


export function useProjects() {
  return useContext(ProjectContext);
}

export function useSingleProject() {
  return useContext(SingleProjectContext);
}
