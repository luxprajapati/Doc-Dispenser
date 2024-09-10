import { matchPath, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import { useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import OtpPage from "./pages/OtpPage";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import CreateDocument from "./pages/CreateDocument";
import ShareDocument from "./pages/ShareDocument";

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

        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="verify-otp"
          element={
            <OpenRoute>
              <OtpPage />
            </OpenRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/create-document"
          element={
            <PrivateRoute>
              <CreateDocument />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit-document/:documentId"
          element={
            <PrivateRoute>
              <CreateDocument />
            </PrivateRoute>
          }
        />

        <Route
          path="/share-document"
          element={
            <PrivateRoute>
              <ShareDocument />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
