package com.makepayment

import android.content.Context
import android.util.AttributeSet
import android.util.Log
import android.view.View
import android.widget.FrameLayout
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.PixelUtil
import com.google.android.gms.wallet.button.ButtonOptions
import com.google.android.gms.wallet.button.PayButton

class GooglePayButtonComponent : FrameLayout {
  lateinit var allowedPaymentMethods: ReadableArray
  var type = 1
  var theme = 1
  var cornerRadius = 10
  private var button: PayButton? = null

  constructor(context: Context) : super(context) {
    configureComponent()
  }

  constructor(context: Context, attrs: AttributeSet?) : super(context, attrs) {
    configureComponent()
  }

  constructor(context: Context, attrs: AttributeSet?, defStyleAttr: Int) : super(context, attrs, defStyleAttr) {
    configureComponent()
  }

  private fun configureComponent() {
    this.layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
  }

  fun addButton() {
    removeView(button)
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
