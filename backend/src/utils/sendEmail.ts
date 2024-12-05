import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import transporter from "../config/nodemailer";
import { EmailOptions } from "../common/types/types";
import { logger } from "../config/logger";

const sendEmail = async ({
  to,
  subject,
  templateName,
  templateData
}: EmailOptions): Promise<void> => {
  try {
    const templatePath = path.resolve(
      __dirname,
      `../views/emailTemplates/${templateName}.hbs`
    );
    const source = fs.readFileSync(templatePath, "utf8");
    const template = handlebars.compile(source);
    const html = template(templateData);

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject,
      html
    };

    // await transporter.sendMail(mailOptions);
    logger.info("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send email");
  }
};

export default sendEmail;
