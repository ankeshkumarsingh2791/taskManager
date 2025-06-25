import React from 'react'
  import {  Link, Outlet } from 'react-router-dom';
import SideNavOptions from '../Components/SideNavOptions'

const Layout = () => {
  return (
    <div className='w-full flex  bg-slate-200 '>
        <div className='w-[30%] h-full '>
        <SideNavOptions />
        </div>
        <div className='w-[70%] flex flex-col  bg-green-200 '>
            <div className='w-full bg-red-400 flex border-b-2 border-black mb-4  '>
                <ul className='flex gap-10 mt-10'>
                    <li>
                        <Link to={'/dashboard'}>
                        
                        Tasks  
                        </Link>
                    </li>
                    <li>
                        <Link to={'/dashboard-1'}>
                        
                        Members
                        </Link>
                    </li>
                    <li>
                        <Link to={'/dashboard-2'}>
                        
                        Notes
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='w-full '>

            <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Layout