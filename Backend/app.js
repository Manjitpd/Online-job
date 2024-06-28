
import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
// Import the cors package

const app = express();
config({ path: "./config/config.env" });

// Apply cors middleware to your express app
app.use(
  cors({
    origin: 'http://localhost:5173', // Replace with your frontend application's origin
    optionsSuccessStatus: 200,
    credentials: true, // Allow cookies to be sent in the request
  })
);

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

dbConnection();

app.use(errorMiddleware);

export default app;
