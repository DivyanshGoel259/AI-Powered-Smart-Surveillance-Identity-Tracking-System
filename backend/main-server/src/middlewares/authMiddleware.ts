import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader && !authHeader?.startsWith("Bearer ")) {
      throw new Error("You are not Authorized");
    }
    if (!JWT_SECRET) {
      throw new Error("You are not Authorized");
    }
    const token = authHeader.split(" ")[1];
    const decoded: any = verify(token, JWT_SECRET);
    if (!decoded) {
      throw new Error("You are not Authorized");
    }
    (req as any).user_id = decoded.id;
    next();
  } catch (err: any) {
    res.status(403).json({ error: { message: err.message } });
  }
};
