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
import { View, Pressable, Image, Text, StyleSheet } from 'react-native';
import { PaymentRequest } from '@google/react-native-make-payment';
import GooglePayButtonView from './GooglePayButtonView';


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



const paymentRequest = new PaymentRequest(paymentMethods, paymentDetails);

export default function App() {
  const [text, setText] = React.useState('');

  function handleResponse(response) {
    setText(response);
    console.log(response);
  }

  function checkCanMakePayment() {
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

  var styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    text: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10
    },
    googlepaybutton: {
      height: 100,
      width: 300,
    },
  });
  

  return (
    <View style={styles.container}>
      <GooglePayButtonView style={styles.googlepaybutton}></GooglePayButtonView>
      <Text style={styles.text}>{text}</Text>
    </View>   
  );
}
