package com.makepayment

import android.util.Log
import android.view.View
import android.widget.FrameLayout
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.PixelUtil
import com.google.android.gms.wallet.button.ButtonConstants
import com.google.android.gms.wallet.button.ButtonOptions
import com.google.android.gms.wallet.button.PayButton

class GooglePayButtonView(private val context: ThemedReactContext) : FrameLayout(context) {

    lateinit var allowedPaymentMethods: ReadableArray
    var type = ButtonConstants.ButtonType.BUY
    var theme = ButtonConstants.ButtonTheme.DARK
    var cornerRadius = 10
    private var button: PayButton? = null

    fun addButton() {
        if (button != null) {
            removeView(button)
        }
        button = initializeGooglePayButton()
        addView(button)
        viewTreeObserver.addOnGlobalLayoutListener { requestLayout() }
    }

    private fun initializeGooglePayButton(): PayButton {
        val googlePayButton = PayButton(context)

        val options = ButtonOptions.newBuilder()
            .setAllowedPaymentMethods(allowedPaymentMethods.toString())
            .setButtonType(type)
            .setButtonTheme(theme)
            .setCornerRadius(PixelUtil.toPixelFromDIP(this.cornerRadius.toDouble()).toInt())
        googlePayButton.initialize(options.build())
        googlePayButton.setOnClickListener { _ ->
            // Call the Javascript TouchableOpacity parent where the onClick handler is set
            (this.parent as? View)?.performClick() ?: run {
                Log.e("GooglePayReactNative", "Unable to find parent of GooglePayButtonView.")
            }
        };
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