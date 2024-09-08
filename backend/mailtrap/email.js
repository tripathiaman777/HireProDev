import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, name, verificationToken) => {
  // const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: [{ email: "tripathiaman777@gmail.com" }], //on no domain, we can send mail on only logged in user
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.log("Error sending Verification", error);
    throw new Error("Error sending Verification", error);
  }
};
