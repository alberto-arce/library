import express from "express";
import cors from "cors";

import { PORT } from "./common";
import {
  userRoutes,
  bookRoutes,
  authRoutes,
  borrowRoutes,
  memberRoutes,
} from "./routes";
import { connectToDatabase } from "./database";
import { logger } from "./logs";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/v1", userRoutes);
app.use("/v1", bookRoutes);
app.use("/v1", authRoutes);
app.use("/v1", borrowRoutes);
app.use("/v1", memberRoutes);

async function init() {
  try {
    await connectToDatabase();
    const port = PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    logger.info("server is running");
  } catch (error) {
    console.error("Error initializing the application:", error);
    process.exit(1);
  }
}

init();
