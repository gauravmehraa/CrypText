import { Server, Socket } from "socket.io";
import http from "http";
import express, { Express } from "express";

const app: Express = express();

const server: http.Server = http.createServer(app);
const io: Server = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"]
  }
});

const userSocketMap: Record<string, string> = {}; // userid mapped to socketid

export const getReceiverSocketId = (receiverId: string): string | undefined => {
  return userSocketMap[receiverId];
}

io.on('connection', (socket: Socket) => {
  const userId = socket.handshake.query.userId as string;
  if(userId) userSocketMap[userId] = socket.id;
  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  })
})

export { app, io, server }