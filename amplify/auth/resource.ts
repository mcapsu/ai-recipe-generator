import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Welcome to the AI-Powered Recipe Generaytore!",
      verificationEmailBody: (createCode) =>
        `Use this code to confirm your STUPID account: ${createCode()}`,
    },
  },
});

