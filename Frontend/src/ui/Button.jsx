import React from 'react'

const Button = ({title}) => {
  return (
    <button type='submit' className='w-8 h-8 border-blue-500 border-2 rounded-full'>
        {title}
    </button>
  )
}

export default Button