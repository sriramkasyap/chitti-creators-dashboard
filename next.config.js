const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  return {
    env: {
      MONGO_DB: "chitti",
      EMAIL_FROM:
        "postmaster@sandbox8ee7fc6f080d4e859582b4a26f11d746.mailgun.org",
      EMAIL_SERVER_USER:
        "postmaster@sandbox8ee7fc6f080d4e859582b4a26f11d746.mailgun.org",
      EMAIL_SERVER_PASSWORD:
        "4649dd664c76fb77ea7db371e07715ad-1f1bd6a9-55ee1c8b",
      EMAIL_SERVER_HOST: "smtp.mailgun.org",
      EMAIL_SERVER_PORT: 465,
    },
  };
};
