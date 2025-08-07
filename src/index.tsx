export * from './PaymentRequest';
export { GooglePayButton, GooglePayButtonConstants } from './GooglePayButton';
export type * from './PaymentRequest';
export type * from './specs/NativeMakePaymentModule';

const GOOGLE_PAY_PMI = 'google_pay';

// Set during build, see babel.config.js
declare const __LIB_NAME__: string;
declare const __LIB_VERSION__: string;

let NAME:string, VERSION:string;

try {
	const pkg = require('../package.json');
	NAME = pkg.name;
	VERSION = pkg.version;
} catch {
	NAME = __LIB_NAME__;
	VERSION = __LIB_VERSION__;
}

export { GOOGLE_PAY_PMI, NAME, VERSION };