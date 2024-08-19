const LaunchDarkly = require('@launchdarkly/node-server-sdk');

const sdkKey = process.env.LAUNCHDARKLY_SDK_KEY ?? 'your-sdk-key';
const featureFlagKey = 'disable_api_health_check';

if (!sdkKey) {
  console.error('*** Please set the SDK key in the environment variables.');
  process.exit(1);
}

const ldClient = LaunchDarkly.init(sdkKey);
const context = {
  kind: 'user',
  key: 'example-user-key',
  name: 'Sandy',
};

let currentFlagStatus;

const initializeLaunchDarkly = async (req, res, next) => {
  try {
    await ldClient.waitForInitialization();
    console.log('*** SDK successfully initialized!');

    const updateFlagStatus = async () => {
      try {
        currentFlagStatus = await ldClient.variation(featureFlagKey, context, false);
        console.log(`Current status of '${featureFlagKey}' is ${currentFlagStatus}`);
      } catch (error) {
        console.error(`Error fetching flag value: ${error}`);
      }
    };

    ldClient.on(`update:${featureFlagKey}`, updateFlagStatus);
    await updateFlagStatus();

    if (process.env.CI) {
      process.exit(0);
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(`*** SDK failed to initialize: ${error}`);
    process.exit(1);
  }
};

const getCurrentFlagStatus = () => currentFlagStatus;

module.exports = {
  initializeLaunchDarkly,
  getCurrentFlagStatus,
};
