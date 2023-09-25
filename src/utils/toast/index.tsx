import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Toast, {BaseToastProps} from 'react-native-toast-message';
import {ToastType} from './types';
import {BaseImage} from '@src/containers/components/Base';

export {Toast};

const ToasComponent = (props: BaseToastProps & {type: ToastType}) => {
  const {icon, bgColor, textColor} = useMemo(() => {
    let bgColor = '#E4FFEA';
    let icon = require('./images/icSuccess.png');
    let textColor = '#020306';

    if (props.type === ToastType.Error) {
      bgColor = '#D92728';
      textColor = '#fff';
      icon = require('./images/icError.png');
    }

    if (props.type === ToastType.Warning) {
      bgColor = '#ffc107';
      textColor = '#fff';
      icon = require('./images/icError.png');
    }

    return {
      icon,
      bgColor,
      textColor,
    };
  }, [props.type]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
        },
      ]}>
      <BaseImage image={icon} width={27} />
      <View style={styles.messageView}>
        <Text style={[styles.titleStyle, {color: textColor}]}>{props.text1}</Text>
        {typeof props.text2 === 'string' && (
          <Text style={[styles.messageStyle, {color: textColor}]}>{props.text2}</Text>
        )}
        {typeof props.text2 === 'object' &&
          // @ts-ignore
          props.text2.map((text: string, index: number) => {
            return (
              <View key={index} style={styles.msgItem}>
                <View style={[styles.dot, {backgroundColor: textColor}]} />
                <Text style={[styles.messageStyle, {color: textColor, flex: 1, marginTop: 0, paddingTop: 0}]}>
                  {text}
                </Text>
              </View>
            );
          })}
      </View>
    </View>
  );
};

export const toastConfig = {
  /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
  success: (props: any) => <ToasComponent {...props} />,
  /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
  error: (props: any) => {
    return <ToasComponent {...props} />;
  },
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: 46,
    alignSelf: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    zIndex: 100,
    flexDirection: 'row',
    width: '95%',
  },
  messageView: {
    flex: 1,
    marginLeft: 10,
  },
  messageStyle: {fontSize: 14, textAlign: 'left', color: '#fff', marginTop: 5},
  titleStyle: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: '500',
    color: '#fff',
  },
  msgItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 5,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginRight: 5,
    marginTop: 5,
  },
});
