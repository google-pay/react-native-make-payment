import type { HostComponent, ViewProps } from 'react-native';
import type { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export type GooglePayPaymentDataRequest = {
  apiVersion: number;
  apiVersionMinor: number;
  allowedPaymentMethods: GooglePayPaymentMethod[];
  transactionInfo: GooglePayTransactionInfo;
  /** Optional; limited to merchantName for requests. */
  merchantInfo?: GooglePayMerchantInfoRequest;
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

/** Request-only merchant info shape. */
export type GooglePayMerchantInfoRequest = {
  merchantId?: string;
  merchantName?: string;
  softwareInfo?: GooglePaySoftwareInfo;
};

export type GooglePaySoftwareInfo = {
  id: string;
  version: string;
};

interface NativeProps extends ViewProps {
  allowedPaymentMethods: GooglePayPaymentMethod[];
  type: Int32;
  theme: Int32;
  radius: Int32;
}

export default codegenNativeComponent<NativeProps>(
  'GooglePayButtonComponent'
) as HostComponent<NativeProps>;
