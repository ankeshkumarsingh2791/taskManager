import React from 'react'
import Input from '../ui/Input'

const ProjectForm = () => {
  return (
    <div className=' w-full py-4  px-6 bg-white '>
        <div className='flex w-full flex-col gap-4'>

        <Input text={'Title' } type={'text'} />
        <Input text={'Description' } type={'text'} />
        <button type='submit'   className='w-32 bg-blue-400 p-2  rounded-lg text-white'>
            Add Project
        </button>
        </div>

        
    </div>
  )
}

export default ProjectForm