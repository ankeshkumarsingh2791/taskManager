import React from 'react'
import Input from '../ui/Input'
import DropDown from '../ui/DropDown'

const CreateTaskForm = () => {
  return (
    <div className='w-[75%] flex justify-center text-gray-400 items-center '>
        <form className='flex flex-col items-center gap-6 '>
            <h1 className='text-center text-2xl font-medium '>Create Task</h1>
            <div className=' w-full grid grid-cols-3 gap-6'>
                <DropDown title={"Assigned To"} />
                <DropDown title={"Assigned By"} />
                <DropDown title={"Project"} />


            </div>
            <div className='w-full grid grid-cols-1 gap-8'>

            <Input type={"text"} text={"title"} />
            <Input text={"Description"} type={"text"} />
            </div>

            <button className=' w-32 p-3 mb-4 rounded-xl bg-green-300 text-center'>
                Add Task
            </button>
            


        </form>

    </div>
  )
}

export default CreateTaskForm