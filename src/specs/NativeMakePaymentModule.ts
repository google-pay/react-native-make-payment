import type { TurboModule } from 'react-native';
import { TurboModuleRegistry, NativeModules } from 'react-native';

/**
* This object provides tokenization data for the payment method.
* https://developers.google.com/pay/api/web/reference/response-objects#PaymentMethodTokenizationData
*/
export type GooglePayPaymentMethodTokenizationData = {
  /**
  * The type of tokenization to be applied to the selected payment method.
  * This value matches the `type` set in {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentMethodTokenizationSpecification|PaymentMethodTokenizationSpecification}`.
  */
  type: string;
  /**
  * The generated payment method token.
  * - {@link https://developers.google.com/pay/api/web/reference/request-objects#gateway|PAYMENT_GATEWAY}: JSON object string that contains a chargeable token issued by your gateway.
  * - {@link https://developers.google.com/pay/api/web/reference/request-objects#direct|DIRECT}: protocolVersion, signature, and a signedMessage for decryption.
  *   See {@link https://developers.google.com/pay/api/web/guides/resources/payment-data-cryptography#payment-method-token-structure|Payment method token structure} for more information.
  */
  token?: string;
}

/**
* This object provides data for a selected payment method.
* https://developers.google.com/pay/api/web/reference/response-objects#PaymentMethodData
*/
export type GooglePayPaymentMethodData = {
  /**
  * {@link GooglePayPaymentMethod} `type` selected in the Google Pay payment sheet.
  */
  type: string;
  /**
  * User-facing message to describe the payment method that funds this transaction.
  */
  description: string;
  /**
  * The value of this property depends on the payment method `type` returned.
  * For `CARD`, see {@link https://developers.google.com/pay/api/web/reference/response-objects#CardInfo|CardInfo}.
  */
  info: unknown;
  /** Payment tokenization data for the selected payment method. */
  tokenizationData?: GooglePayPaymentMethodTokenizationData
}

/**
* This is a response object that's returned by Google after a payer approves payment.
* https://developers.google.com/pay/api/web/reference/response-objects#PaymentData
*/
export type GooglePayPaymentData = {
  /**
  * Major API version.
  * The value in the response matches the value provided in {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest|PaymentDataRequest}.
  */
  apiVersion: number;
  /**
  * Minor API version.
  * The value in the response matches the value provided in {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest|PaymentDataRequest}.
  */
  apiVersionMinor: number;
  /** Data about the selected payment method. */
  paymentMethodData: GooglePayPaymentMethodData;
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
