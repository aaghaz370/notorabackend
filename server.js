import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes.js";
import commentRoutes from "./routes/comments.js";
import morgan from "morgan";




dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/books", bookRoutes);
app.use("/api/comments", commentRoutes);



app.listen(9090, () => console.log("🚀 Notora user backend running"));

