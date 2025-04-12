import React,{useEffect} from "react";
import useAuthStore from "../store/useAuthStore";
import { Navigate } from "react-router-dom";
const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthStore();
  if(!token){
    return <Navigate to="/" />; 
  }

  if(token) {
    return <>{children} </>
  }
  return <>{children}</> 
};

export default ProtectedRoutes;
