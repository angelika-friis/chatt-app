import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chats from "./pages/Chats";
import ConversationPage from "./pages/ConversationPage";
import InvitesPage from "./pages/InvitesPage";
import UserProfile from "./pages/ProfilePage";
import RequireAuth from "./auth/RequireAuth";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<RequireAuth />}>
            <Route path="/chats" element={<Chats />} />
            <Route path="/conversation/:id" element={<ConversationPage />} />
            <Route path="/invites" element={<InvitesPage />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
