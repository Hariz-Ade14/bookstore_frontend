import { FaHome,FaPlusCircle,FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex items-center shadow fixed bottom-0 left-0 right-0 bg-white p-3 justify-between'>
         <Link to="/books">
             <FaHome color='green' size={20}/>
         </Link>
         <Link to="/create">
             <FaPlusCircle color='green' size={20}/>
         </Link>
         <Link to="/profile">
             <FaUser color='green' size={20}/>
         </Link>
    </div>
  )
}

export default Navbar