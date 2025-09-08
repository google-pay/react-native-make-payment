import type { TurboModule } from 'react-native';
import { TurboModuleRegistry, NativeModules } from 'react-native';

/**
* This object provides information about what validation has been performed on the returned payment credentials so that appropriate instrument risk checks can be applied.
* https://developers.google.com/pay/api/web/reference/response-objects#assurance-details-specifications
*/
export type GooglePayAssuranceDetailsSpecifications = {
  /**
  * If `true`, indicates that `Cardholder` possession validation has been performed on returned payment credential.
  */
  accountVerified: boolean
  /**
  * - If `true`, indicates that identification and verifications (ID&V) was performed on the returned payment credential.
  * - If `false`, the same risk-based authentication can be performed as you would for card transactions.
  *   This risk-based authentication can include, but not limited to, step-up with 3D Secure protocol if applicable.
  */
  cardHolderAuthenticated: boolean
}

/**
 * This object provides information about a requested postal address.
 * https://developers.google.com/pay/api/web/reference/response-objects#Address
 */
export type GooglePayAddress = {
  /** The full name of the addressee. */
  name: string;
  /** The postal or ZIP code. */
  postalCode: string;
  /** ISO 3166-1 alpha-2 country code. */
  countryCode: string;
  /**
  * A telephone number, if phoneNumberRequired is set to true in the PaymentDataRequest.
  */
  phoneNumber: string;
  /** The first line of the address. */
  address1: string;
  /** The second line of the address. */
  address2: string;
  /** The third line of the address. */
  address3: string;
  /** City, town, neighborhood, or suburb. */
  locality: string;
  /** A country subdivision, such as a state or province. */
  administrativeArea: string;
  /** The sorting code. */
  sortingCode: string;
}

/**
* This object provides information about the selected payment card.
* https://developers.google.com/pay/api/web/reference/response-objects#CardInfo
*/
export type GooglePayCardInfo = {
  /**
  * The details about the card.
  * This value is commonly the last four digits of the selected payment account number.
  */
  cardDetails: string
  /**
  * This object provides information about the validation performed on the returned payment data if `assuranceDetailsRequired` is set to true in the {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}.
  */
  assuranceDetails: GooglePayAssuranceDetailsSpecifications
  /**
  * The payment card network of the selected payment. Returned values match the format of `allowedCardNetworks` in {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}.
  *
  * This card network value should not be displayed to the buyer. It's used when the details of a buyer's card are needed.
  * For example, if customer support needs this value to identify the card a buyer used for their transaction.
  * For a user-visible description, use the description property of {@link GooglePayPaymentMethodData} instead.
  */
  cardNetwork: string;
  /**
  *	The billing address associated with the provided payment method, if billingAddressRequired is set to true in {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}.
  */
  billingAddress?: GooglePayAddress;
}

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
  * For `CARD`, see {@link GooglePayCardInfo}.
  */
  info: GooglePayCardInfo | object;
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
