import { Request, Response } from "express";
import * as service from "./service";
import { AuthResponse } from "../../types";

export const createTarget = async (
  req: Request,
  res: Response<AuthResponse>
): Promise<void> => {
  try {
    const data = await service.createTarget(req.body);
    res.json({ data });
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "An Error Occured while creating target";
    res.status(400).json({ error: { message: errorMessage } });
  }
};

export const deleteTarget = async (
  req: Request,
  res: Response<AuthResponse>
): Promise<void> => {
  try {
    const target_id = req.params.id;
    const data = await service.deleteTarget(target_id);
    res.json({ data });
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "An Error Occured while deleting target";
    res.status(400).json({ error: { message: errorMessage } });
  }
};
