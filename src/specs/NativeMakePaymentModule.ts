import type { TurboModule } from 'react-native';
import { TurboModuleRegistry, NativeModules } from 'react-native';

export type GooglePayPaymentData = {
  apiVersion: number;
  apiVersionMinor: number;
  allowedPaymentMethods: GooglePayPaymentMethod[];
  transactionInfo: GooglePayTransactionInfo;
  merchantInfo: GooglePayMerchantInfo;
};

export type GooglePayPaymentMethod = {
  type: string;
  parameters: {
    allowedAuthMethods: string[];
    allowedCardNetworks: string[];
    billingAddressRequired?: boolean;
  };
  tokenizationSpecification: {
    type: string;
    parameters: {
      gateway: string;
      gatewayMerchantId: string;
    };
  };
};

export type GooglePayTransactionInfo = {
  totalPriceStatus: string;
  totalPrice: string;
  currencyCode: string;
  countryCode: string;
};

export type GooglePayMerchantInfo = {
  merchantId: string;
  merchantName: string;
  softwareInfo: GooglePaySoftwareInfo;
};

export type GooglePaySoftwareInfo = {
  id: string;
  version: string;
};

export interface Spec extends TurboModule {
  isReadyToPay(data: GooglePayPaymentData): Promise<boolean>;
  loadPaymentData(data: GooglePayPaymentData): Promise<GooglePayPaymentData>;
};

export default (
  TurboModuleRegistry.get<Spec>('MakePaymentModule') ||
  (NativeModules.MakePaymentModule as Spec)
);
