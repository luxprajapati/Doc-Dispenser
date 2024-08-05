import { matchPath, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import { useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import OtpPage from "./pages/OtpPage";

function App() {
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`w-screen min-h-[100vh]
          ${
            matchRoute(`login`) || matchRoute(`signup`)
              ? "bg-slate-100"
              : "bg-zinc-900"
          }
       flex flex-col font-poppins`}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<OtpPage />} />
      </Routes>
    </div>
  );
}

export default App;
