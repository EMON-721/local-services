import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { errorHandler } from "./middleware/error-handler";
import { ordersRouter } from "./routes/orders";
import { servicesRouter } from "./routes/services";
import { initializeRabbitMQ } from "./config/rabbitmq";

const app = express();
const port = process.env.PORT || 3003;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/orders", ordersRouter);
app.use("/api/orders/services", servicesRouter);

// Health check
app.get("/api/orders/health", (_req, res) => {
  res.json({ status: "healthy", service: "orders" });
});

// Error handler
app.use(errorHandler);

// Start server
async function start() {
  try {
    await initializeRabbitMQ();
    console.log("Connected to RabbitMQ");

    app.listen(port, () => {
      console.log(`Orders service running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start orders service:", error);
    process.exit(1);
  }
}

start();
