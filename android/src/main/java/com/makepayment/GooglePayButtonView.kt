package com.makepayment

import android.widget.FrameLayout
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ThemedReactContext
import com.google.android.gms.wallet.button.ButtonConstants
import com.google.android.gms.wallet.button.ButtonOptions
import com.google.android.gms.wallet.button.PayButton

class GooglePayButtonView(private val context: ThemedReactContext) : FrameLayout(context) {
    lateinit var allowedPaymentMethods: ReadableArray
    var type = ButtonConstants.ButtonType.BUY
    var theme = ButtonConstants.ButtonTheme.LIGHT
    var cornerRadius = 10

    fun addButton() {
        val button = PayButton(context)
        val options = ButtonOptions.newBuilder()
            .setAllowedPaymentMethods(allowedPaymentMethods.toString())
            .setButtonType(type)
            .setButtonTheme(theme)
            .setCornerRadius(cornerRadius)
        button.initialize(options.build())
        addView(button)
    }
}