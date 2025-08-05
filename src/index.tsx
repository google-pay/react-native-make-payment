/*
 * Copyright 2024 Google LLC.
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

import { NativeModules, Platform } from 'react-native';
import type { PaymentDetails, PaymentMethod } from './types';

const MakePayment = NativeModules.MakePayment;

const GOOGLE_PAY_PMI = 'google_pay';

export class PaymentRequest {
  name = '@google/react-native-make-payment';
  version = '0.1.2';

  paymentMethods: {
    [key: string]: google.payments.api.PaymentDataRequest;
  };
  paymentDetails: PaymentDetails;

  constructor(paymentMethods: PaymentMethod[], paymentDetails: PaymentDetails) {
    this.paymentMethods = Object.fromEntries(
      paymentMethods.map((pm) => [pm.supportedMethods, pm.data])
    );
    this.paymentDetails = paymentDetails;

    try {
      const pkg = require('../package.json');
      this.name = pkg.name;
      this.version = pkg.version;
    } catch (_) {}

    if (
      this.paymentMethods[GOOGLE_PAY_PMI] &&
      !this.paymentMethods[GOOGLE_PAY_PMI].merchantInfo.softwareInfo
    ) {
      this.paymentMethods[GOOGLE_PAY_PMI].merchantInfo.softwareInfo = {
        id: this.name.split('/').pop(),
        version: this.version,
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
    return new Promise((_, reject) => {
      reject('Platform not supported');
    });
  }
}

export * from './types';
export { GooglePayButton, GooglePayButtonConstants } from './GooglePayButton';
