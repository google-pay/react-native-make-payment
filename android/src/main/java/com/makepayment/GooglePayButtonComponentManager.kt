package com.makepayment

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.viewmanagers.GooglePayButtonComponentManagerInterface;
import com.facebook.react.viewmanagers.GooglePayButtonComponentManagerDelegate;

@ReactModule(name = GooglePayButtonComponentManager.REACT_CLASS)
class GooglePayButtonComponentManager(context: ReactApplicationContext) : SimpleViewManager<GooglePayButtonComponent>(), GooglePayButtonComponentManagerInterface<GooglePayButtonComponent> {
  private val delegate: GooglePayButtonComponentManagerDelegate<GooglePayButtonComponent, GooglePayButtonComponentManager> =
    GooglePayButtonComponentManagerDelegate(this)

  override fun onAfterUpdateTransaction(view: GooglePayButtonComponent) {
      super.onAfterUpdateTransaction(view)
      view.addButton()
  }

  override fun getDelegate(): ViewManagerDelegate<GooglePayButtonComponent> = delegate

  override fun getName(): String = REACT_CLASS

  override fun createViewInstance(context: ThemedReactContext): GooglePayButtonComponent = GooglePayButtonComponent(context)

  @ReactProp(name = "allowedPaymentMethods")
  override fun setAllowedPaymentMethods(view: GooglePayButtonComponent?, value: ReadableArray?) {
    view?.allowedPaymentMethods = value!!
  }

  @ReactProp(name = "buttonType")
  override fun setType(view: GooglePayButtonComponent, type: Int) {
    view.type = type
  }

  @ReactProp(name = "theme")
  override fun setTheme(view: GooglePayButtonComponent, theme: Int) {
    view.theme = theme
  }

  @ReactProp(name = "radius")
  override fun setRadius(view: GooglePayButtonComponent, radius: Int) {
    view.cornerRadius = radius
  }

  companion object {
    const val REACT_CLASS = "GooglePayButtonComponent"
  }
}
