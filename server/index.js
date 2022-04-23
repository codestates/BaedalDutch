require("dotenv").config();
const fs = require("fs");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();
const usersRouter = require("./routes/users");
const partiesRouter = require("./routes/parties");

app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    credentials: true,
    cookie: {
      maxAge: 24 * 6 * 60 * 10000,
      httpOnly: false,
      secure: true,
      sameSite: "None",
    },
  })
);

app.use(cookieParser());
app.get("/", (req, res) => res.send("hello world"));
app.use("/users", usersRouter);
app.use("/parties", partiesRouter);

const PORT = 4000;

let server = app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

module.exports = server;
