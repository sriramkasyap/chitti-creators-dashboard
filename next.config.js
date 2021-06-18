const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  var common = {
    env: {
      MONGO_DB: "chitti",
    },
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    var devConfig = {
      // MONGO_URL: "mongodb://localhost:27017/",
      MONGO_URL:
        "mongodb+srv://staging_user:OPOR6NAMa4OkKcgm>@devcluster.pjhyg.mongodb.net/chitti?retryWrites=true&w=majority",
    };
    return {
      ...common,
      ...devConfig,
    };
  } else {
    var prodConfig = {
      MONGO_URL:
        "mongodb+srv://staging_user:OPOR6NAMa4OkKcgm>@devcluster.pjhyg.mongodb.net/chitti?retryWrites=true&w=majority",
    };
    return {
      ...common,
      ...prodConfig,
    };
  }
};
