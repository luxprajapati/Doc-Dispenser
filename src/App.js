import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div className="w-screen min-h-[100vh] bg-zinc-900 flex flex-col font-poppins">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
