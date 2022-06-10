import { Schema, model, Types } from "mongoose";

interface IUser {
  email: string;
  username: string;
  password: string;
  notes: Types.ObjectId;
}

const schema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],
  },
  { timestamps: { createdAt: "created_at" } }
);

export default model("User", schema);
