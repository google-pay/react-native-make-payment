import { StyleSheet, Pressable } from 'react-native';
import type { ViewProps, StyleProp, ViewStyle } from 'react-native';
import GooglePayButtonComponent from './specs/NativeGooglePayButtonComponent';
import GooglePayButtonConstantsModule from './specs/NativeGooglePayButtonConstantsModule';
import type { GooglePayPaymentMethod } from './specs/NativeGooglePayButtonComponent'

export interface Props extends ViewProps {
  allowedPaymentMethods: GooglePayPaymentMethod[];
  type: number;
  theme: number;
  radius: number;
  onPress: () => void;
  disabled: boolean;
  style: StyleProp<ViewStyle>;
}

const GooglePayButton = ({
  onPress,
  disabled,
  allowedPaymentMethods,
  theme,
  type,
  radius,
  style,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        disabled ? styles.disabled : styles.enabled,
        styles.overridable,
        style,
        styles.fixed,
        styles.nobg,
      ]}
    >
      <GooglePayButtonComponent
        allowedPaymentMethods={allowedPaymentMethods}
        type={type}
        theme={theme}
        radius={radius}
        style={[styles.button, styles.nobg]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  overridable: {
    width: '100%',
  },
  fixed: {
    minWidth: 250,
    height: 68,
  },
  enabled: {
    opacity: 1,
  },
  disabled: {
    opacity: 0.4,
  },
  button: {
    margin: 8,
    flex: 1,
  },
  nobg: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
});

const GooglePayButtonConstants = GooglePayButtonConstantsModule?.loadConstants();

export { GooglePayButton, GooglePayButtonConstants };
