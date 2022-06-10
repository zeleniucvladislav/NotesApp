import { Router, Request, Response } from "express";
import Note from "../models/Note";
import { authMiddleware } from "../middleware/auth.middleware";

export interface IUserNoteRequest extends Request {
  user: { userId: string };
}

export const router = Router();

router.get("/", authMiddleware, async (req: IUserNoteRequest, res: any) => {
  try {
    const links = await Note.find({
      creator: req.user.userId,
    })
      .populate("creator", "username")
      .sort({ created_at: -1 });

    return res.status(201).json({ message: "Notes fetched", links });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something went wrong." });
  }
});

router.delete(
  "/delete",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { noteId } = req.body;

      await Note.deleteOne({ _id: noteId });

      return res.status(201).json({ message: "Note deleted" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Something went wrong." });
    }
  }
);

router.put("/edit", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { noteId, note } = req.body;
    await Note.findOneAndUpdate({ _id: noteId }, note);

    return res.status(201).json({ message: "Note edited" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something went wrong." });
  }
});
