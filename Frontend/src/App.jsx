import { Routes, Route } from 'react-router-dom';
import Layout from './Layouts/Layout'
import Sigin from './Components/Sigin'
import SignUp from './Components/SignUp'
import SideNavOptions from './Components/SideNavOptions';
import CreateTaskForm from './Components/CreateTaskForm';
import KanBanBoard from './Components/KanBanBoard';

function App() {
 

  return (
    <>
    
      <Routes>
        <Route path='/' element={<Layout />}>

        <Route path='/dashboard' element={<KanBanBoard />} />
        
        <Route path='/dashboard-1' element={<CreateTaskForm />} />
        <Route path='/dashboard-2' element={<SideNavOptions />} />
        </Route>


      </Routes>
     
    </>
  )
}

export default App
