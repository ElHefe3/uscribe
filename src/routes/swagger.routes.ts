import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json";

export const swaggerRouter = Router();

swaggerRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
