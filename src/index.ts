import express from "express";
import config from "config";
import mongoose from "mongoose";
import cors from "cors";

import { AuthRoutes, NoteManageRoutes, NoteRoutes } from "../routes";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/api/auth", AuthRoutes);
app.use("/api/notes", NoteRoutes);
app.use("/api/manage", NoteManageRoutes);

const PORT = config.get("port") || 5000;

const start = async () => {
  try {
    await mongoose.connect(config.get("mongoUri"));
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit();
  }
};

start();

app.listen(PORT, () =>
  console.log(`App started and listening on port ${PORT}!`)
);
