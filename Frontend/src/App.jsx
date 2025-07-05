import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './Layouts/Layout'
import Sigin from './Components/Sigin'
import SignUp from './Components/SignUp'
import KanBanBoard from './Components/KanBanBoard';
import { useEffect, useState } from 'react';
import apiClient from '../Service/apiClient';

function App() {
  const [fetchedData, setFetchedData] = useState({})
  const navigate  = useNavigate()
   useEffect(() => {
    const data = async () => {
    try{
      const response = await apiClient.whoAm()
     setFetchedData(response)
     console.log(response)
    } catch(error){
      console.log(error)
      navigate('/login')
    }
  }
  data()
    
 }, [])
 const {statusCode} = fetchedData
 console.log(statusCode)
 
 
  
 
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
