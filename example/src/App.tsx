import React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { 
  NAME, VERSION, GOOGLE_PAY_PMI, 
  PaymentRequest, GooglePayButton, GooglePayButtonConstants
} from '@google/react-native-make-payment';
import type { GooglePayPaymentDataRequest, W3CGooglePayPaymentMethod } from '@google/react-native-make-payment';

const paymentDetails = {
  total: {
    amount: {
      currency: 'USD',
      value: '14.95',
    },
  },
};

const googlePayRequest: GooglePayPaymentDataRequest = {
  apiVersion: 2,
  apiVersionMinor: 0,
  allowedPaymentMethods: [
    {
      type: 'CARD',
      parameters: {
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: [
          'AMEX',
          'DISCOVER',
          'INTERAC',
          'JCB',
          'MASTERCARD',
          'VISA',
        ],
      },
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        parameters: {
          gateway: 'adyen',
          gatewayMerchantId: '<PSP merchant ID>',
        },
      },
    },
  ],
  merchantInfo: {
    merchantId: '01234567890123456789',
    merchantName: 'Example Merchant',
  },
  transactionInfo: {
    totalPriceStatus: 'FINAL',
    totalPrice: paymentDetails.total.amount.value,
    currencyCode: paymentDetails.total.amount.currency,
    countryCode: 'US',
  },
};

const paymentMethods: W3CGooglePayPaymentMethod[] = [
  {
    supportedMethods: GOOGLE_PAY_PMI,
    data: googlePayRequest,
  },
];

const paymentRequest = new PaymentRequest(paymentMethods, paymentDetails);

export default function App() {
  const [text, setText] = React.useState('');
  const [disabled, toggleDisabled] = React.useState(true);
  const isTurbo = (global as any).__turboModuleProxy != null;
  const isFabric = (global as any).nativeFabricUIManager != null;
  const isNewArch = isTurbo || isFabric;
  const archLabel = isNewArch ? 'Turbo/Fabric (newarch=true)' : 'Bridge (newarch=false)';

  React.useEffect(() => {
    const label =
    setText(`${NAME}\nversion: ${VERSION}\narch: ${archLabel}`);
  }, [isNewArch]);

  function handleResponse(response) {
    console.log(response);
    setText(response);
  }

  function checkCanMakePayment() {
    toggleDisabled(!disabled);
    paymentRequest
      .canMakePayment()
      .then((canMakePayment) => {
        if (canMakePayment) {
          showPaymentForm();
        } else {
          handleResponse('Google Pay unavailable');
        }
      })
      .catch((error) => {
        handleResponse(`paymentRequest.canMakePayment() error: ${error}`);
      });
  }

  function showPaymentForm() {
    paymentRequest
      .show()
      .then((response) => {
        if (response === null) {
          handleResponse('Payment sheet cancelled');
        } else {
          handleResponse(JSON.stringify(response, null, 2));
        }
      })
      .catch((error) => {
        handleResponse(`paymentRequest.show() error: ${error}`);
      });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <GooglePayButton
        onPress={checkCanMakePayment}
        style={styles.googlePayButtonDonate}
        radius={10}
        disabled={disabled}
        allowedPaymentMethods={googlePayRequest.allowedPaymentMethods}
        theme={GooglePayButtonConstants!.Themes.Light}
        type={GooglePayButtonConstants!.Types.Donate}
      />
      <GooglePayButton
        onPress={checkCanMakePayment}
        style={styles.googlePayButtonBuy}
        radius={150}
        disabled={!disabled}
        allowedPaymentMethods={googlePayRequest.allowedPaymentMethods}
        theme={GooglePayButtonConstants!.Themes.Dark}
        type={GooglePayButtonConstants!.Types.Buy}
      />
      <Text style={styles.text}>{text}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googlePayButtonDonate: {
    width: 350,
  },
  googlePayButtonBuy: {
    width: 150,
  },
  text: {
    padding: 20,
    fontFamily: 'monospace',
    fontSize: 13,
    textAlign: 'center',
  },
});
