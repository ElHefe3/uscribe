import swaggerUi from "swagger-ui-express";
import express from "express";
import { router } from "./routes";
import { connectRedis } from "./services/redis.services";
import swaggerDocument from "./docs/swagger.json";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", router);

async function start() {
  try {
    await connectRedis();
    app.listen(port, () => {
      console.log(`✅ Server running at http://localhost:${port}`);
      console.log(`📘 Swagger docs available at http://localhost:${port}/docs`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

start();
