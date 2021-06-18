const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  return {
    env: {
      MONGO_DB: "chitti",
      MONGO_URL:
        phase === PHASE_DEVELOPMENT_SERVER
          ? "mongodb+srv://staging_user:OPOR6NAMa4OkKcgm@devcluster.pjhyg.mongodb.net/chitti?retryWrites=true&w=majority"
          : "mongodb+srv://staging_user:OPOR6NAMa4OkKcgm@devcluster.pjhyg.mongodb.net/chitti?retryWrites=true&w=majority",
    },
  };
};
