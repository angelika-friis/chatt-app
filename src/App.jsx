import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route element={<ProtectedRoute />}>
            <Route path="/chat" element={<Dashboard />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
