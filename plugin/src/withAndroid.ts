import { type ConfigPlugin, withGradleProperties } from '@expo/config-plugins';

import type { MakePaymentPluginProps } from './index';

const GOOGLE_PAY_ENVIRONMENT_KEY = 'GOOGLE_PAY_ENVIRONMENT';

const withGooglePayEnvironment: ConfigPlugin<MakePaymentPluginProps> = (
  config,
  { environment } = {}
) =>
  withGradleProperties(config, (modConfig) => {
    modConfig.modResults = modConfig.modResults.filter(
      (item) =>
        !(item.type === 'property' && item.key === GOOGLE_PAY_ENVIRONMENT_KEY)
    );

    if (environment !== undefined) {
      modConfig.modResults.push({
        type: 'property',
        key: GOOGLE_PAY_ENVIRONMENT_KEY,
        value: environment,
      });
    }

    return modConfig;
  });

export const withAndroidConfiguration: ConfigPlugin<MakePaymentPluginProps> = (
  config,
  props = {}
) => {
  config = withGooglePayEnvironment(config, props);
  return config;
};
