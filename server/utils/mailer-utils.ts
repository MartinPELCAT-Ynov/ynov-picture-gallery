import { createTransport } from "nodemailer";

export const mailTransport = createTransport({
  host: "localhost",
  port: 25,
  secure: false,
});

export const FROM_EMAIl = "noreply@ynov-gallery.com";
export const BASE64_SEPARATOR = "!?!";
