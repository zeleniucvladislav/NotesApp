import { Router, Request, Response } from "express";
import Note from "../models/Note";
import { authMiddleware, paginationMiddleware } from "../middleware";

interface IUserNoteRequest extends Request {
  user: { userId: string };
}

export const router = Router();

router.get(
  "/",
  authMiddleware,
  paginationMiddleware,
  async (req: IUserNoteRequest, res: any) => {
    try {
      const { limit, skip } = req.pagination;

      const totalNotes = await Note.countDocuments({
        creator: req.user.userId,
      });
      const totalPages = Math.ceil(totalNotes / limit);

      const notes = await Note.find({
        creator: req.user.userId,
      })
        .populate("creator", "username")
        .sort({ created_at: -1 })
        .limit(limit)
        .skip(skip);

      // return res.status(201).json({ message: "Notes fetched", links });

      return res.status(201).json({
        notes,
        totalPages,
      });
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong." });
    }
  }
);

router.delete(
  "/delete",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { noteId } = req.body;

      await Note.deleteOne({ _id: noteId });

      return res.status(201).json({ message: "Note deleted" });
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong." });
    }
  }
);

router.put("/edit", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { noteId, note } = req.body;
    await Note.findOneAndUpdate({ _id: noteId }, note);

    return res.status(201).json({ message: "Note edited" });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong." });
  }
});
