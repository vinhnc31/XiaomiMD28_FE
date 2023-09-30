/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import {StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import {BaseIcon} from './BaseIcon';

interface Props {
  text?: string;
  fullText?: string | number;
  style?: StyleProp<TextStyle>;
  viewStyle?: StyleProp<ViewStyle>;
  btnStyle?: StyleProp<ViewStyle>;
  color?: string;
  fontSize?: number;
  onPress?: () => void;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | undefined;
  numberOfLines?: number;
  params?: object;
  disabled?: boolean;
  children?: React.ReactNode;
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
}

export function BaseText(props: Props) {
  const {
    style,
    text,
    color = '#000',
    fontSize = 14,
    onPress,
    textTransform,
    numberOfLines,
    viewStyle,
    btnStyle,
    params,
    children,
    disabled,
    fullText,
  } = props;

  const content = fullText === 0 ? '0' : fullText;
  if ((!text || text === '') && (!fullText || fullText === '')) {
    return null;
  }

  const textStyles = [{fontSize, color, textTransform}, style];

  // @ts-ignore
  const textContent = children || content || text || '';

  const renderText = () => (
    <Text numberOfLines={numberOfLines} style={textStyles}>
      {props.iconName && <BaseIcon name={props.iconName} color={props.iconColor} size={props.iconSize} />}
      {props.iconName && '  '}
      {textContent as any}
    </Text>
  );

  if (onPress) {
    return (
      <TouchableOpacity disabled={disabled} onPress={onPress} style={btnStyle}>
        {renderText()}
      </TouchableOpacity>
    );
  }
  if (viewStyle) {
    return <View style={viewStyle}>{renderText()}</View>;
  }
  return renderText();
}
