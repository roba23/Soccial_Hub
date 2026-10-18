import { Server } from "socket.io";
import { connectDB } from "./config/db.js";

export let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log(`user connected: ${socket.id}`);

        // 1. Allow users to join a private room based on who they are talking to
        socket.on("join-room", ({ sentBy, sendTo }) => {
            // Create a consistent unique room name regardless of who is sender/receiver
            const roomName = [sentBy, sendTo].sort().join("-");
            socket.join(roomName);
            console.log(`User joined room: ${roomName}`);
        });

        // 2. Handle incoming chat messages
        socket.on("chat message", async (msg) => {
            try {
                let db = await connectDB();
                
                // Save to database
                await db.collection('messages').insertOne({
                    sentBy: msg.sentBy,
                    sentTo: msg.sendTo,
                    message: msg.message,
                    date: new Date()
                });

                // Create the same unique room name
                const roomName = [msg.sentBy, msg.sendTo].sort().join("-");

                // Send ONLY to the users inside this specific chat room
                io.to(roomName).emit("recieve-message", {
                    message: msg.message,
                    sentBy: msg.sentBy
                });

            } catch (error) {
                console.error("Database error:", error);
            }
        });

        socket.on("disconnect", () => {
            console.log(`user disconnected: ${socket.id}`);
        });
    });

    return io;
};

export const getIo = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};
