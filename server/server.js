import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

// Routes
import todoRouter from "./routes/todoRoute.js";

// Middlewares
import errorHandler from "./middleware/errorMiddleware.js";

// Config
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// DB connection
connectDB();

// Routes
app.use("/", todoRouter);

// Error handler (doit être en dernier)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
