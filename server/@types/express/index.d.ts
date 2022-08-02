import { Express } from "express";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      headers?: { authorization: string };
      user?: string | JwtPayload;
      pagination: { limit: number; skip: number };
    }
  }
}
