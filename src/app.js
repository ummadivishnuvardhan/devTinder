const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json()); // Required to parse JSON body from requests

app.post("/signup", async (req, res) => {
    // console.log(req.body);
    // Assuming req.body contains user data, you can create a new user instance
    try {
        const user = new User(req.body);

        await user.save();
        res.send("User created Successfully");
    } catch (error) {
        res.status(500).send("Error creating user: " + error.message);
    }
});

connectDB()
    .then(() => {
        console.log("Database connection established successfully");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });
