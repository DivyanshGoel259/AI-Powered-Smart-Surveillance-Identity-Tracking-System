import { Router } from "express";
import * as controller from './controller'
import { authMiddleware } from "../../middlewares/authMiddleware";
const videoRouter = Router()
videoRouter.use(authMiddleware)

videoRouter.post("/", controller.uploadVideo)

export default videoRouter