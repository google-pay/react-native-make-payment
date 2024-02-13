package com.makepayment

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class GooglePayButtonManager(
    private val callerContext: ReactApplicationContext
) : SimpleViewManager<GooglePayButtonView>() {

    override fun getName() = REACT_CLASS

    override fun createViewInstance(context: ThemedReactContext) = GooglePayButtonView(context)

    override fun onAfterUpdateTransaction(view: GooglePayButtonView) {
        super.onAfterUpdateTransaction(view)
        view.addButton()
    }

    @ReactProp(name = "allowedPaymentMethods")
    fun allowedPaymentMethods(view: GooglePayButtonView, allowedPaymentMethods: ReadableArray) {
        view.allowedPaymentMethods = allowedPaymentMethods
    }

    @ReactProp(name = "type")
    fun type(view: GooglePayButtonView, type: Int) {
        view.type = type
    }

    @ReactProp(name = "theme")
    fun theme(view: GooglePayButtonView, theme: Int) {
        view.theme = theme
    }

    @ReactProp(name = "radius")
    fun cornerRadius(view: GooglePayButtonView, radius: Int) {
        view.cornerRadius = radius
    }

    companion object {
        const val REACT_CLASS = "GooglePayButton"
    }
}
