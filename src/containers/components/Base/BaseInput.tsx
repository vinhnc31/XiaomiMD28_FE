import {Colors} from '@src/styles/colors';
import {hs, ms, vs} from '@src/styles/scalingUtils';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
}: Props) => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
  return (
    <View>
      {title && (
        <Text style={styles.title}>
          {title}
          {required && <Text style={{color: 'red'}}> *</Text>}
        </Text>
      )}
      {password ? (
        <View style={styles.innerInput}>
          <TextInput
            style={{flex: 1, color: 'black', fontFamily: 'Lato-Bold', fontSize: ms(15)}}
            value={valuePassword}
            onChangeText={onChangeText}
            placeholder={title}
            secureTextEntry={isSecureTextEntry}
          />

          <TouchableOpacity onPress={() => setIsSecureTextEntry(!isSecureTextEntry)} style={styles.icon}>
            <Ionicons name={!isSecureTextEntry ? 'eye-outline' : 'eye-off-outline'} size={24} color={'black'} />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {multiline ? (
            <View style={styles.innerInputMutiline}>
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
          ) : (
            <View style={styles.innerInput}>
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
          )}
        </>
      )}
    </View>
  );
};

export default React.memo(InputBase);

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
});
