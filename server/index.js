require("dotenv").config();
const fs = require("fs");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
// const morgan = require('morgan')
const helmet = require("helmet");
const path = require("path");
const app = express();
const usersRouter = require("./routes/users");
const partiesRouter = require("./routes/parties");
const ordersRouter = require("./routes/orders");
const adminRouter = require("./routes/admin");

// app.use(express.static(path.join(__dirname, '../client/public')))
app.use(express.json());
app.use(helmet());
// app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: false }));

let server = http.createServer(app);
app.use(
  cors({
    origin: [
      "http://baedaldutch-ukuk.s3-website-us-east-1.amazonaws.com",
      "https://d823dlhxcxwnu.cloudfront.net",
      "https://baedaldutch.tk",
    ],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    credentials: true,
    // cookie: {
    //   maxAge: 24 * 6 * 60 * 10000,
    //   httpOnly: false,
    //   secure: true,
    //   sameSite: "None",
    // },
  })
);
app.use(cookieParser());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
  res.send("hihihihihihihihihi");
});
app.use("/users", usersRouter);
app.use("/parties", partiesRouter);
app.use("/orders", ordersRouter);
app.use("/admin", adminRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});
const PORT = 80;

server = app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
const io = require("socket.io")(server, {
  transports: ["websocket", "polling"],
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
  allowEIO3: true,
});

let users = [];
let rooms = [];
let roomChatLog = [];

io.on("connection", (socket) => {
  console.log("socket connected");
  io.engine.on("connection_error", (err) => {
    console.log("socket err:", err);
  });
  socket.on("joinServer", ({ nickname, roomId }) => {
    let user = {
      id: socket.id,
      nickname,
      userRoom: [],
    };
    console.log("joinServer user:", user);
    let check = users.find((user) => user.nickname === nickname);

    if (!check) {
      users.push(user);
    }

    users.forEach((el) => {
      console.log("el 확인", el);
      if (el.nickname === nickname) {
        let userRoom = el.userRoom;
        let userNickName = el.nickname;
        console.log("유저룸", userRoom);
        console.log("유저닉네임", userNickName);
        io.emit("myRoomList", { userRoom, userNickName });
      }
    });
    if (roomId) {
      let check = roomChatLog.find((el) => el[0] === roomId);
      console.log("joinServer check:", check);
      if (check) {
        let slice = check.slice(1);

        io.emit("roomChatLog", { slice, roomId });
      }
    }
  });

  socket.on("createRoom", ({ id, roomName, nickname, categoryFood }) => {
    console.log("createRoom 진입");
    let room = {
      id,
      roomName,
      categoryFood,
      roomUsers: [nickname],
    };
    let check = rooms.find((room) => room.id === id);
    console.log("room:", room);
    if (!check) {
      rooms.push(room);
      users.forEach((el) => {
        if (el.nickname === nickname) {
          let userRoomData = {
            roomName,
            id,
            categoryFood,
          };
          console.log("유저룸데이터", userRoomData);
          el.userRoom.push(userRoomData);
          console.log("el.userRoom", el.userRoom);
        }
      });
    }
    console.log("rooms:", rooms);
  });

  socket.on("sendRoomMessage", (roomMessageInfo) => {
    let roomId = roomMessageInfo.roomId;
    let check = roomChatLog.find((el) => el[0] === roomMessageInfo.roomId);

    if (!check) {
      roomChatLog.push([roomMessageInfo.roomId]);

      let recheck = roomChatLog.find((el) => el[0] === roomMessageInfo.roomId);

      recheck.push({
        nickname: roomMessageInfo.nickname,
        message: roomMessageInfo.message,
      });

      let slice = recheck.slice(1);

      io.emit("roomChatLog2", { slice, roomId });
    } else {
      check.push({
        nickname: roomMessageInfo.nickname,
        message: roomMessageInfo.message,
      });

      let slice = check.slice(1);

      io.emit("roomChatLog2", { slice, roomId });
    }
  });

  socket.on("joinRoom", ({ id, nickname, roomName, categoryFood }) => {
    let checkRoomId = rooms.find((el) => el.id === id);

    console.log("checkRoomId 진입");
    if (checkRoomId) {
      let checkRoomUsers = checkRoomId.roomUsers.find((el) => el === nickname);
      console.log("checkRoomUsers:", checkRoomUsers);

      if (!checkRoomUsers) {
        checkRoomId.roomUsers.push(nickname);
        users.forEach((el) => {
          if (el.nickname === nickname) {
            let userRoomData = {
              roomName,
              id,
              categoryFood,
            };

            el.userRoom.push(userRoomData);
            console.log("joinRoom-el.userRoom", el.userRoom);
          }
        });
      }
    }
  });

  socket.on("leaveRoom", ({ roomId, nickname }) => {
    users.forEach((el) => {
      if (el.nickname === nickname) {
        let index = el.userRoom.findIndex((el) => el.id === roomId);

        el.userRoom.splice(index, 1);
      }
    });
    rooms.forEach((el) => {
      if (el.id === roomId) {
        let index = el.roomUsers.findIndex((el) => el === nickname);

        el.roomUsers.splice(index, 1);
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
});

module.exports = server;
