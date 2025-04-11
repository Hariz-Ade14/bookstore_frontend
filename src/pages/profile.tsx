import Layout from "../components/layout"
import { FaSignOutAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import useAuthStore from "../store/useAuthStore"
const Profile = () => {
  const {logout,user} = useAuthStore();  
  const navigate = useNavigate();
  const LogOut = () => {
        logout();
        navigate("/")
  }
  return (
    <Layout>
        <div className="flex flex-col p-3 border rounded-[10px] m-6 gap-5">
           <h1 className="text-[30px] font-bold text-emerald-900">Profile</h1>
           <p>{user ? user.name : ""}</p>
           <p>{user ? user.email : ""}</p>
           <FaSignOutAlt className="text-emerald-900" onClick={LogOut} size={30}/>
        </div>
        
    </Layout>
    
  )
}

export default Profile