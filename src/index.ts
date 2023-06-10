import dotenv from "dotenv";

dotenv.config();

console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD);
