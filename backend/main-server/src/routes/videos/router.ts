import { Router } from "express";
import * as controller from "./controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
const videoRouter = Router();
videoRouter.use(authMiddleware);

videoRouter.post("/complete/:videoId", controller.uploadVideo);
videoRouter.post("/presigned-url", controller.getPresignedUrl);

export default videoRouter;
