import {BrowserRouter as Router , Route, Routes , Link} from 'react-router-dom'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import AuthProvider from './context/auth';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
function App() {
  // const [user] = useAuthState(auth);
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<Profile/>} />
        
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
