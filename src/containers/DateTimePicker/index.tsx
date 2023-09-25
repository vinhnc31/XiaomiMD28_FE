import DateTimePicker, {
  AndroidNativeProps,
  DateTimePickerEvent,
  Event,
  IOSNativeProps,
} from '@react-native-community/datetimepicker';
import {Colors} from '@src/styles/colors';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Modal, Platform, StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import styles from './styles';

type Native = IOSNativeProps & AndroidNativeProps;

interface IState {
  showModalDateTime: boolean;
  currentDate: Date;
}

interface IProps extends Native {
  onChangeDate?: (selectDate: Date) => void;
  label?: string;
  /** main style */
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export const DateTimePickerComponent = (props: IProps) => {
  const [state, setState] = useState<IState>({
    showModalDateTime: false,
    currentDate: props.value,
  });

  useEffect(() => {
    setState(state => ({...state, currentDate: props.value}));
  }, [props.value]);

  const colorText: StyleProp<TextStyle> = {color: !props.value ? Colors.black : Colors.black};

  const _toggleModalDateTime = () =>
    setState(state => ({
      ...state,
      showModalDateTime: !state.showModalDateTime,
      currentDate: props.value,
    }));

  const _onChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setState(state => ({
        ...state,
        currentDate: selectedDate,
        showModalDateTime: Platform.OS === 'android' ? false : true,
      }));
      if (Platform.OS === 'android') {
        if (props.onChangeDate) props.onChangeDate(selectedDate);
      }
    }
  };

  const _chooseDate = () => {
    if (props.onChangeDate) props.onChangeDate(state.currentDate);
    _toggleModalDateTime();
  };

  return (
    <View style={styles.dateContainer}>
      <TouchableOpacity
        style={[styles.container, props.containerStyle]}
        onPress={_toggleModalDateTime}
        disabled={props.disabled}>
        <Text style={[colorText, {flex: 1}]}>{moment(state.currentDate).format('DD/MM/YYYY') || props.label}</Text>
      </TouchableOpacity>
      {Platform.OS === 'ios' ? (
        <Modal animationType="fade" transparent={true} visible={state.showModalDateTime}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeder}>
                <TouchableOpacity onPress={_toggleModalDateTime}>
                  <Text style={styles.btnCancel}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_chooseDate}>
                  <Text style={styles.btnSelect}>Lựa chọn</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker {...props} display="spinner" value={state.currentDate} onChange={_onChange} />
            </View>
          </View>
        </Modal>
      ) : null}
      {Platform.OS === 'android'
        ? state.showModalDateTime && <DateTimePicker {...props} value={state.currentDate} onChange={_onChange} />
        : null}
    </View>
  );
};
