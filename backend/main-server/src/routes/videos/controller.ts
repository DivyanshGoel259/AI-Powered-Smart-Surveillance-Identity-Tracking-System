import { AuthResponse } from "../../types";
import { Request, Response } from "express";
import * as service from "./service";

export const uploadVideo = async (
  req: Request,
  res: Response<AuthResponse>
): Promise<void> => {

  const { videoId } = req.params;
  try {
    const data = await service.uploadVideo({...req.body, videoId });
    res.json({ data });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: JSON.stringify(error) as any });
  }
};

export const getPresignedUrl = async (
  req: Request,
  res: Response<AuthResponse>
): Promise<void> => {
  try {
    const data = await service.getPresignedUrl(req.body);
    console.log(data)
    res.json({ data });
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "An Error Occured while creating presigned url";
    res.status(400).json({ error: { message: errorMessage } });
  }
};