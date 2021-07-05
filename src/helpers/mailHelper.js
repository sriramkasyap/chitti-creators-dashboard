const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_DASHBOARD_KEY);

export const fake = "";

export const sendMail = async (to, fromName, subject, html) => {
  const msg = {
    to, // Mail recipient
    from: `${fromName} <chitti.epsilon@gmail.com>`, // Verified Sender
    subject,
    html,
  };
  return sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
