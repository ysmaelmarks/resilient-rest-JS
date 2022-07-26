import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbCluster = process.env.DB_CLUSTER;

mongoose.connect(process.env.DB, { useNewUrlParser: true });

let db = mongoose.connection;

export default db;