import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { TbMessageCirclePlus } from "react-icons/tb";

const InvitePage = () => {
    const [invites, setInvites] = useState([]);

    useEffect(() => {
        const fetchInvites = async () => {
            const token = localStorage.getItem("jwtToken");
            const decoded = jwtDecode(token);
            console.info(decoded)
            setInvites(JSON.parse(decoded.invite))
        }
        fetchInvites();
    }, [])


    return (
        <div>
            <h1>Dina invationer</h1>
            {invites && invites.length > 0
                ? <ul>
                    {invites.map(invite =>
                        <li key={invite.conversationId}>
                            <Link to={`/conversation/${invite.conversationId}`}>
                                <p>{invite.username}</p>
                                <TbMessageCirclePlus />
                            </Link>
                        </li>
                    )}
                </ul>
                : <p>Inga invationer än</p>
            }
        </div>
    )
}
export default InvitePage