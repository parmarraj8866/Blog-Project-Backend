const express = require('express');
const app = express();
const cors = require('cors');
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv").config()
const cookieSession = require("cookie-session")

require("./Config/db")()

app.use(cookieSession({
    name: "session",
    keys: [process.env.SECRET_KEY],
    maxAge: 60 * 60 * 1000
}))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded());

app.use('/uploads', express.static('uploads'));

const route = require("./routes/blog.route");
app.use("/api/blog", route);

const userPassroute = require("./routes/userpassword.route")
app.use("/api/userpass", userPassroute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
