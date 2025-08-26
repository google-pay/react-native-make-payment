import type { TurboModule } from 'react-native';
import { TurboModuleRegistry, NativeModules } from 'react-native';

export interface Spec extends TurboModule {
  loadConstants(): { string: { string: number } };
}

export default (
  TurboModuleRegistry.get<Spec>('GooglePayButtonConstantsModule') ||
  (NativeModules.GooglePayButtonConstantsModule as Spec)
);
