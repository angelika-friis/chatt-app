import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createMessage, deleteMessage } from "../api/chatService";
import { enrichMessages } from "../utils/chatHelpers";
import { GoPaperAirplane } from "react-icons/go";
import { Avatar, Box, IconButton, List, Paper } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const ConversationPage = () => {
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const currentUserId = JSON.parse(localStorage.getItem("userData")).id;
    const id = useParams();

    useEffect(() => {
        loadMessages();
    }, [])

    const loadMessages = async () => {
        const enrichedMessages = await enrichMessages(id.id);
        setMessages(enrichedMessages);
    };

    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    const handleSend = () => {
        if (!text.trim()) return;
        createMessage(id.id, text);
        setText("");
        loadMessages();
    };

    const handleDeleteMessage = async (messageId) => {
        deleteMessage(messageId);
        setMessages(prev => prev.filter(msg => msg.id !== messageId));
    };

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            backgroundColor: "transparent",
            position: "relative",
            height: 'calc(100vh - 72px)',
        }}>
            <List sx={{
                flexGrow: 1,
                overflowY: "auto",
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                minHeight: 0,
                mb: 8,
            }}>
                {messages.map((message, index) => {
                    const isUser = message.user.id === currentUserId;

                    return (
                        <Box key={message.id} sx={{ mb: 2 }}>
                            {(index === 0 ||
                                new Date(message.createdAt).toDateString() !==
                                new Date(messages[index - 1]?.createdAt).toDateString()) && (
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            display: "block",
                                            textAlign: "center",
                                            mb: 1,
                                            color: "grey.600"
                                        }}
                                    >
                                        {new Date(message.createdAt).toLocaleDateString()}
                                    </Typography>
                                )}

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "60px 1fr 1fr",
                                    gridTemplateRows: "auto auto",
                                    gridTemplateAreas: `
                                        "avatar username username"
                                        "avatar chat-bubble chat-bubble"
                                        "avatar time time"
                                    `,
                                    alignItems: "start",
                                    gap: 0.5,
                                }}
                            >
                                {!isUser && (
                                    <Avatar
                                        src={message.user.avatar}
                                        alt={message.user.username}
                                        sx={{ gridArea: "avatar" }}
                                    >
                                        {Array.from(message.user.username)[0].toUpperCase?.() || ""}
                                    </Avatar>
                                )}

                                {!isUser && (
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            gridArea: "username",
                                            marginLeft: 0,
                                            justifySelf: "start",
                                        }}
                                    >
                                        {message.user.username}
                                    </Typography>
                                )}

                                <Paper
                                    sx={{
                                        gridArea: "chat-bubble",
                                        p: 2,
                                        borderRadius: 3,
                                        backgroundColor: isUser ? "primary.main" : "grey.200",
                                        color: isUser ? "white" : "black",
                                        justifySelf: isUser ? "end" : "start",
                                        maxWidth: "70%",
                                        position: "relative",
                                        sx: { boxShadow: "none" },
                                    }}
                                >


                                    <Typography variant="body1">
                                        {message.text}
                                    </Typography>

                                    {isUser && (
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDeleteMessage(message.id)}
                                            sx={{
                                                position: "absolute",
                                                bottom: 0.5,
                                                right: 0.5,
                                                opacity: 0.6,
                                                "&:hover": { opacity: 1 },
                                            }}
                                        >
                                            < DeleteOutlineIcon sx={{ fontSize: 14 }} />
                                        </IconButton>
                                    )}
                                </Paper>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        gridArea: "time",
                                        opacity: 0.7,
                                        color: "grey.600",
                                        justifySelf: isUser ? "end" : "start",
                                    }}
                                >
                                    {new Date(message.createdAt).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </Typography>

                            </Box>
                        </Box>
                    );
                })}

            </List>

            <Paper
                variant="outlined"
                elevation={1}
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    borderRadius: "25px",
                    boxShadow: "none",
                    display: "flex",
                    alignItems: "center",
                    p: 1,
                    m: 2,
                    backgroundColor: 'white',
                    zIndex: 1,
                }}
            >
                <InputBase
                    placeholder="Skriv..."
                    value={text}
                    onChange={handleInputChange}
                    sx={{ ml: 1, flex: 1, paddingLeft: 2 }}
                    minRows={1}
                    maxRows={4}
                    multiline
                />
                <IconButton size="large" onClick={handleSend}>
                    <GoPaperAirplane />
                </IconButton>
            </Paper>
        </Box>
    );
}

export default ConversationPage;