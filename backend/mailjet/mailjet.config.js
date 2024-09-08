import mailjet from "node-mailjet";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const mj = new mailjet({
  apiKey: "45277041260e1a37abef53c8cf5848e4",
  apiSecret: "95e49bd1f5afb7db37b83a9015670891",
});
// const request = mj
//   .post("send", { version: "v3.1" })
//   .request({
//     Messages: [
//       {
//         From: {
//           Email: "tripathiaman777@gmail.com",
//           Name: "SignUp Verification From Aman Tripathi",
//         },
//         To: [
//           {
//             Email: "codertripathi@gmail.com",
//             Name: "passenger 1",
//           },
//         ],
//         Subject: "Your email flight plan!",
//         TextPart:
//           "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
//         HTMLPart: `<h3>Dear passenger 1, welcome to
//                    <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!`,
//         CustomCampaign: "SendAPI_campaign",
//         DeduplicateCampaign: true,
//       },
//     ],
//   })
//   .then((result) => {
//     console.log(result.body);
//   })
//   .catch((err) => {
//     console.log(err.statusCode);
//   });
