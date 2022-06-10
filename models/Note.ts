import { Schema, model, Types } from "mongoose";

interface INote {
  title: string;
  text: string;
  nonpublic: boolean;
  creator: Types.ObjectId;
}

const schema = new Schema<INote>(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    nonpublic: { type: Boolean, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: { createdAt: "created_at" } }
);

export default model("Note", schema);
