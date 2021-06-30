const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  return {
    env: {
      MONGO_DB: "chitti",
      AUTH_COOKIE_NAME: "epsilon",
      CLOUD_NAME: "chitti",
      CLOUD_UPLOAD_PRESET: "chitti_dp",
    },
  };
};
