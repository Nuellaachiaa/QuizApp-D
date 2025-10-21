const express = require('express');
const bodyParser = require('body-parser');
    const path = require('path');
const mongoose = require('mongoose');
const ejs = require("ejs");
const cors = require('cors');
const quizRoutes = require("./router/quizRoutes");
require("dotenv").config();

PORT = 5000;
const app = express();

app.set("view engine", "ejs")

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

app.use("/questions", quizRoutes);

        // Serve static files from React build
        app.use(express.static(path.join(__dirname, '../FRONTEND/build')));

        // Catch-all handler: send back React's index.html file
        app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../FRONTEND/build/index.html'));
        });
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database successfully connected")
    })
    .catch((error) => {
        console.error("Error connecting to Mongodb: ", error);
    });


    app.listen(PORT, function () {
    console.log("Server started on port " + PORT);
    });
