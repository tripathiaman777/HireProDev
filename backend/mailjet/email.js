import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mj } from "./mailjet.config.js";

export const sendVerificationEmail = async (email, name, verificationToken) => {

  try {
    const mailSend = mj
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: "tripathiaman777@gmail.com",
              Name: "SignUp Verification From Aman Tripathi",
            },
            To: [
              {
                Email: email,
                Name: name,
              },
            ],
            Subject: "OTP for Signup",
            HTMLPart: VERIFICATION_EMAIL_TEMPLATE.replace(
              "{verificationCode}",
              verificationToken
            ),
            CustomCampaign: "SendAPI_campaign",
            DeduplicateCampaign: true,
          },
        ],
      })
      .then((result) => {
        console.log(result.body);
      })
      .catch((err) => {
        console.log(err.statusCode);
      });
  } catch (error) {
    console.log("Error sending Verification", error);
    throw new Error("Error sending Verification", error);
  }
};

export const sendWelcomeEmail = async (email, name) => {

  try {
    const mailSend = mj
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: "tripathiaman777@gmail.com",
              Name: "Welcome to our App From Aman Tripathi",
            },
            To: [
              {
                Email: email,
                Name: name,
              },
            ],
            Subject: "Welcome to Our App",
            HTMLPart: WELCOME_EMAIL_TEMPLATE.replace(
              "{clientName}",
              name
            ),
            CustomCampaign: "SendAPI_campaign",
            DeduplicateCampaign: true,
          },
        ],
      })
      .then((result) => {
        console.log("Welcome mail Sent successfully");
        console.log(result.body);
      })
      .catch((err) => {
        console.log(err.statusCode);
      });
  } catch (error) {
    console.log("Error sending Welcome Email", error);
    throw new Error("Error sending Welcome Email", error);
  }
}

export const sendPasswordResetEmail = async (email, name, resetURL) => {
  
  try {
    const mailSend = mj
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: "tripathiaman777@gmail.com",
              Name: "Your password reset link",
            },
            To: [
              {
                Email: email,
                Name: name,
              },
            ],
            Subject: "Your Reset Password Link",
            HTMLPart: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
              "{resetURL}",
              resetURL
            ),
            CustomCampaign: "SendAPI_campaign",
            DeduplicateCampaign: true,
          },
        ],
      })
      .then((result) => {
        console.log("Password Reset mail Sent successfully");
        console.log(result.body);
      })
      .catch((err) => {
        console.log(err.statusCode);
      });
  } catch (error) {
    console.log("Error sending Password Reset Email", error);
    throw new Error("Error sending Password Reset Email", error);
  }
}

export const sendResetSuccessEmail = async (email, name) => {
  try {
    const mailSend = mj
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: "tripathiaman777@gmail.com",
              Name: "Your password reset successfull",
            },
            To: [
              {
                Email: email,
                Name: name,
              },
            ],
            Subject: "Your Reset Password Link",
            HTMLPart: PASSWORD_RESET_SUCCESS_TEMPLATE,
            CustomCampaign: "SendAPI_campaign",
            DeduplicateCampaign: true,
          },
        ],
      })
      .then((result) => {
        console.log("Password Reset Successs mail Sent successfully");
        console.log(result.body);
      })
      .catch((err) => {
        console.log(err.statusCode);
      });
  } catch (error) {
    console.log("Error sending Password Reset Success Email", error);
    throw new Error("Error sending Password Reset Success Email", error);
  }
}