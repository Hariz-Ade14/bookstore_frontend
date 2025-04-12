import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const PublicRoute = ({ children }: {children: React.ReactNode}) => {
    const {token} = useAuthStore();    
    if (token) {
      // Redirect to dashboard if already authenticated
      return <Navigate to="/books" replace />;
    }
    
    return children;
  };
  
  export default PublicRoute