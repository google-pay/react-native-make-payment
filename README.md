# react-native-make-payment

[![npm version](https://badge.fury.io/js/@google%2Freact-native-make-payment.svg)](https://badge.fury.io/js/@google%2Freact-native-make-payment)

Adds native payments using the [W3C Payment Request API](https://web.dev/how-payment-request-api-works/) 
to your React Native app. Currently supports Google Pay on Android, with
support planned for other platforms in the future.

## Installation

```sh
npm install @google/react-native-make-payment
```

You can also try out the example by running the following command from the
`example` directory:

```sh
npx react-native run-android
```

## Configuration

To enable Google Pay in your app, you need to add the following Google Pay API
meta-data element to the `<application>` element of your project's
`AndroidManifest.xml` file (typically
`android/app/src/main/AndroidManifest.xml`):

```xml
<meta-data
  android:name="com.google.android.gms.wallet.api.enabled"
  android:value="true" />
```

For production, you will also need to define the `GOOGLE_PAY_ENVIRONMENT`
property in your project's `gradle.properties` file (typically
`android/gradle.properties`):

```
GOOGLE_PAY_ENVIRONMENT=PRODUCTION
```

## Usage

Following is a minimal example. A complete example can be found in
`example/src/App.tsx`.

```tsx
import {
  GooglePayButton,
  GooglePayButtonConstants,
  PaymentDetails,
  PaymentRequest,
} from "@google/react-native-make-payment";

const paymentDetails: PaymentDetails = {
  total: {
    amount: {
      currency: 'USD',
      value: '14.95',
    },
  },
};

const googlePayRequest: google.payments.api.PaymentDataRequest = {
  // Google Pay API JSON request object, see:
  // https://developers.google.com/pay/api/android/reference/request-objects
};

const paymentMethods: PaymentMethod[] = [
  {
    supportedMethods: 'google_pay',
    data: googlePayRequest,
  },
];

const paymentRequest = new PaymentRequest(paymentMethods, paymentDetails);

async function checkCanMakePayment() {
  try {
    const canMakePayment = await paymentRequest.canMakePayment();
    if (canMakePayment) {
      // Handle PSP response
    } else {
      // Google Pay unavailable
    }
  } catch (error) {
    // Handle errors
  }
}

return (
  <GooglePayButton
    style={styles.googlepaybutton}
    onPress={checkCanMakePayment}
    allowedPaymentMethods={googlePayRequest.allowedPaymentMethods}
    theme={GooglePayButtonConstants.Themes.Dark}
    type={GooglePayButtonConstants.Types.Buy}
    radius={4}
  />
);
```
