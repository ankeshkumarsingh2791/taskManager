import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './Layouts/Layout'
import Sigin from './Components/Sigin'
import SignUp from './Components/SignUp'
import KanBanBoard from './Components/KanBanBoard';

import { useUserContext } from '../context/UserContext';
import { useEffect } from 'react';

function App() {
  const {fetchedData} =  useUserContext()
 const statusCode = fetchedData?.statusCode || 401
  
//  useEffect(()=>{
//   console.log(fetchedData,"?????????????????");
  
//  },[fetchedData])
  return (
    <>  
    
      <Routes>
        <Route path='/login' element={<Sigin />} />
        <Route path='/register' element={<SignUp />} />

        {statusCode === 200 && <Route path='/' element={<Layout />}>

        <Route path='/dashboard' element={<KanBanBoard />} />
        
        <Route path='/dashboard-1' element={<SignUp />} />
        <Route path='/dashboard-2' element={<Sigin />} />
        
        </Route>}
        



      </Routes>
     
    </>
  )
}

export default App
