import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import ProjectForm from '../Components/ProjectForm';

const Layout = () => {
  const [showProjects, setShowProjects] = useState(false);
  const [addProject, setAddProject] = useState(false)

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
              <ul className="text-sm text-gray-700 divide-y divide-gray-200">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Project Alpha</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Project Beta</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">New Project</li>
              </ul>
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
        <div className='relative'>
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
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50 rounded-t-lg">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
