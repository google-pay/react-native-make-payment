import { type ConfigPlugin } from '@expo/config-plugins';

import { withAndroidConfiguration } from './withAndroid';

export interface MakePaymentPluginProps {
  environment?: string;
}

const withMakePayment: ConfigPlugin<MakePaymentPluginProps> = (
  config,
  props = {}
) => {
  config = withAndroidConfiguration(config, props);
  return config;
};

export default withMakePayment;
