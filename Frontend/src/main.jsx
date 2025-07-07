import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { UserContextProvider } from '../context/UserContext.jsx';
import {ProjectContextProvider, SingleProjectProvider} from '../context/ProjectContext.jsx'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
    
    <UserContextProvider>

    <ProjectContextProvider>
  <SingleProjectProvider>
    <App />
  </SingleProjectProvider>
</ProjectContextProvider>
    </UserContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
