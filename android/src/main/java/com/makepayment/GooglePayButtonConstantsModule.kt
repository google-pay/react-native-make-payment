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
        themes["Book"] = ButtonConstants.ButtonType.BOOK
        themes["Buy"] = ButtonConstants.ButtonType.BUY
        themes["Checkout"] = ButtonConstants.ButtonType.CHECKOUT
        themes["Donate"] = ButtonConstants.ButtonType.DONATE
        themes["Order"] = ButtonConstants.ButtonType.ORDER
        themes["Pay"] = ButtonConstants.ButtonType.PAY
        themes["Plain"] = ButtonConstants.ButtonType.PLAIN
        themes["Subscribe"] = ButtonConstants.ButtonType.SUBSCRIBE

        return hashMapOf("Themes" to themes, "Types" to types)
    }

    override fun getName() = NAME

    companion object {
        private const val NAME = "GooglePayButtonConstants"
    }

}