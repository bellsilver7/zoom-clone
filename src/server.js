import http from "http";
// import WebSocket from "ws";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/video", (_, res) => res.render("video"));
app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true,
  },
});

instrument(io, {
  auth: false,
});

const handleListen = () => console.log("Listening on http://localhost:3000");
httpServer.listen(3000, handleListen);
