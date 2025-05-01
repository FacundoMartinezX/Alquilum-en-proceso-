
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import { SpaceList } from "./components/SpaceList";
import { SpaceDetail } from "./components/SpaceDetail";
import { SignUp } from "./pages/SignUp";
import { Navbar } from "./pages/Navbar";
import { Login } from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<SpaceList />}/>
        <Route path="/space/:id" element={<SpaceDetail/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;