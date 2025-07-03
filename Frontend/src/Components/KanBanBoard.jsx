import React from 'react'
import Button from '../ui/Button'

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
  return (
    <div className='w-full h-full  grid grid-cols-3 gap-8 px-6  '>
      <div className='bg-white border-gray-500 px-2'>
        <p className='text-center text-2xl font-medium text-gray-400'>To-Do</p>
        
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
  )
}

export default KanBanBoard