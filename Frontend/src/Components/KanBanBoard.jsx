import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { useSingleProject } from "../../context/ProjectContext";
import apiTODO from "../../Service/apiTODO";

const KanBanBoard = () => {
  const [todos, setTodos] = useState([]);
  const { projectData } = useSingleProject();

  const projectId = projectData?.project?.id || projectData?.id;

  useEffect(() => {
    const fetchTodos = async () => {
      if (!projectId) return;

      try {
        setTodos([]); // ✅ clear old tasks before fetching new
        const data = await apiTODO.getProjectById(projectId);
        setTodos(data?.message?.tasks || []);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [projectId]); // ✅ this will change when new project is selected

  const todoTasks = todos.filter((task) => task.status === "todo");
  const inProgressTasks = todos.filter((task) => task.status === "inProgress");
  const completedTasks = todos.filter((task) => task.status === "done");

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 py-6">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-xl font-semibold text-gray-700">
          {projectData?.project?.name || projectData?.name || "Project"}
        </h1>
        <Link to="/add-task">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Add Task
          </button>
        </Link>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* To-Do */}
        <TaskColumn title="To-Do" tasks={todoTasks} color="gray-600" />
        <TaskColumn title="In Progress" tasks={inProgressTasks} color="yellow-600" />
        <TaskColumn title="Completed" tasks={completedTasks} color="green-600" />
      </div>
    </div>
  );
};

const TaskColumn = ({ title, tasks, color }) => (
  <div className="bg-white rounded-lg p-4 shadow">
    <h2 className={`text-center text-xl font-semibold text-${color} mb-4`}>
      {title}
    </h2>
    {tasks.length === 0 ? (
      <p className="text-sm text-gray-400 text-center">No tasks.</p>
    ) : (
      tasks.map((task) => (
        <div
          key={task.id}
          className="bg-gray-100 rounded-md p-3 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
        >
          <div>
            <p className="font-semibold text-gray-800">{task.title}</p>
            <p className="text-sm text-gray-600">{task.description}</p>
          </div>
          <div className="flex gap-2 ml-auto">
            <Button title="👤" />
            <Button title="🚩" />
            <Button title="💸" />
          </div>
        </div>
      ))
    )}
  </div>
);

export default KanBanBoard;
