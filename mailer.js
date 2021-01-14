const nodemailer = require("nodemailer");

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const myOAuth2Client = new OAuth2(
  process.env.API_CLIENT_ID,
  process.env.API_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

myOAuth2Client.setCredentials({
  refresh_token: process.env.API_REFRESH_TOKEN,
});

const myAccessToken = myOAuth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: process.env.EMAIL_PWORD,
    type: "OAuth2",
    user: "", //your gmail account you used to set the project up in google cloud console"
    clientId: process.env.API_CLIENT_ID,
    clientSecret: process.env.API_CLIENT_SECRET,
    refreshToken: process.env.API_REFRESH_TOKEN,
    accessToken: myAccessToken, //access token variable we defined earlier
  },
});

const send = ({ email, name, text, phone, companyName }) => {
  const from = name && email ? `${name} <${email}>` : `${name || email}`;
  const message = {
    from,
    to: "",
    subject: `New message from ${from}`,
    text: `
    name: ${name}
    email: ${email}
    phone: ${phone}
    company: ${companyName}
    body: ${text}
    `,
    replyTo: from,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) =>
      error ? reject(error) : resolve(info)
    );
  });
};

module.exports = send;
