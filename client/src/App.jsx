import './App.css';
import {Route, Routes} from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from './pages/RegisterPage';
import Layout from './Layout';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import ProfilePage from './pages/ProfilePage';
import CarsPage from './pages/CarsPage';
import CarsFormPage from './pages/CarsFormPage';

axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<IndexPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/account/" element={<ProfilePage/>} />
          <Route path="/account/cars" element={<CarsPage/>} />
          <Route path="/account/cars/new" element={<CarsFormPage/>} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App;
