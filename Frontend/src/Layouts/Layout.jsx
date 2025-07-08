import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ProjectForm from "../Components/ProjectForm";
import apiClient from "../../Service/apiClient";
import { useSingleProject, useProjects } from "../../context/ProjectContext";

const Layout = () => {
  const [showProjects, setShowProjects] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const navigate = useNavigate();

  const { fetchProjectById } = useSingleProject();
  const { projects } = useProjects();

  const handleLogOut = async () => {
    try {
      await apiClient.logOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-white shadow-md px-4 sm:px-6 py-4 flex flex-wrap justify-between items-center gap-4 border-b">
        {/* Projects Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProjects(!showProjects)}
            className="text-sm sm:text-base font-semibold text-gray-700 hover:text-blue-600 transition duration-300"
          >
            Projects ▾
          </button>

          {showProjects && (
            <div className="absolute mt-2 w-52 max-h-64 overflow-y-auto bg-white rounded-lg shadow-lg border z-50">
              {projects.length === 0 ? (
                <p className="text-gray-600 p-2">No projects found.</p>
              ) : (
                <div className="flex flex-col gap-2 p-2">
                  {projects.map((project) => (
                    <button
                      key={project._id}
                      onClick={() => {
                        setShowProjects(false);
                        fetchProjectById(project._id);
                      }}
                      className="bg-white text-left rounded-md hover:bg-gray-100 p-2 transition duration-200"
                    >
                      <h2 className="text-blue-500 text-sm sm:text-base font-semibold">
                        {project.name}
                      </h2>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap items-center gap-6 text-sm sm:text-base font-medium text-gray-700">
          <Link to="/dashboard" className="hover:text-blue-600 transition">
            Tasks
          </Link>
          <Link to="/dashboard-1" className="hover:text-blue-600 transition">
            Members
          </Link>
          <Link to="/dashboard-2" className="hover:text-blue-600 transition">
            Notes
          </Link>
        </nav>

        {/* Create Project Dropdown */}
        <div className="relative">
          <button
            onClick={() => setAddProject(!addProject)}
            className="text-sm sm:text-base font-semibold text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Create Project ▾
          </button>

          {addProject && (
            <div className="absolute mt-2 w-[300px] sm:w-[400px] bg-white rounded-lg shadow-lg border z-50 p-4">
              <ProjectForm />
            </div>
          )}
        </div>

        {/* Logout Button */}
        <div>
          <button
            onClick={handleLogOut}
            className="bg-red-500 text-white text-sm sm:text-base rounded-md px-4 py-2 hover:bg-red-600 transition"
          >
            LogOut
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50 rounded-t-lg">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
