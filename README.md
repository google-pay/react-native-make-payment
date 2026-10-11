# react-native-make-payment

[![npm version](https://badge.fury.io/js/@google%2Freact-native-make-payment.svg)](https://badge.fury.io/js/@google%2Freact-native-make-payment)

Adds native payments using the [W3C Payment Request API](https://web.dev/how-payment-request-api-works/) to your
React Native app. Currently supports Google Pay on Android.

## Installation

```sh
npm install @google/react-native-make-payment
```

You can also try out the example by running the following command from the root of this repo:

```sh
yarn && yarn example
```

## Configuration

### React Native CLI

Add the following inside the `<application>` element in your app's
`android/app/src/main/AndroidManifest.xml`:

```xml
<meta-data
  android:name="com.google.android.gms.wallet.api.enabled"
  android:value="true" />
```

For production, you will need to define the
`GOOGLE_PAY_ENVIRONMENT` property in your project's
`gradle.properties` file (typically `android/gradle.properties`):

```properties
GOOGLE_PAY_ENVIRONMENT=PRODUCTION
```

### Expo

Add the config plugin to your Expo app config. The `environment`
option accepts `TEST` (default) or `PRODUCTION`:

```json
{
  "expo": {
    "plugins": [
      [
        "@google/react-native-make-payment",
        {
          "environment": "PRODUCTION"
        }
      ]
    ]
  }
}
```

## Usage

Following is a minimal example. A complete example can be
found in `example/src/App.tsx`.

```ts
import { PaymentRequest, type W3CGooglePayPaymentMethod, type GooglePayPaymentDataRequest } from '@google/react-native-make-payment';

const paymentDetails = {
  total: {
    amount: {
      currency: 'USD',
      value: '14.95',
    },
  },
};

const googlePayRequest: GooglePayPaymentDataRequest = {
  // Google Pay API JSON request object, see:
  // https://developers.google.com/pay/api/android/reference/request-objects
};

const paymentMethods: W3CGooglePayPaymentMethod[] = [
  {
    supportedMethods: 'google_pay',
    data: googlePayRequest,
  },
];

const paymentRequest = new PaymentRequest(paymentMethods, paymentDetails);

paymentRequest.canMakePayment().then((canMakePayment) => {
  if (canMakePayment) {
    paymentRequest.show().then((response) => {
      // Handle PSP response
    });
  } else {
    // Google Pay unavailable
  }
});
```

### Google Pay Button
Example of adding a native Google Pay button:

```xml
<GooglePayButton
  style={styles.googlepaybutton}
  onPress={checkCanMakePayment}
  allowedPaymentMethods={googlePayRequest.allowedPaymentMethods}
  theme={GooglePayButtonConstants.Themes.Dark}
  type={GooglePayButtonConstants.Types.Buy}
  radius={4}        
/>
```
