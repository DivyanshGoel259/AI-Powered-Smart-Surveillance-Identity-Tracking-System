import { Router } from "express";
import * as controller from "./controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
const projectRouter = Router();

projectRouter.use(authMiddleware);

projectRouter.post("/", controller.createProject);
projectRouter.get("/", controller.getProjects);
projectRouter.get("/:id", controller.getProject);
// projectRouter.get("/:id",controller.getProject)

export default projectRouter;
