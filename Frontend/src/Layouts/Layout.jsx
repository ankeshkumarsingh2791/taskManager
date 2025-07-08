import React, { useEffect, useState } from "react";
import { data, Link, Outlet, useNavigate } from "react-router-dom";
import ProjectForm from "../Components/ProjectForm";
import apiClient from "../../Service/apiClient";
import { useUserContext } from "../../context/UserContext";
import apiProject from "../../Service/apiProject";
import {useProjects, useSingleProject} from "../../context/ProjectContext"

const Layout = () => {
  const [showProjects, setShowProjects] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [projectId, setProjectId] = useState("");
  const navigate = useNavigate();
  const handleLogOut = async (e) => {
    try {
      await apiClient.logOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // const handleProject = async (Id) => {
  //   try {
  //     const response = await apiProject.getProjectById(Id);

  //     setProjectId(response?.data);
  //   } catch (error) {
  //     console.log(error, "not able to fetch project from frontend");
  //   }
  // };

  const {fetchProjectById, projectData} = useSingleProject()
 

const {projects} = useProjects()


  return (
    <div className="w-full h-screen flex flex-col bg-gray-100 font-sans">
      {/* Header/Nav */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center border-b">
        {/* Left Side - Projects */}
        <div className="relative">
          <button
            onClick={() => setShowProjects(!showProjects)}
            className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition duration-300"
          >
            Projects ▾
          </button>
          {showProjects && (
            <div className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
              {projects.length === 0 ? (
                <p className="text-gray-600">No projects found.</p>
              ) : (
                <div className="grid grid-cols-1  gap-2 p-2 ">
                  {projects.map((projects) => (
                    <button
                      key={projects._id}
                      onClick={() => {
                        // handleProject(projects._id);
                        setShowProjects(false); 
                        fetchProjectById(projects._id);
                      }}
                      className="bg-white rounded-lg shadow p-2 transition duration-200"
                    >
                      <h2 className="text-xl font-semibold text-blue-500">
                        {projects.name}
                      </h2>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <nav>
          <ul className="flex gap-8 text-md font-medium text-gray-700">
            <li>
              <Link
                to="/dashboard"
                className="hover:text-blue-600 transition duration-300"
              >
                Tasks
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard-1"
                className="hover:text-blue-600 transition duration-300"
              >
                Members
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard-2"
                className="hover:text-blue-600 transition duration-300"
              >
                Notes
              </Link>
            </li>
          </ul>
        </nav>
        <div className="relative">
          <button
            onClick={() => setAddProject(!addProject)}
            className="text-lg font-semibold text-white bg-blue-400 p-2 rounded-xl hover:bg-blue-600 transition duration-300"
          >
            Create Projects ▾
          </button>
          {addProject && (
            <div className="absolute mt-2  bg-white rounded-lg shadow-lg border z-50">
              <ProjectForm />
            </div>
          )}
        </div>
        <div>
          <button
            onClick={handleLogOut}
            type="submit"
            className="bg-blue-400 text-white rounded-lg  font-medium p-2"
          >
            LogOut
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50 rounded-t-lg">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
