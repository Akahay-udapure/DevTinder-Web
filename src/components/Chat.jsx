import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const { targetUserId } = useParams();
    const user = useSelector((store) => store.user);
    const userId = user?._id;
    const chatBoxRef = useRef(null);

    // Use useCallback to memoize the function
    const scrollToBottom = useCallback(() => {
        if (chatBoxRef.current) {
            setTimeout(() => {
                chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
            }, 0);
        }
    }, []);

    const fetchChatMessages = async () => {
        const chat = await axios.get(BASE_URL + "chat/" + targetUserId, {
            withCredentials: true,
        });
        const chatMessages = chat?.data?.messages.map((msg) => {
            const { senderId, text } = msg;
            return {
                firstName: senderId?.firstName,
                lastName: senderId?.lastName,
                text,
                time: msg.createdAt,
            };
        });
        setMessages(chatMessages);
        scrollToBottom(); // Scroll after setting messages
    };

    const formatTime = (timeString) => {
        const date = new Date(timeString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, "0");
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    useEffect(() => {
        if (!userId || !targetUserId) return;
        fetchChatMessages();
    }, [userId, targetUserId]);

    useEffect(() => {
        scrollToBottom(); // Scroll whenever messages change
    }, [messages, scrollToBottom]);

    useEffect(() => {
        if (!userId || !targetUserId) return;
        const socket = createSocketConnection();
        socket.emit("joinChat", {
            firstName: user.firstName,
            userId,
            targetUserId,
        });

        socket.on("messageReceived", ({ firstName, lastName, text, time }) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { firstName, lastName, text, time },
            ]);
            // No need to call scrollToBottom here as the messages effect will handle it
        });

        return () => socket.disconnect();
    }, [userId, targetUserId]);

    const sendMessage = () => {
        if (!newMessage.trim()) return;
        const socket = createSocketConnection();
        socket.emit("sendMessage", {
            firstName: user.firstName,
            lastName: user.lastName,
            userId,
            targetUserId,
            text: newMessage,
        });
        setNewMessage("");
    };

    return (
        <div className="w-full md:w-3/4 mx-auto mt-2 border border-gray-700 rounded-lg shadow-xl bg-gray-900 h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-1 border-b border-gray-700 bg-gray-800">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-green-400 animate-pulse"></div>
                    <div>
                        <p className="text-lg font-bold text-white">Chat</p>
                        <p className="text-sm text-green-300">Online</p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div
                className="flex-1 overflow-y-auto p-4 h-full"
                ref={chatBoxRef}
                style={{ overflowAnchor: "none" }} // Disable browser's auto-scrolling
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat ${
                            user.firstName === msg.firstName
                                ? "chat-end"
                                : "chat-start"
                        }`}>
                        <div className="chat-image avatar">
                            <div
                                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg"
                                style={{
                                    lineHeight: "40px",
                                    height: "40px",
                                    width: "40px",
                                    textAlign: "center",
                                }}>
                                {`${msg.firstName?.[0]}${msg.lastName?.[0]}`}
                            </div>
                        </div>

                        <div className="chat-header text-sm">
                            {`${msg.firstName} ${msg.lastName}`}{" "}
                            <span className="text-xs text-gray-400 ml-1">
                                {formatTime(msg.time)}
                            </span>
                        </div>
                        <div
                            className={`chat-bubble ${
                                user.firstName === msg.firstName
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-700 text-white"
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-gray-800 border-t border-gray-700 flex items-center gap-3">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Type a message..."
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all">
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
