import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  loadConstants(): { string: { string: number } };
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'GooglePayButtonConstantsModule'
);
