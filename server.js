import app from "./src/app.js";
import * as dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });