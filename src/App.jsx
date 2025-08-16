import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ConversationPage from "./pages/ConversationPage";
import InvitesPage from "./pages/InvitesPage";
import UserProfile from "./pages/ProfilePage";
import RequireAuth from "./auth/RequireAuth";
import { CssBaseline } from "@mui/material";
import ChatsPage from "./pages/ChatsPage";

function App() {

  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<RequireAuth />}>
            <Route path="/chats" element={<ChatsPage />} />
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
