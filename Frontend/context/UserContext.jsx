import { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../Service/apiClient";
import { useNavigate } from "react-router";

const userContext = createContext()

export function UserContextProvider({children}){

    const [fetchedData, setFetchedData] = useState({data:{},statusCode:400})
    const navigate = useNavigate()
       useEffect(() => {
        const data = async () => {
        try{
          const response = await apiClient.whoAm()
         setFetchedData(response)
        } catch(error){
          console.error(error);
          navigate('/login')
        }
      }
      data()
        
     }, [navigate])

     return<userContext.Provider value={{fetchedData,setFetchedData}}>{children}</userContext.Provider>
}

// custom hook
export const useUserContext = ()=> useContext(userContext)