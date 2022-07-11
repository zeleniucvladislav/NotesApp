import { Router, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import config from "config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { sendEmail } from "../utils";

import User from "../models/User";

export const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization || "";

    if (!token) {
      return res.status(401).json({ message: "No authorization" });
    }

    jwt.verify(token, config.get("jwtSecret"));

    return res.status(201).json({
      isAuthentificated: true,
    });
  } catch (err) {
    return res.status(401).json({
      isAuthentificated: false,
    });
  }
});

router.post(
  "/register",
  [
    check("email", "Incorrect email address")
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
    check("password", "Password should contain at least 6 characters").isLength(
      { min: 6 }
    ),
    check("username", "Username must be provided")
      .notEmpty()
      .isLength({ max: 50 }),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect registration data",
        });
      }

      const { email, username, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "Email address already used" });
      }

      const hashPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, username, password: hashPassword });

      await user.save();

      //email confirmation
      const appURL = config.get("appURL");

      const confirmationURL = `Please confirm your email by accessing this URL : ${appURL}/verify/${user.id}`;
      await sendEmail(user.email, "Email Confirmation", confirmationURL);

      return res
        .status(201)
        .json({ message: "An email was sent to validate your account" });
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong." });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Incorrect email address")
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
    check("password", "Enter password please").notEmpty(),
  ],

  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect log in data",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Username not found" });
      }

      const isPassMatch = await bcrypt.compare(password, user.password);

      if (!isPassMatch) {
        return res.status(400).json({ message: "Password is incorrect" });
      }

      if (!user.verified) {
        return res
          .status(400)
          .json({ message: "Please confirm your email address to proceed" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "90d",
      });

      return res.status(201).json({
        message: "Logged in successfully",
        token,
        username: user.username,
      });
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong." });
    }
  }
);

router.get("/verify/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ message: "Username not found" });
    }

    if (user.verified) {
      return res.status(400).json({ message: "User is already verified" });
    }

    await user.update({ verified: true });

    const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
      expiresIn: "90d",
    });

    return res.status(201).json({
      message: "Logged in successfully",
      token,
      username: user.username,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Sorry ! Looks like this URL doesn't exist " });
  }
});
