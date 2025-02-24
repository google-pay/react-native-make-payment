package com.makepayment

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.google.android.gms.wallet.button.ButtonConstants
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap

class GooglePayButtonConstantsModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getConstants(): MutableMap<String, Any> {
        val themes = mutableMapOf<String, Int>()
        themes["Dark"] = ButtonConstants.ButtonTheme.DARK
        themes["Light"] = ButtonConstants.ButtonTheme.LIGHT

        val types = mutableMapOf<String, Int>()
        types["Book"] = ButtonConstants.ButtonType.BOOK
        types["Buy"] = ButtonConstants.ButtonType.BUY
        types["Checkout"] = ButtonConstants.ButtonType.CHECKOUT
        types["Donate"] = ButtonConstants.ButtonType.DONATE
        types["Order"] = ButtonConstants.ButtonType.ORDER
        types["Pay"] = ButtonConstants.ButtonType.PAY
        types["Plain"] = ButtonConstants.ButtonType.PLAIN
        types["Subscribe"] = ButtonConstants.ButtonType.SUBSCRIBE

        return mutableMapOf(
            "Themes" to themes,
            "Types" to types
        )
    }

    override fun getName() = NAME

    companion object {
        private const val NAME = "GooglePayButtonConstants"
    }

}
