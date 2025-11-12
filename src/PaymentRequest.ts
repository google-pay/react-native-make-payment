import { Platform } from 'react-native';
import MakePayment from './specs/NativeMakePaymentModule';
import type { GooglePayPaymentData, GooglePayPaymentDataRequest } from './specs/NativeMakePaymentModule';
import { NAME, VERSION, GOOGLE_PAY_PMI } from './constants';

export type W3CGooglePayPaymentMethod = {
  supportedMethods: string;
  data: GooglePayPaymentDataRequest;
};

export class PaymentRequest {
  private paymentMethods: { [pmi: string]: GooglePayPaymentDataRequest } = {};

  constructor(methodData: W3CGooglePayPaymentMethod[], _details: any, _options?: any) {
    methodData.forEach((method) => {
      this.paymentMethods[method.supportedMethods] = method.data;
    });
    // Ensure softwareInfo is always set for Google Pay requests
    const gp = this.paymentMethods[GOOGLE_PAY_PMI]!;
    gp.merchantInfo = gp.merchantInfo || {};
    gp.merchantInfo.softwareInfo = { id: NAME, version: VERSION };
  }

  canMakePayment(): Promise<boolean> {
    return Platform.select({
      android: () =>
        MakePayment!.isReadyToPay(this.paymentMethods[GOOGLE_PAY_PMI]!),
      default: () => this.unsupported(),
    })();
  }

  show(): Promise<GooglePayPaymentData> {
    return Platform.select({
      android: () =>
        MakePayment!.loadPaymentData(this.paymentMethods[GOOGLE_PAY_PMI]!),
      default: () => this.unsupported(),
    })();
  }

  unsupported(): Promise<never> {
    return Promise.reject(new Error('Platform not supported'));
  }
}
