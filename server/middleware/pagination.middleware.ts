import { Request, Response, NextFunction } from "express";

export const paginationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page: any = req.query.page || 1;
    const limit = 15;
    const skip = (parseInt(page) - 1) * limit;

    req.pagination = { limit, skip };

    next();
  } catch (err) {
    res.status(400).json({ message: "An error occured" });
  }
};
