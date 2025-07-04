import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chats from "./pages/Chats";
import ConversationPage from "./pages/ConversationPage";
import InvitesPage from "./pages/InvitesPage";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/conversation/:id" element={<ConversationPage />} />
          <Route path="/invites" element={<InvitesPage />} />
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
