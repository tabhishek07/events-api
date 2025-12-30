require("dotenv").config();

const express = require("express");
const { connectDatabase } = require("./db")
const  eventRouter  = require("./routes/eventsRoutes");

const app = express();

app.use(express.json());

// route to check server health

app.get("/health", (req, res) =>{
    res.json({
        status: "sever is healthy"
    })
})

app.use("/api/v3/app/events", eventRouter);

const PORT = process.env.PORT || 3000;

connectDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
    })
})