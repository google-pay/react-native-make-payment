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
        addView(initializeGooglePayButton())
        viewTreeObserver.addOnGlobalLayoutListener { requestLayout() }
    }

    private fun initializeGooglePayButton(): PayButton {
        val googlePayButton = PayButton(context)
        val options = ButtonOptions.newBuilder()
            .setAllowedPaymentMethods(allowedPaymentMethods.toString())
            .setButtonType(type)
            .setButtonTheme(theme)
            .setCornerRadius(cornerRadius)
        googlePayButton.initialize(options.build())
        return googlePayButton
    }

    override fun requestLayout() {
        super.requestLayout()
        post(mLayoutRunnable)
    }

    private val mLayoutRunnable = Runnable {
        measure(
            MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY)
        )
        layout(left, top, right, bottom)
    }
}