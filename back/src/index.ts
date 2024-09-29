import express from "express";
import cors from "cors";
import RateLimit from "express-rate-limit";

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
import { authentication, authorization } from "./middlewares";

const app = express();

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});

app.use(cors());
app.use(express.json());
app.use(limiter);
app.use("/v1", authRoutes);
app.use(authorization(['admin', 'employee']));
app.use("/v1", authentication, userRoutes);
app.use("/v1", bookRoutes);
app.use("/v1", borrowRoutes);
app.use("/v1", authentication, memberRoutes);

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
