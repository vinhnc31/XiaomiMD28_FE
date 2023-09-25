import {Colors} from '@src/styles/colors';
import React from 'react';
import {ActivityIndicator, ColorValue, StyleProp, StyleSheet, ViewStyle} from 'react-native';

interface Props {
  size?: number | 'small' | 'large' | undefined;
  loading?: boolean;
  color?: ColorValue | undefined;
  style?: StyleProp<ViewStyle> | undefined;
  top?: number | string;
  noAbsolute?: boolean;
}

export function BaseLoading({size, loading, color, style, top = 15, noAbsolute}: Props) {
  if (!loading) {
    return null;
  }
  return (
    <ActivityIndicator style={[styles.loading, {top}, style]} size={size || 'small'} color={color || Colors.primary} />
  );
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    zIndex: 100,
    alignSelf: 'center',
  },
});
