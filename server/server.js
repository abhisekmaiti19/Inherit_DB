import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cors from "cors";

const port = process.env.PORT || 3000;
// const port = 3000;
//

connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use("/api", userRoutes);

app.get("/", (req, res) => res.send("server is ready"));

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`server started on port ${port}`));

// - POST /api/user -           Register a user
// - POST /api/user/auth -      authenticate a user and get token
// - POST /api/user/logout -    Logout user and clear cookie
// - POST /api/user/profile -   get user profile
// - POST /api/user/profile -   update a profile
