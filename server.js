require("dotenv").config();

const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT;

const app = express();
const server = http.createServer(app);

app.use([
  cors({ origin: "*" }),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
]);

const io = require("socket.io")(server, { cors: { origin: "*" } });

// const socketManager = require("./socketManager");

// io.on("connection", (socket) => {
//   try {
//     console.log("connected");

//     socket.on("code", (data, callback) => {
//       socket.broadcast.emit("code", data);
//     });
//   } catch (ex) {
//     console.log(ex.message);
//   }
// });

const socketList = {};

io.on("connection", (socket) => {
  try {
    console.log("ws connected.");

    socket.on("disconnect", () => {
      socket.disconnect();
      console.log("socket disconnected.");
    });

    socket.on("BE-check-user", ({ roomId, userName }) => {
      let error = false;

      io.in(roomId)
        .fetchSockets()
        .then((sockets) => {
          sockets.forEach((sc) => {
            if (socketList[sc.id] === userName) {
              error = true;
            }
          });

          socket.emit("FE-error-user-exist", { error });
        });
    });

    // join room
    socket.on("BE-join-room", ({ roomId, userName }) => {
      console.log(`${userName} join room ${roomId}`);
      // Socket Join RoomName
      socket.join(roomId);
      socketList[socket.id] = { userName, video: true, audio: true };

      io.in(roomId)
        .fetchSockets()
        .then((sockets) => {
          try {
            const users = [];
            sockets.forEach((sc) => {
              // Add User List
              users.push({ userId: sc.id, info: socketList[sc.id] });
            });

            socket.broadcast.to(roomId).emit("FE-user-join", users);
          } catch (e) {
            socket.emit("FE-error-user-exist", { error: true });
          }
        });
    });

    socket.on("BE-call-user", ({ userToCall, from, signal }) => {
      io.to(userToCall).emit("FE-receive-call", {
        signal,
        from,
        info: socketList[socket.id],
      });
    });

    socket.on("BE-accept-call", ({ signal, to }) => {
      io.to(to).emit("FE-call-accepted", {
        signal,
        answerId: socket.id,
      });
    });

    socket.on("BE-send-message", ({ roomId, msg, sender }) => {
      io.sockets.in(roomId).emit("FE-receive-message", { msg, sender });
    });

    socket.on("BE-leave-room", ({ roomId, leaver }) => {
      delete socketList[socket.id];
      socket.broadcast
        .to(roomId)
        .emit("FE-user-leave", { userId: socket.id, userName: [socket.id] });
      io.sockets.sockets[socket.id].leave(roomId);
    });

    socket.on("BE-toggle-camera-audio", ({ roomId, switchTarget }) => {
      if (switchTarget === "video") {
        socketList[socket.id].video = !socketList[socket.id].video;
      } else {
        socketList[socket.id].audio = !socketList[socket.id].audio;
      }

      socket.broadcast
        .to(roomId)
        .emit("FE-toggle-camera", { userId: socket.id, switchTarget });
    });

    // socket.on("join-room", ({ roomId }) => {
    //   socket.join(roomId);

    //   socket
    //     .to(roomId)
    //     .emit("user-connected", `user-${socket.id} join the room-${roomId}`);

    //   socket.on("leave-room", (roomId) => {
    //     socket.leave(roomId);
    //     socket.to(roomId).emit("leave-room", `user-${socket.id} leave room`);
    //   });
    // });
  } catch (ex) {
    console.log(ex.message);
  }
});

server.listen(port, () => {
  console.log("server is run.");
});

// socket.on("join room", (roomId) => {
//   if (users[roomId]) {
//     users[roomId].push(socket.id);
//   } else {
//     users[roomId] = [socket.id];
//   }

//   socketToRoom[socket.id] = roomId;

//   const usersInThisRoom = users[roomId].filter((id) => id !== socket.id);

//   socket.emit("all users", usersInThisRoom);
// });

// socket.on("sending signal", (payload) => {
//   io.to(payload.userToSignal).emit("user joined", {
//     signal: payload.signal,
//     callerId: payload.callerId,
//   });
// });

// socket.on("returning signal", (payload) => {
//   io.to(payload.callerId).emit("receiving returned signal", {
//     signal: payload.signal,
//     id: socket.id,
//   });
// });

// socket.on("disconnect", () => {
//   const roomId = socketToRoom[socket.id];
//   let room = users[roomId];

//   if (room) {
//     room = room.filter((id) => id !== socket.id);
//     users[roomId] = room;
//   }

//   socket.broadcast.emit("user left", socket.id);
// });

// socket.on("change", (payload) => {
//   socket.broadcast.emit("change", payload);
// });
