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

// https://www.w3.org/TR/payment-request/#dom-paymentcurrencyamount
export interface PaymentCurrencyAmount {
  currency: string;
  value: string;
}

// https://www.w3.org/TR/payment-request/#paymentitem-dictionary
export interface PaymentItem {
  amount: PaymentCurrencyAmount;
  pending?: boolean;
}

export interface PaymentMethod {
  data: google.payments.api.PaymentDataRequest;
  supportedMethods: string;
}

export interface PaymentDetails {
  total: PaymentItem;
}

export const GooglePayButtonConstants = {
  Themes: {
    Dark: 1,
    Light: 2,
  },
  Types: {
    Buy: 1,
    Book: 2,
    Checkout: 3,
    Donate: 4,
    Order: 5,
    Pay: 6,
    Subscribe: 7,
    Plain: 8,
  },
} as const;

export type GooglePayButtonConstantsType = typeof GooglePayButtonConstants;
export type GooglePayButtonTheme =
  (typeof GooglePayButtonConstants.Themes)[keyof typeof GooglePayButtonConstants.Themes];
export type GooglePayButtonType =
  (typeof GooglePayButtonConstants.Types)[keyof typeof GooglePayButtonConstants.Types];
