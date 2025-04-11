import React from "react"
import Navbar from "./navbar"
import ProtectedRoutes from "./protectedRoutes"

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="mb-14">
     <ProtectedRoutes>
       {children}
       <Navbar/> 
     </ProtectedRoutes>
    </div>
  )
}

export default Layout