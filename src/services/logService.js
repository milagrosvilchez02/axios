import Raven from "raven-js";

function init() {
  Raven.config(
    "https://739a955b3c79439ba93618c8ef14cfb9@o1052283.ingest.sentry.io/6035916",
    {
      release: "1-0-0",
      environment: "development-test",
    }
  ).install();
}

function log(error) {
  Raven.captureException(error);
}

export default {
  init,
  log,
};
