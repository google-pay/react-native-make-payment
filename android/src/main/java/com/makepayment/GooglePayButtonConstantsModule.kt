package com.makepayment

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.google.android.gms.wallet.button.ButtonConstants

class GooglePayButtonConstantsModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getConstants(): HashMap<String, Any> {
        val themes = hashMapOf<String, Int>()
        themes["Dark"] = ButtonConstants.ButtonTheme.DARK
        themes["Light"] = ButtonConstants.ButtonTheme.LIGHT

        val types = hashMapOf<String, Int>()
        types["Book"] = ButtonConstants.ButtonType.BOOK
        types["Buy"] = ButtonConstants.ButtonType.BUY
        types["Checkout"] = ButtonConstants.ButtonType.CHECKOUT
        types["Donate"] = ButtonConstants.ButtonType.DONATE
        types["Order"] = ButtonConstants.ButtonType.ORDER
        types["Pay"] = ButtonConstants.ButtonType.PAY
        types["Plain"] = ButtonConstants.ButtonType.PLAIN
        types["Subscribe"] = ButtonConstants.ButtonType.SUBSCRIBE

        return hashMapOf("Themes" to themes, "Types" to types)
    }

    override fun getName() = NAME

    companion object {
        private const val NAME = "GooglePayButtonConstants"
    }

}