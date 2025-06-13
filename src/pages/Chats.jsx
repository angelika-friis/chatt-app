import { useState } from "react";
import { inviteUser, searchUsers } from "../api/usersService";

const Chats = () => {
    const [contacts, setContacts] = useState(null);
    const [searchContacts, setSearchContacts] = useState(false);
    const [query, setQuery] = useState("");
    const [searchResult, setSearchResult] = useState(null);


    const handleAddContacts = async (e) => {
        setSearchContacts(true);
    }

    const handleChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim().length === 0) {
            setSearchResult(null);
            return;
        }

        try {
            const res = await searchUsers(value);
            setSearchResult(res.data);
        } catch (error) {
            console.error("Sökningen misslyckades:", error);
            setSearchResult([]);
        }
    }

    const handleAddContact = async (e, user) => {
        e.preventDefault();
        try {
            const res = await inviteUser(user.userId);
            if (!res.success) {
                console.error("Kunde inte bjuda in användaren")
            } else {
                console.log(`${user.username} inbjuden!`);
            }
        } catch (error) {
            console.error("Kunde inte bjuda in användaren:", error);
        }
    }

    return (
        <div>
            <button
                onClick={handleAddContacts}
            >
                Lägg till ny kontakt
            </button>
            {searchContacts &&
                <>
                    <input
                        type="text"
                        value={query}
                        onChange={handleChange}
                    />
                    <ul>
                        {searchResult && searchResult.map(user => (
                            <li key={user.userId}>
                                <p>{user.username}</p>
                                <button
                                    onClick={e => handleAddContact(e, user)}
                                >Lägg till
                                </button>
                            </li>
                        ))}
                    </ul>
                </>}
        </div>
    )
}
export default Chats