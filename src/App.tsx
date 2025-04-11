import { BrowserRouter,Navigate,Route,Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Profile from './pages/profile';
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import Create from './pages/create';
// import ProtectedRoutes from './components/protectedRoutes';
import Details from './pages/details';
function App() {
  return (
    
    <BrowserRouter>
         <Routes>
             <Route path="/" element={<Navigate to="/login" />} />
             <Route path="/books" element={<Home />} />
             <Route path="books/:id" element={<Details />} />
             <Route path="/profile" element={<Profile />} />
             <Route path="/create" element={<Create />} />
             <Route path="/login" element={<Login />} />
             <Route path="/signup" element={<Signup />} />
         </Routes>
    </BrowserRouter>
  )
}

export default App
