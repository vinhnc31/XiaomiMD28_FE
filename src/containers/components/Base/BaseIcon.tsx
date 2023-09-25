import {ms} from '@src/styles/scalingUtils';
import React from 'react';
import {IconProps} from 'react-native-vector-icons/Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props extends IconProps {
  onPress?: (event?: any) => void | Promise<void>;
}

export function BaseIcon(props: Props) {
  return <Ionicons {...props} size={ms(props.size || 20)} />;
}
