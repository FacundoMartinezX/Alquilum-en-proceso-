import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import { SpaceList } from "./components/SpaceList";
import { SpaceDetail } from "./components/SpaceDetail";
import { SignUp } from "./pages/SignUp";
import { Navbar } from "./pages/Navbar";
import { Login } from "./pages/Login";
import { CreateSpaceWork } from "./pages/CreateSpaceWork";
import { MyReservations } from "./pages/MyReservations";
import { Profile } from "./pages/profile";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<SpaceList />}/>
        <Route path="/space/:id" element={<SpaceDetail/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/createspacework" element={<CreateSpaceWork/>}/>
        <Route path="/myReservations" element={<MyReservations/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;