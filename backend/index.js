import "dotenv/config";

import express from "express";
import cors from "cors";
import db from "./db/db.config.js";
import mainRouter from "./src/api/main.routes.js";
import { errorhandler } from "./src/middleware/error-handler.js";

const app = express();
// Enable CORS for your specific frontend origin
app.use(
  cors({
    origin: ["http://localhost:5173", "https://chatgptclone.getenetabebaw.com"],
    credentials: true,
  }),
);
app.use(express.json());
app.use("/api", mainRouter);
app.use("/test", (req, res) => {
  res.send("Server is running");
});

app.use(errorhandler);

async function startServer() {
  try {
    const connection = await db.getConnection();
    connection.release();

    app.listen(3888, (err) => {
      if (err) {
        throw err;
      }
      console.log("Server is running on port http://localhost:3888");
    });
  } catch (err) {
    console.log("Error starting server:", err.message);
  }
}

startServer();
