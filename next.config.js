const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  var common = {
    env: {
      MONGO_URL: "mongodb://localhost:27017/",
      MONGO_DB: "chitti",
    },
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    var devConfig = {};
    return {
      ...common,
      ...devConfig,
    };
  } else {
    var prodConfig = {};
    return {
      ...common,
      ...prodConfig,
    };
  }
};
