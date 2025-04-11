import React from "react";
// import useAuthStore from "../store/useAuthStore";
// import { useNavigate } from "react-router-dom";
const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
//   const { user, isLoggedIn } = useAuthStore();
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!user && !isLoggedIn) {
//         navigate("/");
//       }
//   },[user,isLoggedIn]);

//   if (!user && !isLoggedIn) {
//     return null; // Return null or a fallback UI if the user is not authenticated
//   }

  return <>{children}</>; // Render children if the user is authenticated
};

export default ProtectedRoutes;
