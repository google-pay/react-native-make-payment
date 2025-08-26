package com.makepayment

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule
import com.google.android.gms.wallet.button.ButtonConstants

@ReactModule(name = GooglePayButtonConstantsModule.NAME)
class GooglePayButtonConstantsModule(reactContext: ReactApplicationContext) :
  NativeGooglePayButtonConstantsModuleSpec(reactContext) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  override fun loadConstants(): WritableMap? {
    val themes = Arguments.createMap()
    themes.putInt("Dark", ButtonConstants.ButtonTheme.DARK)
    themes.putInt("Light", ButtonConstants.ButtonTheme.LIGHT)

    val types = Arguments.createMap()
    types.putInt("Book", ButtonConstants.ButtonType.BOOK)
    types.putInt("Buy", ButtonConstants.ButtonType.BUY)
    types.putInt("Checkout", ButtonConstants.ButtonType.CHECKOUT)
    types.putInt("Donate", ButtonConstants.ButtonType.DONATE)
    types.putInt("Order", ButtonConstants.ButtonType.ORDER)
    types.putInt("Pay", ButtonConstants.ButtonType.PAY)
    types.putInt("Plain", ButtonConstants.ButtonType.PLAIN)
    types.putInt("Subscribe", ButtonConstants.ButtonType.SUBSCRIBE)

    val constants = Arguments.createMap()
    constants.putMap("Themes", themes)
    constants.putMap("Types", types)
    return constants
  }

  companion object {
    const val NAME = "GooglePayButtonConstantsModule"
  }
}
