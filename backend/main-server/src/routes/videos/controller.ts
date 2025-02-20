import { AuthResponse } from "../../types";
import { Request, Response } from "express";
import * as service from "./service";

export const uploadVideo = async (
  req: Request,
  res: Response<AuthResponse>
): Promise<void> => {
  try {
    const data = await service.uploadVideo(req.body);
    res.json({ data });
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "An Error Occured while uploading video";
    res.status(400).json({ error: { message: errorMessage } });
  }
};

export const getPresignedUrl = async (
  req: Request,
  res: Response<AuthResponse>
): Promise<void> => {
  try {
    const data = await service.getPresignedUrl(req.body);
    res.json({ data });
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "An Error Occured while creating presigned url";
    res.status(400).json({ error: { message: errorMessage } });
  }
};
