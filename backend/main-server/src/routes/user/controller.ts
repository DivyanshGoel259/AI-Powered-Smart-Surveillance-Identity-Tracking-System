import { AuthResponse } from "../../types";
import { Request, Response } from "express";
import * as service from "./service";

// export const createUser = async (req:Request,res:Response<AuthResponse>):Promise<void>=>{
//     try {
//         const data = await service.clerkSignin(req.body)
//         res.json({data})

//     } catch (err){
//         const errorMessage =
//         err instanceof Error
//           ? err.message
//           : "An Error Occured while creating Project";
//       res.status(400).json({ error: { message: errorMessage } });
//     }
// }

export const signin = async (
  req: Request,
  res: Response<AuthResponse>
): Promise<void> => {
  try {
    const data = await service.signin(req.body);
    res.json({ data });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An Error Occured while signing in";
    res.status(400).json({ error: { message: errorMessage } });
  }
};

export const signup = async (
  req: Request,
  res: Response<AuthResponse>
): Promise<void> => {
  try {
    const data = await service.signup(req.body);
    res.json({ data });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An Error Occured while signing up";
    res.status(400).json({ error: { message: errorMessage } });
  }
};
