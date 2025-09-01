export * from './PaymentRequest';
export { GooglePayButton, GooglePayButtonConstants } from './GooglePayButton';
export type * from './PaymentRequest';
export type * from './specs/NativeMakePaymentModule';
export { default } from './specs/NativeMakePaymentModule';

const GOOGLE_PAY_PMI = 'google_pay';

// Set during build, see babel.config.js
declare const __LIB_NAME__: string;
declare const __LIB_VERSION__: string;

// Prefer injected constants to avoid bundling or resolving package.json at runtime.
// This remains safe if the transform didn't run (typeof on an undeclared identifier is 'undefined').
const NAME: string =
  typeof __LIB_NAME__ !== 'undefined' ? __LIB_NAME__ : '@google/react-native-make-payment';
const VERSION: string =
  typeof __LIB_VERSION__ !== 'undefined' ? __LIB_VERSION__ : '0.0.0';

export { GOOGLE_PAY_PMI, NAME, VERSION };
