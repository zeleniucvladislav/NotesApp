import jwt from "jsonwebtoken";
import config from "config";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.method === "OPTIONS") {
      return next();
    }

    const token = req.headers.authorization || "";

    if (!token) {
      return res.status(401).json({ message: "No authorization" });
    }

    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: "No authorization" });
  }
};
