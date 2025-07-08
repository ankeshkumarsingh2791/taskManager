import React, { useEffect, useState } from 'react'
import Button from '../ui/Button'
import { Link } from 'react-router'
import { useSingleProject } from '../../context/ProjectContext'
import apiTODO from '../../Service/apiTODO'

const todo = [
  {
    task:"Frontend development"
  },
  {
    task:"Frontend development"
  },
  {
    task:"Frontend development"
  },
  {
    task:"Frontend development"
  },
]

const process = [
  {
    task:"Frontend development"
  },
  {
    task:"Frontend development"
  },
  {
    task:"Frontend development"
  },
  {
    task:"Frontend development"
  },
]

const completed = [
  {
    task:"Frontend development"
  },
  {
    task:"Frontend development"
  },
  {
    task:"Frontend development"
  },
  {
    task:"Frontend development"
  },
]


const KanBanBoard = () => {

  const [todos, setTodos] = useState([])
  const {projectData} = useSingleProject();
 
  useEffect(() => {    
    const fetchTodos = async () => {
      
      const projectId = projectData?.project?.id;
      if (!projectId) return;
      console.log("CHala", projectId);

      try {
        const data = await apiTODO.getProjectById(projectId);
        
       console.log(data)
        setTodos(data?.message?.tasks || [])
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [projectData?.project?.id]);
   
   console.log(todos.status, "............") 
  return (
    <>
    <div className='w-full flex px-12 py-4 justify-between '>
      <p>{projectData?.project?.name}</p>
      <Link to={'/add-task'}>
      <button
           
            type="submit"
            className="bg-blue-400 w-40 text-white rounded-lg  font-medium p-2"
          >
            Add Task
          </button>
      </Link>
    </div>
    <div className='w-full h-full  grid grid-cols-3 gap-8 px-6  '>
      <div className='bg-white border-gray-500 px-2'>
        <p className='text-center text-2xl font-medium text-gray-400'>To-Do</p>
        
          {
            todos.map((index)=>(
              <div key={index.id} className= "w-full   flex justify-between items-center bg-gray-100 p-3 rounded shadow mb-2">
                <p className='font-medium text-lg mr-10 '>

            {index.title}
                </p>
                <p>
                  {index.description}
                </p>

                <div className='flex gap-2'>
                  <Button title={'👤'} />
                  <Button title={'🚩'} />
                  <Button title={'💸'} />

                </div>
          </div>
            ))
          }
       </div>
      <div className='bg-white border-gray-500  px-2'>
        <p className='text-center text-2xl font-medium text-gray-400'>Under-Process</p>
           {
            todo.map((item,index)=>(
              <div key={index} className= "w-full  flex justify-between items-center  bg-gray-100 p-3 rounded shadow mb-2">
                <p>

            {item.task}
                </p>
                <div className='flex gap-2'>
                  <Button title={'👤'} />
                  <Button title={'🚩'} />
                  <Button title={'💸'} />

                </div>
          </div>
            ))
          }
      </div>
      <div className='bg-white border-gray-500 px-2 '>
        <p className='text-center text-2xl font-medium text-gray-400'>Completed</p>
         {
            todo.map((item,index)=>(
              <div key={index} className= "w-full   flex justify-between items-center bg-gray-100 p-3 rounded shadow mb-2">
                <p>

            {item.task}
                </p>
                <div className='flex gap-2'>
                  <Button title={'👤'} />
                  <Button title={'🚩'} />
                  <Button title={'💸'} />

                </div>
          </div>
            ))
          }
      </div>

      
    </div>
    </>
  )
}

export default KanBanBoard