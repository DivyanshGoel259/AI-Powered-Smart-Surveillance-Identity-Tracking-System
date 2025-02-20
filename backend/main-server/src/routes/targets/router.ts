import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import * as controller from "./controller";

const targetRouter = Router();

targetRouter.use(authMiddleware);

targetRouter.post("/", controller.createTarget);
targetRouter.delete("/:id", controller.deleteTarget);

export default targetRouter;
