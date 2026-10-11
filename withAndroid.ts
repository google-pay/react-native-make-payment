import {
  AndroidConfig,
  type ConfigPlugin,
  withAndroidManifest,
  withGradleProperties,
} from '@expo/config-plugins';

import { type MakePaymentPluginProps } from './index';

const GOOGLE_PAY_ENABLED_KEY = 'com.google.android.gms.wallet.api.enabled';
const GOOGLE_PAY_ENVIRONMENT_KEY = 'GOOGLE_PAY_ENVIRONMENT';

const withGooglePayManifest: ConfigPlugin = (config) =>
  withAndroidManifest(config, (config) => {
    const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(
      config.modResults
    );

    AndroidConfig.Manifest.addMetaDataItemToMainApplication(
      mainApplication,
      GOOGLE_PAY_ENABLED_KEY,
      'true'
    );

    return config;
  });

const withGooglePayEnvironment: ConfigPlugin<MakePaymentPluginProps> = (
  config,
  { environment } = {}
) =>
  withGradleProperties(config, (config) => {
    config.modResults = config.modResults.filter(
      (item) =>
        !(item.type === 'property' && item.key === GOOGLE_PAY_ENVIRONMENT_KEY)
    );

    if (environment !== undefined) {
      config.modResults.push({
        type: 'property',
        key: GOOGLE_PAY_ENVIRONMENT_KEY,
        value: environment,
      });
    }

    return config;
  });

export const withAndroidConfiguration: ConfigPlugin<MakePaymentPluginProps> = (
  config,
  props = {}
) => {
  config = withGooglePayManifest(config);
  config = withGooglePayEnvironment(config, props);

  return config;
};
