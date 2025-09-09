package com.makepayment

import android.app.Activity
import android.content.Intent
import android.util.Log
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule
import com.google.android.gms.wallet.AutoResolveHelper
import com.google.android.gms.wallet.IsReadyToPayRequest
import com.google.android.gms.wallet.PaymentData
import com.google.android.gms.wallet.PaymentDataRequest
import com.google.android.gms.wallet.PaymentsClient
import com.google.android.gms.wallet.Wallet
import com.google.android.gms.wallet.WalletConstants
import org.json.JSONException

@ReactModule(name = MakePaymentModule.NAME)
class MakePaymentModule(reactContext: ReactApplicationContext) :
  NativeMakePaymentModuleSpec(reactContext) {

  private val paymentsClient = createPaymentsClient(reactContext)

  // Keep a nullable promise reference to avoid lateinit crashes if
  // onActivityResult is delivered without an active request.
  private var loadPaymentDataPromise: Promise? = null

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
          val promiseRef = loadPaymentDataPromise
          if (promiseRef == null) {
            Log.w(NAME, "Received activity result but no pending promise")
            return
          }
          when (resultCode) {
            // Received response from Google Pay API - resolve the current promise.
            Activity.RESULT_OK -> {
              try {
                intent?.let { i ->
                  val paymentData = Convert.jsonStringToMap(
                    PaymentData.getFromIntent(i)!!.toJson()
                  )
                  promiseRef.resolve(paymentData)
                }
              } catch (e: JSONException) {
                promiseRef.reject(e)
              }
              loadPaymentDataPromise = null
            }
            // User cancelled payment sheet, resolve the current promise with null response.
            Activity.RESULT_CANCELED -> {
              promiseRef.resolve(null)
              loadPaymentDataPromise = null
            }
            // Error occurred, reject the current promise.
            AutoResolveHelper.RESULT_ERROR -> {
              AutoResolveHelper.getStatusFromIntent(intent)?.let { status ->
                promiseRef.reject(
                  "loadPaymentData error",
                  status.statusCode.toString()
                )
              } ?: run {
                promiseRef.reject("loadPaymentData error", "unknown status")
              }
              loadPaymentDataPromise = null
            }
          }
        }
      }
    })
  }

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  override fun isReadyToPay(data: ReadableMap?, promise: Promise?) {
    val json = try {
      data?.let { Convert.mapToJson(it).toString() }
    } catch (e: JSONException) {
      Log.e(NAME, "isReadyToPay JSONException", e)
      promise?.reject(e)
      return
    }

    val task = json?.let { IsReadyToPayRequest.fromJson(it) }
      ?.let { paymentsClient.isReadyToPay(it) }
    task?.addOnCompleteListener { completedTask ->
      if (completedTask.isSuccessful) {
        promise?.resolve(completedTask.result)
      } else {
        promise?.reject(E_UNABLE_TO_DETERMINE_GOOGLE_PAY_READINESS, completedTask.exception)
      }
    }
  }

  @ReactMethod
  override fun loadPaymentData(data: ReadableMap?, promise: Promise?) {
    val json = try {
      data?.let { Convert.mapToJson(it).toString() }
    } catch (e: JSONException) {
      Log.e(NAME, "loadPaymentData JSONException", e)
      promise?.reject(e)
      return
    }

    val activity = currentActivity
    if (activity == null) {
      promise?.reject("E_ACTIVITY_DOES_NOT_EXIST", "Activity doesn't exist")
      return
    }
    if (loadPaymentDataPromise != null) {
      promise?.reject("E_ALREADY_IN_PROGRESS", "A loadPaymentData request is already in progress")
      return
    }
    if (promise == null) {
      Log.w(NAME, "loadPaymentData called without a promise")
      return
    }
    loadPaymentDataPromise = promise
    AutoResolveHelper.resolveTask(
      paymentsClient.loadPaymentData(PaymentDataRequest.fromJson(json.toString())),
      activity, LOAD_PAYMENT_DATA_REQUEST_CODE
    )
  }

  companion object {
    const val NAME = "MakePaymentModule"
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
        Wallet.WalletOptions.Builder().setEnvironment(env).build()
      return Wallet.getPaymentsClient(context, walletOptions)
    }
  }
}
