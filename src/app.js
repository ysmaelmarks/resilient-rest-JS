import express from "express";
import db from "./dbConnection/dbConnect.js";
import routes from "./routes/mainRouter.js";

db.on("error", (err) => {
    console.log(console, "MongoDB connection error:" + err);
});

db.once("open", () => {
    console.log("MongoDB connection successful")
});

const app = express();
app.use(express.json());
routes(app);

export default app;