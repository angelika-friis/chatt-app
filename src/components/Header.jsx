import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchUsers } from "../api/usersService";
import HeaderBar from "./HeaderBar";
import MenuDrawer from "./MenuDrawer";
import UserSearchDialog from "./UserSearchDialog";
import { createConversation } from "../api/chatService";
import { useLogout } from "../hooks/useLogout";

export default function Header() {
    const [user, setUser] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const logoutUser = useLogout();

    useEffect(() => {
        const fetchedUser = JSON.parse(localStorage.getItem("userData"));
        console.log(fetchedUser)
        setUser(fetchedUser);
    }, []);

    const showBackButton = ["/conversation/", "/invites", "/profile"].some(path =>
        location.pathname.startsWith(path)
    );

    const showAddButton = ["/conversation/"].some(path => location.pathname.startsWith(path));

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (!value.trim()) {
            setSearchResult([]);
            return;
        }

        try {
            const res = await searchUsers(value);
            setSearchResult(res.data || []);
        } catch {
            setSearchResult([]);
        }
    };

    const handleCreateConversation = async (e, user) => {
        e.preventDefault();
        try {
            const res = await createConversation(user.userId);
            if (res.success) {
                setDialogOpen(false);
                navigate(`/conversation/${res.conversationId}`);
            }
        } catch (error) {
            console.error("Kunde inte bjuda in användaren:", error);
        }
    };

    return (
        <header>
            <HeaderBar
                showBackButton={showBackButton}
                onBackClick={() => navigate("/chats")}
                onMenuClick={() => setDrawerOpen(true)}
            />

            <MenuDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                user={user}
                onAddConversation={() => { setDialogOpen(true); setDrawerOpen(false); }}
                onNavigate={(path) => navigate(path)}
                onLogout={logoutUser}
            />

            <UserSearchDialog
                open={dialogOpen}
                onClose={() => { setDialogOpen(false); setQuery(""); setSearchResult([]); }}
                query={query}
                onQueryChange={handleSearchChange}
                searchResult={searchResult}
                onAddContact={handleCreateConversation}
            />
        </header>
    );
}
