package com.makepayment

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager
import java.util.HashMap

class MakePaymentPackage : BaseReactPackage() {
  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return when (name) {
      MakePaymentModule.NAME -> MakePaymentModule(reactContext)
      GooglePayButtonConstantsModule.NAME -> GooglePayButtonConstantsModule(reactContext)
      GooglePayButtonComponentManager.REACT_CLASS -> GooglePayButtonComponentManager(reactContext)
      else -> null
    }
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    return ReactModuleInfoProvider {
      val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
      moduleInfos[MakePaymentModule.NAME] = ReactModuleInfo(
        MakePaymentModule.NAME,
        MakePaymentModule.NAME,
        false,  // canOverrideExistingModule
        false,  // needsEagerInit
        false,  // isCxxModule
        true // isTurboModule
      )
      moduleInfos[GooglePayButtonConstantsModule.NAME] = ReactModuleInfo(
        GooglePayButtonConstantsModule.NAME,
        GooglePayButtonConstantsModule.NAME,
        false,  // canOverrideExistingModule
        false,  // needsEagerInit
        false,  // isCxxModule
        true // isTurboModule
      )
      moduleInfos[GooglePayButtonComponentManager.REACT_CLASS] = ReactModuleInfo(
        GooglePayButtonComponentManager.REACT_CLASS,
        GooglePayButtonComponentManager.REACT_CLASS,
        false,  // canOverrideExistingModule
        false,  // needsEagerInit
        false,  // isCxxModule
        true // isTurboModule
      )
      moduleInfos
    }
  }

  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
    return listOf(
      MakePaymentModule(reactContext),
      GooglePayButtonComponentManager(reactContext),
    )
  }

  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    return listOf(GooglePayButtonComponentManager(reactContext))
  }
}
