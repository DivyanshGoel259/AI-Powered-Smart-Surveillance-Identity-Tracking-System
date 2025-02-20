import { AuthResponse } from "../../types";
import { Request, Response } from "express";
import * as service from "./service";

export const createProject = async (
  req: Request,
  res: Response<AuthResponse>
): Promise<void> => {
  try {
    const user_id = (req as any).user_id;
    const data = await service.createProject({ ...req.body, user_id });

    res.json({ data });
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "An Error Occured while creating Project";
    res.status(400).json({ error: { message: errorMessage } });
  }
};

export const getProject = async (
  req: Request,
  res: Response<AuthResponse>
): Promise<void> => {
  try {
    const user_id = (req as any).user_id;
    const project_id = req.params.id;
    const data = await service.getProject(user_id, project_id);

    res.json({ data });
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "An Error Occured while fetching Project";
    res.status(400).json({ error: { message: errorMessage } });
  }
};

export const getProjects = async (
  req: Request,
  res: Response<AuthResponse>
): Promise<void> => {
  try {
    const user_id = (req as any).user_id;
    const data = await service.getProjects(user_id);

    res.json({ data });
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "An Error Occured while fetching Projects";
    res.status(400).json({ error: { message: errorMessage } });
  }
};
