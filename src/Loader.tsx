import { useEffect, useRef } from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';
import type { ViewStyle, StyleProp } from 'react-native';

export interface LoaderProps {
  theme?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A custom Google Pay style loading spinner.
 * Features a smooth rotating arc.
 */
export const Loader = ({ theme, color, style }: LoaderProps) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => animation.stop();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Default color logic based on theme if no explicit color provided
  // theme === 1 is usually Dark (GooglePayButtonConstants.Themes.Dark)
  const finalColor = color || (theme === 1 ? 'white' : 'black');

  return (
    <Animated.View
      style={[
        styles.loader,
        {
          borderColor: finalColor,
          transform: [{ rotate: spin }],
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderTopColor: 'transparent',
  },
});
