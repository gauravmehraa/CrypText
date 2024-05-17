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

export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
}


const userSocketMap: Record<string, string> = {}; // userid mapped to socketid

io.on('connection', (socket: Socket) => {

  const userId = socket.handshake.query.userId;
  if(userId) userSocketMap[userId as string] = socket.id;
  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    delete userSocketMap[userId as string];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  })
})

export { app, io, server }