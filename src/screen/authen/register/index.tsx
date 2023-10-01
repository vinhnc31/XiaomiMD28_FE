import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useToast from '@src/hooks/useToast';
import {GuestStackParam} from '@src/navigations/GuestNavigation/stackParam';
import {GUEST_NAVIGATION} from '@src/navigations/routes';
import {navigateToPage} from '@src/navigations/services';
import R from '@src/res';
import AccountService from '@src/services/account';
import React, {useRef, useState} from 'react';
import {ActivityIndicator, Image, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import BaseInput from '@src/containers/components/Base/BaseInput';
import {StatusBar} from 'react-native';
import {vs} from '@src/styles/scalingUtils';
import {BaseButton} from '@src/containers/components/Base';

interface Props {
  navigation: NativeStackNavigationProp<GuestStackParam>;
  route: RouteProp<GuestStackParam, GUEST_NAVIGATION.REGISTER>;
}

const RegisterScreen = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rePassword, setRePassword] = useState<string>('');

  const goToLogin = () => {
    navigateToPage(GUEST_NAVIGATION.LOGIN);
  };

  const onRegister = async () => {
    setLoading(true);

    // try {
    //   const sv = new AccountService();

    //   setLoading(false);
    // } catch (error) {
    //   console.log('error: ', error);
    //   toast.showThowError(error);
    //   setLoading(false);
    // }
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={{flex: 1}}>
        <FastImage style={styles.container} source={R.images.bgRegister}>
          <View style={styles.wrap}>
            <View style={styles.header}>
              <Image style={styles.logoImg} source={R.images.logo} />
            </View>

            <View style={styles.body}>
              <View style={styles.bodyInner}>
                <View>
                  <BaseInput
                    leftIcon={'person-circle-outline'}
                    title="Tên người dùng"
                    value={name}
                    onChangeText={setName}
                    borderRadius={40}
                  />
                </View>
                <View>
                  <BaseInput
                    leftIcon={'mail-outline'}
                    title="Email"
                    value={email}
                    onChangeText={setEmail}
                    borderRadius={40}
                  />
                </View>
                <View>
                  <BaseInput
                    leftIcon={'key-outline'}
                    title="Mật khẩu"
                    valuePassword={password}
                    onChangeText={setPassword}
                    password
                    borderRadius={40}
                  />
                </View>
                <View>
                  <BaseInput
                    leftIcon={'key-outline'}
                    title="Nhập lại mật khẩu"
                    valuePassword={rePassword}
                    onChangeText={setRePassword}
                    password
                    borderRadius={40}
                  />
                </View>

                <BaseButton
                  onPress={onRegister}
                  style={styles.button}
                  loading={loading}
                  text={'Đăng ký'}
                  textStyle={styles.buttonText}
                />
                <View style={styles.bodyFooter}>
                  <Text style={styles.notAccount}>Bạn đã có tài khoản? </Text>
                  <TouchableOpacity onPress={goToLogin}>
                    <Text style={styles.textSignUp}>Đăng nhập</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </FastImage>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(RegisterScreen);
