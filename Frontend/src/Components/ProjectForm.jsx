import { useState } from "react";
import Input from "../ui/Input";
import apiProject from "../../Service/apiProject.js";
import { useUserContext } from "../../context/UserContext.jsx";

const ProjectForm = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
   const {fetchedData} =  useUserContext()
   console.log("?????????", fetchedData)
   const userId = fetchedData?.data?._id
   console.log("userId", userId);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("try to send data", form);
      const { name, description } = form;
        await apiProject.createProject(name, description, userId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" w-full py-4  px-6 bg-white ">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
        <Input onChange={handleChange} text={"name"} type={"text"}  />
        <Input onChange={handleChange} text={"description"} type={"text"}   />
        <button
          type="submit"
          className="w-32 bg-blue-400 p-2  rounded-lg text-white"
        >
          Add Project
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
