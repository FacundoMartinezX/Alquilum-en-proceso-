
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import { Navbar } from "./pages/navbar";
import { SpaceList } from "./components/SpaceList";
import { SpaceDetail } from "./components/SpaceDetail";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<SpaceList />}/>
        <Route path="/space/:id" element={<SpaceDetail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;