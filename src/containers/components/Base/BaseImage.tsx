/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import {
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';

interface Props {
  image?: ImageSourcePropType;
  width?: number | string;
  height?: number | string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  color?: string;
  activeOpacity?: number;
  disable?: boolean;
  noFastImage?: boolean;
  resizeMode?: ImageResizeMode;
  borderRadius?: number | undefined;
  systemImage?: string;
}

const imageSize = 24;

export function BaseImage(props: Props) {
  const {
    onPress,
    style,
    imageStyle,
    color,
    activeOpacity,
    noFastImage,
    resizeMode = 'contain',
    borderRadius,
    systemImage,
  } = props;
  let {width, height, image} = props;

  if (!width) {
    width = imageSize;
  }

  if (!height) {
    height = width;
  }

  let disabled = false;

  if (props.disable) {
    disabled = props.disable;
  }

  if (systemImage) {
    image = {uri: `${Config.IMAGE_URL || ''} + ${systemImage}`};
  }

  if (onPress !== undefined) {
    return (
      <TouchableOpacity onPress={onPress} style={style} activeOpacity={activeOpacity || 0.8} disabled={disabled}>
        {noFastImage ? (
          <Image
            resizeMode={resizeMode}
            // @ts-ignore
            source={image}
            style={[{width, height, tintColor: color, borderRadius}, imageStyle || {}]}
          />
        ) : (
          <FastImage
            // @ts-ignore
            resizeMode={resizeMode}
            // @ts-ignore
            source={image}
            // @ts-ignore
            style={[{width, height, borderRadius}, imageStyle || {}]}
            tintColor={color}
          />
        )}
      </TouchableOpacity>
    );
  }
  return (
    <View style={style}>
      {noFastImage ? (
        <Image
          resizeMode={resizeMode}
          // @ts-ignore
          source={image}
          style={[{width, height, tintColor: color, borderRadius}, imageStyle || {}]}
        />
      ) : (
        <FastImage
          // @ts-ignore
          resizeMode={resizeMode}
          // @ts-ignore
          source={image}
          // @ts-ignore
          style={[{width, height, borderRadius}, imageStyle || {}]}
          tintColor={color}
        />
      )}
    </View>
  );
}
