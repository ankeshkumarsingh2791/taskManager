import { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../Service/apiClient";
import { useLocation, useNavigate } from "react-router";

const userContext = createContext();

export function UserContextProvider({ children }) {
  const [fetchedData, setFetchedData] = useState({ data: {}, statusCode: 400 });
  const navigate = useNavigate();
  const location = useLocation(); // ⬅️ get current route

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.whoAm();
        // const response = localStorage.getItem("token")
        setFetchedData(response);
      } catch (error) {
        console.error(error);

        // ✅ Only redirect to login if not already on a public route
        const publicRoutes = ["/login", "/register"];
        if (!publicRoutes.includes(location.pathname)) {
          navigate("/login");
        }
      }
    };

    fetchUser();
  }, [location.pathname, navigate]);

  return (
    <userContext.Provider value={{ fetchedData, setFetchedData }}>
      {children}
    </userContext.Provider>
  );
}

// custom hook
export const useUserContext = () => useContext(userContext);
