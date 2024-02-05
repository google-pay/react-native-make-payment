package com.makepaymentexample;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.google.android.gms.wallet.button.ButtonConstants;
import com.google.android.gms.wallet.button.ButtonOptions;
import com.google.android.gms.wallet.button.PayButton;

public class GooglePayButtonManager extends SimpleViewManager<PayButton> {

    public static final String REACT_CLASS = "GooglePayButton";
    ReactApplicationContext mCallerContext;

    public GooglePayButtonManager(ReactApplicationContext reactContext) {
        mCallerContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    private int theme = ButtonConstants.ButtonTheme.DARK;
    private int type = ButtonConstants.ButtonType.BUY;
    private int cornerRadius = 20;

    @Override
    protected PayButton createViewInstance(@NonNull ThemedReactContext themedReactContext) {
        String allowedPaymentMethods = "[\n" +
                "              {\n" +
                "                \"type\": \"CARD\",\n" +
                "                \"parameters\": {\n" +
                "                  \"allowedAuthMethods\": [\"PAN_ONLY\", \"CRYPTOGRAM_3DS\"],\n" +
                "                  \"allowedCardNetworks\": [\"AMEX\", \"DISCOVER\", \"JCB\", \"MASTERCARD\", \"VISA\"]\n" +
                "                },\n" +
                "                \"tokenizationSpecification\": {\n" +
                "                  \"type\": \"PAYMENT_GATEWAY\",\n" +
                "                  \"parameters\": {\n" +
                "                    \"gateway\": \"example\",\n" +
                "                    \"gatewayMerchantId\": \"exampleGatewayMerchantId\"\n" +
                "                  }\n" +
                "                }\n" +
                "              }\n" +
                "            ]";

        PayButton button = new PayButton(themedReactContext);
        button.initialize(ButtonOptions.newBuilder()
                .setButtonTheme(theme)
                .setButtonType(type)
                .setCornerRadius(cornerRadius)
                .setAllowedPaymentMethods(allowedPaymentMethods)
                .build());
        return button;
    }
}
