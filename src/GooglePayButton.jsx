/*
 * Copyright 2024 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from 'react'
import {NativeModules, requireNativeComponent, TouchableOpacity, StyleSheet} from 'react-native'

const NativeGooglePayButton = requireNativeComponent('GooglePayButton')

const GooglePayButtonConstants = NativeModules.GooglePayButtonConstants.getConstants();

const GooglePayButton = ({
    onPress,
    disabled,
    allowedPaymentMethods,
    theme,
    type, 
    radius,
    style    
  }) => {
    return (
      <TouchableOpacity
        onPress={onPress}      
        disabled={disabled}
        activeOpacity={disabled ? 0.3 : 1}
        style={[disabled ? styles.disabled : styles.notDisabled, style]}              
      >
        <NativeGooglePayButton
            allowedPaymentMethods={allowedPaymentMethods}
            type={type}
            theme={theme}
            radius={radius}
            style={styles.nativeButtonStyle}
        >
        </NativeGooglePayButton>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
    disabled: {
        flex: 0,
        opacity: 0.4,
    },
    notDisabled: {
        flex: 0,
    },
    nativeButtonStyle: { flex: 1 },
});

module.exports = { GooglePayButton, GooglePayButtonConstants };