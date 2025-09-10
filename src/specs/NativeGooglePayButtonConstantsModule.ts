import type { TurboModule } from 'react-native';
import { TurboModuleRegistry, NativeModules } from 'react-native';

export interface Constants {
  Themes: {
    Dark: number;
    Light: number;
  };
  Types: {
    Buy: number;
    Book: number;
    Checkout: number;
    Donate: number;
    Order: number;
    Pay: number;
    Subscribe: number;
    Plain: number;
  };
}

export interface Spec extends TurboModule {
  loadConstants(): Constants | null;
}

export default (
  TurboModuleRegistry.get<Spec>('GooglePayButtonConstantsModule') ||
  (NativeModules.GooglePayButtonConstantsModule as Spec)
);
