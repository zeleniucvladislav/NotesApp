import { Router, Request, Response } from "express";
import { check, validationResult } from "express-validator";

import Note from "../models/Note";
import { authMiddleware } from "../middleware/auth.middleware";

export interface IUserNoteRequest extends Request {
  user: { userId: string };
}

export const router = Router();

router.get(
  "/personal",
  authMiddleware,
  async (req: IUserNoteRequest, res: any) => {
    try {
      const links = await Note.find({
        nonpublic: true,
        creator: req.user.userId,
      })
        .populate("creator", "username")
        .sort({ created_at: -1 });

      return res.status(201).json({ message: "Notes fetched", links });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Something went wrong." });
    }
  }
);

router.get("/all", authMiddleware, async (req: Request, res: Response) => {
  try {
    const links = await Note.find({ nonpublic: false })
      .populate("creator", "username")
      .sort({ created_at: -1 });
    return res.status(201).json({ message: "Notes fetched", links });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong." });
  }
});

router.get(
  "/:id",
  authMiddleware,
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      const link = await Note.findById(req.params.id).populate(
        "creator",
        "username"
      );
      return res.json(link);
    } catch (e) {
      return res.status(500).json({ message: "Something went wrong." });
    }
  }
);

router.post(
  "/create",
  [
    check("title", "Enter title please").notEmpty(),
    check("text", "Exceeded maximal length of text").isLength({ max: 3000 }),
  ],
  authMiddleware,
  async (req: IUserNoteRequest, res: any) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect note data",
        });
      }

      const { title, text, nonpublic } = req.body;
      const creator = req.user.userId;

      const note = new Note({
        title,
        text,
        nonpublic,
        creator,
      });

      await note.save();

      return res.status(201).json({ message: "Note was sucessfuly created" });
    } catch (e) {
      return res.status(500).json({ message: "Something went wrong." });
    }
  }
);
