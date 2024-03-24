import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcome/Welcome';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Logout from './components/Logout/Logout';
import ManageDocument from './components/ManageDocument/ManageDocument';
import ChatGroup from './components/ChatGroup/ChatGroup';
import UserMgmt from './components/UserMgmt/UserMgmt';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/docMgmt" element={<ManageDocument />} />
        <Route exact path="/userMgmt" element={<UserMgmt />} />
        <Route exact path="/groupChat" element={<ChatGroup />} />
      </Routes>
    </Router>
  );
}

export default App;
