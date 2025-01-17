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

package com.makepayment

import android.app.Activity
import android.content.Intent
import com.facebook.react.bridge.*
import com.google.android.gms.wallet.*
import com.google.android.gms.wallet.Wallet.WalletOptions
import org.json.JSONException
import android.util.Log

/**
 * Native module bridging the Google Pay API to the React Native app.
 */
class MakePaymentModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val paymentsClient = createPaymentsClient(reactContext)

    private lateinit var loadPaymentDataPromise: Promise

    init {
        // Add the event listener which manages responses from the Google Pay API.
        reactContext.addActivityEventListener(object : BaseActivityEventListener() {
            override fun onActivityResult(
                activity: Activity,
                requestCode: Int,
                resultCode: Int,
                intent: Intent?
            ) {
                if (requestCode == LOAD_PAYMENT_DATA_REQUEST_CODE) {
                    when (resultCode) {
                        // Received response from Google Pay API - resolve the current promise.
                        Activity.RESULT_OK -> {
                            try {
                                intent?.let { i ->
                                    val paymentData = Convert.jsonStringToMap(
                                        PaymentData.getFromIntent(i)!!.toJson()
                                    )
                                    loadPaymentDataPromise.resolve(paymentData)
                                }
                            } catch (e: JSONException) {
                                loadPaymentDataPromise.reject(e)
                            }
                        }
                        // User cancelled payment sheet, resolve the current promise with null response.
                        Activity.RESULT_CANCELED -> loadPaymentDataPromise.resolve(null)
                        // Error occurred, reject the current promise.
                        AutoResolveHelper.RESULT_ERROR -> {
                            AutoResolveHelper.getStatusFromIntent(intent)?.let { status ->
                                loadPaymentDataPromise.reject(
                                    "loadPaymentData error",
                                    status.statusCode.toString()
                                )
                            }
                        }
                    }
                }
            }
        })
    }

    /**
     * Method exposed to the React Native app that checks if Google Pay is available.
     *
     * @param request containing the JSON for the Google Pay API request.
     * @param promise returned to the caller.
     */
    @ReactMethod
    fun isReadyToPay(request: ReadableMap, promise: Promise) {
        val json = try {
            Convert.mapToJson(request).toString()
        } catch (e: JSONException) {
            Log.e(NAME, "isReadyToPay JSONException", e)
            promise.reject(e)
            return
        }

        val task = paymentsClient.isReadyToPay(IsReadyToPayRequest.fromJson(json))
        task.addOnCompleteListener { completedTask ->
            if (completedTask.isSuccessful) {
                promise.resolve(completedTask.result)
            } else {
                promise.reject(E_UNABLE_TO_DETERMINE_GOOGLE_PAY_READINESS, completedTask.exception)
            }
        }
    }

    /**
     * Method exposed to the React Native app that makes a payment request to the Google Pay API.
     *
     * @param request containing the JSON for the Google Pay API request.
     * @param promise returned to the caller.
     */
    @ReactMethod
    fun loadPaymentData(request: ReadableMap, promise: Promise) {
        val json = try {
            Convert.mapToJson(request).toString()
        } catch (e: JSONException) {
            Log.e(NAME, "loadPaymentData JSONException", e)
            promise.reject(e)
            return
        }

        loadPaymentDataPromise = promise
        currentActivity?.let { activity ->
            AutoResolveHelper.resolveTask(
                paymentsClient.loadPaymentData(PaymentDataRequest.fromJson(json)),
                activity, LOAD_PAYMENT_DATA_REQUEST_CODE
            )
        }
    }

    override fun getName() = NAME

    companion object {
        private const val NAME = "MakePayment"
        private const val LOAD_PAYMENT_DATA_REQUEST_CODE = 991
        private const val E_UNABLE_TO_DETERMINE_GOOGLE_PAY_READINESS = "E_UNABLE_TO_DETERMINE_GOOGLE_PAY_READINESS"

        private fun createPaymentsClient(context: ReactApplicationContext): PaymentsClient {
            Log.d(NAME, "createPaymentsClient env=" + BuildConfig.GOOGLE_PAY_ENVIRONMENT)
            val env = if (BuildConfig.GOOGLE_PAY_ENVIRONMENT == "PRODUCTION") {
                WalletConstants.ENVIRONMENT_PRODUCTION
            } else {
                WalletConstants.ENVIRONMENT_TEST
            }
            val walletOptions =
                WalletOptions.Builder().setEnvironment(env).build()
            return Wallet.getPaymentsClient(context, walletOptions)
        }
    }
}