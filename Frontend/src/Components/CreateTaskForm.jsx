import React, { useState } from "react";
import Input from "../ui/Input";
import DropDown from "../ui/DropDown";
import { useProjects, useSingleProject } from "../../context/ProjectContext";
import apiTODO from "../../Service/apiTODO";

const CreateTaskForm = () => {
  const { projects } = useProjects();
  const { fetchProjectById, projectData } = useSingleProject();

  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleProjectSelect = async (project) => {
    setSelectedProjectId(project._id); // Save selected project ID
    await fetchProjectById(project._id); // Optionally fetch details
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Send form data with selectedProjectId to backend
    const payload = {
      ...form,
      projectId: selectedProjectId,
    };

    console.log("Payload to send:", payload);

    // TODO: Send this payload to your backend API
     try {
      const {title, description} = form
      await apiTODO.createProject(title, description, selectedProjectId)

     } catch (error) {
      console.log(error, "eror in submitting form")
     }
  };

  return (
    <div className="w-[75%] flex justify-center  items-center ">
      <form className="flex flex-col items-center gap-6" onSubmit={handleSubmit}>
        <h1 className="text-center text-2xl font-medium">Create Task</h1>

        <div className="w-full grid grid-cols-3 gap-6">
          <DropDown option={projects} onClick={handleProjectSelect} />
        </div>

        <div className="w-full grid grid-cols-1 gap-8">
          <Input type="text" name="title" value={form.title} text="title" onChange={handleChange} />
          <Input type="text" name="description" value={form.description} text="description" onChange={handleChange} />
        </div>

        <button type="submit" className="w-32 p-3 mb-4 rounded-xl bg-green-300 text-center">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default CreateTaskForm;
