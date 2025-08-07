import { Platform } from 'react-native';
import MakePayment from './specs/NativeMakePaymentModule';
import type { GooglePayPaymentData } from './specs/NativeMakePaymentModule';
import { NAME, VERSION, GOOGLE_PAY_PMI } from './';

export type W3CGooglePayPaymentMethod = {
  supportedMethods: string;
  data: GooglePayPaymentData;
};

export class PaymentRequest {
  private paymentMethods: { [pmi: string]: GooglePayPaymentData } = {};

  constructor(methodData: W3CGooglePayPaymentMethod[], _details: any, _options?: any) {
    methodData.forEach((method) => {
      this.paymentMethods[method.supportedMethods] = method.data;
    });
    this.paymentMethods[GOOGLE_PAY_PMI]!.merchantInfo.softwareInfo = {
      id: NAME,
      version: VERSION
    };
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
