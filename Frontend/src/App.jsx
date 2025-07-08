import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './Layouts/Layout'
import Sigin from './Components/Sigin'
import SignUp from './Components/SignUp'
import KanBanBoard from './Components/KanBanBoard';
import CreateTaskForm from './Components/CreateTaskForm'
import { useUserContext } from '../context/UserContext';
import { useEffect } from 'react';
import Verify from './Components/Verify';

function App() {
  const {fetchedData} =  useUserContext()
 const statusCode = fetchedData?.statusCode || 401
  

  return (
    <>  
    
      <Routes>
        <Route path='/login' element={<Sigin />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/verify' element={<Verify/>} />

        {statusCode === 200 && <Route path='/' element={<Layout />}>

        <Route path='/dashboard' element={<KanBanBoard />} />
        <Route path='/add-task' element={<CreateTaskForm />} />
        
        <Route path='/dashboard-1' element={<SignUp />} />
        <Route path='/dashboard-2' element={<Sigin />} />
        
        </Route>}
        



      </Routes>
     
    </>
  )
}

export default App
