import {Colors} from '@src/styles/colors';
import {hs, ms, vs} from '@src/styles/scalingUtils';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import {BaseIcon} from '@src/containers/components/Base';

interface Props {
  title?: string;
  value?: string;
  valuePassword?: string;
  onChangeText?: (value: string) => void;
  password?: boolean;
  required?: boolean;
  isEditable?: boolean;
  multiline?: boolean;
  phoneNumber?: boolean;
  numberOfline?: number;
  showTitle?: boolean;
  leftIcon: string;
}

const InputBase = ({
  title,
  value,
  onChangeText,
  password,
  numberOfline,
  valuePassword,
  required = false,
  isEditable = true,
  multiline = false,
  phoneNumber = false,
  showTitle = false,
  leftIcon = '',
}: Props) => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  return (
    <View>
      {showTitle && (
        <Text style={styles.title}>
          {title}
          {required && <Text style={{color: Colors.red}}> *</Text>}
        </Text>
      )}
      {password ? (
        <View style={styles.innerInput}>
          <View style={styles.input}>
            {leftIcon && leftIcon.length > 0 && <BaseIcon name={leftIcon} size={24} color={Colors.black} />}
            <TextInput
              style={{color: Colors.black, fontFamily: 'Lato-Bold', fontSize: ms(15)}}
              value={valuePassword}
              onChangeText={onChangeText}
              placeholder={title}
              secureTextEntry={isSecureTextEntry}
            />
          </View>

          <TouchableOpacity onPress={() => setIsSecureTextEntry(!isSecureTextEntry)} style={styles.icon}>
            <BaseIcon name={!isSecureTextEntry ? 'eye-outline' : 'eye-off-outline'} size={24} color={Colors.black} />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {multiline ? (
            <View style={styles.innerInputMutiline}>
              <View style={styles.input}>
                {leftIcon && leftIcon.length > 0 && <BaseIcon name={leftIcon} size={24} color={Colors.black} />}
                <TextInput
                  style={{flex: 1, color: 'black', fontFamily: 'Lato-Bold', fontSize: ms(15)}}
                  value={value}
                  keyboardType={phoneNumber ? 'phone-pad' : 'default'}
                  onChangeText={onChangeText}
                  placeholder={title}
                  editable={isEditable}
                  selectTextOnFocus={isEditable}
                  multiline={multiline}
                  numberOfLines={multiline ? numberOfline : 1}
                />
              </View>
            </View>
          ) : (
            <View style={styles.innerInput}>
              <View style={styles.input}>
                {leftIcon && leftIcon.length > 0 && <BaseIcon name={leftIcon} size={24} color={Colors.black} />}
                <TextInput
                  style={{flex: 1, color: 'black', fontFamily: 'Lato-Bold', fontSize: ms(15)}}
                  value={value}
                  keyboardType={phoneNumber ? 'phone-pad' : 'default'}
                  onChangeText={onChangeText}
                  placeholder={title}
                  editable={isEditable}
                  selectTextOnFocus={isEditable}
                  multiline={multiline}
                  numberOfLines={multiline ? 12 : 1}
                />
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default InputBase;

const styles = StyleSheet.create({
  title: {
    fontSize: ms(16),
    fontFamily: 'Lato-Bold',
    color: Colors.black,
  },
  innerInput: {
    borderWidth: 1,
    height: vs(48),
    marginVertical: vs(8),
    borderRadius: 5,
    borderColor: '#C2C2C2',
    flexDirection: 'row',
    position: 'relative',
    paddingLeft: 10,
    backgroundColor: '#E8E8E8',
  },

  innerInputMutiline: {
    marginVertical: vs(4),
    borderBottomWidth: 1,
    borderColor: '#C2C2C2',
    flexDirection: 'row',
    position: 'relative',
  },

  text: {
    color: Colors.primary,
    fontSize: ms(15),

    fontFamily: 'Lato-SemiBold',
  },

  btnUpdate: {
    alignItems: 'center',
    position: 'absolute',
    right: hs(10),
    top: vs(6),
    paddingHorizontal: 3,
    paddingVertical: 2,
  },

  icon: {
    position: 'absolute',
    right: hs(10),
    top: vs(10),
    paddingHorizontal: 3,
    paddingVertical: 2,
  },
  input: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    columnGap: ms(10),
  },
});
