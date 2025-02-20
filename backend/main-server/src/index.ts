import express, { Request, Response } from "express";
import cors from "cors";
import userRouter from "./routes/user/router";
import projectRouter from "./routes/project/router";
import videoRouter from "./routes/videos/router";
import targetRouter from "./routes/targets/router";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/video", videoRouter);
app.use("/api/v1/target",targetRouter)

app.get("/api/v1", (req: any, res: any) => {
  return res.status(200).json({ message: "Connection Established" });
});

app.listen(PORT, () => {
  console.log(`Main server is listening on ${PORT} port`);
});
