import nodemailer from "nodemailer";
import config from "config";

type emailType = {
  host: string;
  service: string;
  user: string;
  pass: string;
};

const sendEmail = async (email: string, subject: string, text: string) => {
  const emailParams: emailType = config.get("email");

  try {
    const transporter = nodemailer.createTransport({
      host: emailParams.host,
      service: emailParams.service,
      port: 587,
      secure: true,
      auth: {
        user: emailParams.user,
        pass: emailParams.pass,
      },
    });

    await transporter.sendMail({
      from: emailParams.user,
      to: email,
      subject: subject,
      text: text,
    });
  } catch (err) {
    console.warn(err);
  }
};

export default sendEmail;
