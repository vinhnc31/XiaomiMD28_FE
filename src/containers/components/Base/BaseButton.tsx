import {Colors} from '@src/styles/colors';
import {hs, ms, vs} from '@src/styles/scalingUtils';
import * as React from 'react';
import {ActivityIndicator, StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {BaseText} from './BaseText';

interface Props {
  onPress: any;
  text?: string;
  fullText?: string;
  style?: StyleProp<ViewStyle>;
  disable?: boolean;
  disableColor?: string;
  disableTextColor?: string;
  loading?: boolean;
  backgroundColor?: string;
  width?: string | number;
  height?: number;
  textStyle?: StyleProp<TextStyle>;
  marginTop?: number;
  fontSize?: number;
  textColor?: string;
  loadingColor?: string;
  renderIcon?: React.ReactNode;
  renderLeftIcon?: React.ReactNode;
  // renderRightIcon?: React.ReactNode;
  secondary?: boolean;
}

export function BaseButton(props: Props) {
  const {disableColor = '#ddd'} = props;

  const getBackgroundColor = (): string => {
    if (props.backgroundColor) {
      return props.backgroundColor;
    }
    if (props.disable) {
      return disableColor;
    }

    return Colors.primary;
  };

  const getTextColor = (): string => {
    if (props.textColor) {
      return props.textColor;
    }
    if (props.disable) {
      return props.disableTextColor || '#999';
    }

    return '#fff';
  };

  return (
    //@ts-ignore
    <TouchableOpacity
      disabled={props.disable || props.loading}
      onPress={props.onPress}
      activeOpacity={0.9}
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          width: props.width || '100%',
          height: vs(props.height || 45),
          marginTop: vs(props.marginTop || 10),
          borderWidth: props.secondary ? 1 : undefined,
        },
        props.style,
      ]}>
      {props.renderLeftIcon && props.renderLeftIcon }
      <BaseText
        style={[styles.buttonLabelStyle, {fontSize: ms(props.fontSize || 16), color: getTextColor()}, props.textStyle]}
        text={props.text}
        fullText={props.fullText}
      />
      {props.loading && <ActivityIndicator color={props.loadingColor || '#fff'} style={styles.loading} />}
      {props.renderIcon && props.renderIcon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(5),
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: hs(15),
  },
  buttonLabelStyle: {
    fontFamily: 'Lato-Bold',
  },
  loading: {marginLeft: 10},
});
