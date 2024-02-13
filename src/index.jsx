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

import React from 'react';
import { NativeModules, Platform, requireNativeComponent } from 'react-native';

const MakePayment = NativeModules.MakePayment;

const GOOGLE_PAY_PMI = 'google_pay';

class PaymentRequest {
  #name = '@google/react-native-make-payment';
  #version = '0.0.1';

  constructor(paymentMethods, paymentDetails) {
    this.paymentMethods = Object.fromEntries(
      paymentMethods.map((pm) => [pm.supportedMethods, pm.data])
    );
    this.paymentDetails = paymentDetails;

    try {
      const pkg = require('../package.json');
      this.#name = pkg.name;
      this.#version = pkg.version;
    } catch (_) {}

    if (this.paymentMethods[GOOGLE_PAY_PMI] && !this.paymentMethods[GOOGLE_PAY_PMI].merchantInfo.softwareInfo) {
      this.paymentMethods[GOOGLE_PAY_PMI].merchantInfo.softwareInfo = {
        id: this.#name.split('/').pop(),
        version: this.#version,
      };
    }
  }

  canMakePayment() {
    return Platform.select({
      android: () =>
        MakePayment.isReadyToPay(this.paymentMethods[GOOGLE_PAY_PMI]),
      default: () => this.unsupported(),
    })();
  }

  show() {
    return Platform.select({
      android: () =>
        MakePayment.loadPaymentData(this.paymentMethods[GOOGLE_PAY_PMI]),
      default: () => this.unsupported(),
    })();
  }

  unsupported() {
    return new Promise((resolve, reject) => {
      reject('Platform not supported');
    });
  }
}

const GooglePayButtonConstants = NativeModules.GooglePayButtonConstants.getConstants();

const GooglePayButton = requireNativeComponent('GooglePayButton');

module.exports = { PaymentRequest, GooglePayButton, GooglePayButtonConstants };
