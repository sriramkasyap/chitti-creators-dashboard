const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  env: {
    MONGO_DB: "chitti",
    AUTH_COOKIE_NAME: "epsilon",
    CLOUD_NAME: "chitti",
    CLOUD_UPLOAD_PRESET: "chitti_dp",
  },
};

const SentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
