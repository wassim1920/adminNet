import "./app.scss"
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.js";

const App = () => {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user && !localStorage.getItem("user")) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path="/watch" element={<ProtectedRoute><Watch/></ProtectedRoute> }/>
      <Route path="/movies"  element={<ProtectedRoute><Home type="movies"/></ProtectedRoute>}/>
      <Route path="/series"  element={<ProtectedRoute><Home type="series"/></ProtectedRoute>}/>
    </Routes>
  </BrowserRouter>
  )
};

export default App;