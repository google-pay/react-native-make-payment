/*
 * Copyright 2023 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState } from 'react';
import { View, Pressable, Image, Text } from 'react-native';
import { PaymentRequest } from '@google/react-native-make-payment';

const paymentDetails = {
  total: {
    amount: {
      currency: 'USD',
      value: '14.95',
    },
  },
};

const googlePayRequest = {
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

const paymentMethods = [
  {
    supportedMethods: 'google_pay',
    data: googlePayRequest,
  },
];


export default function App() {
  const [text, setText] = React.useState('');

  function handleResponse(response) {
    setText(response);
    console.log(response);
  }

  function checkCanMakePayment() {
      // paymentDetails are unique for each payment request, so we should be able to create
      // a new PaymentRequest instance each time when we are on the checkout page.
      // In this case when we attempt to make a payment again with a new instance it throws an error.
      // We also can set this.paymentRequest to null if it has an instance already but still the same error.
      // Please press GPay button two times and see result
    this.paymentRequest = new PaymentRequest(paymentMethods, {...paymentDetails});
    this.paymentRequest
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
    this.paymentRequest
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
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Pressable onPress={checkCanMakePayment}>
        <Image
          source={{
            uri: 'https://corefy.com/docs/integration/payment-methods/images/buy-buttons-black-small.png',
          }}
          style={{ width: 168, height: 48, margin: 50 }}
        />
      </Pressable>
      <Text style="{{font-family: monospace, white-space: pre}}">{text}</Text>
    </View>
  );
}
