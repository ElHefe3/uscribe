import { Router, Request, Response } from "express";
import { getStatus } from "../services/redis.services";
import { documentRouter } from "./document.route";

export const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.send({ status: "ok", message: "Hello from Uscribe API!" });
});

router.get("/status/:id", async (req: Request, res: Response) => {
  const status = await getStatus(`doc:status:${req.params.id}`);
  res.json({ id: req.params.id, status });
});

router.use("/documents", documentRouter);
