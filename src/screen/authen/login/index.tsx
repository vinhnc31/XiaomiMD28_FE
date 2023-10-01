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
  route: RouteProp<GuestStackParam, GUEST_NAVIGATION.LOGIN>;
}

const LogInComponent = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const [text, setText] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const goToRegister = () => {
    navigateToPage(GUEST_NAVIGATION.REGISTER);
  };

  const onLogin = async () => {
    console.log('bem');
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
        <FastImage style={styles.container} source={R.images.bgLogin}>
          <View style={styles.wrap}>
            <View style={styles.header}>
              <Image style={styles.logoImg} source={R.images.logo} />
            </View>

            <View style={styles.body}>
              <View style={styles.bodyInner}>
                <View>
                  <BaseInput
                    leftIcon={'mail-outline'}
                    title="Email"
                    value={text}
                    onChangeText={setText}
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
                <TouchableOpacity style={{marginVertical: vs(10), alignSelf: 'flex-end'}}>
                  <Text style={[styles.forgotPass, {textDecorationLine: 'underline'}]}>Quên mật khẩu?</Text>
                </TouchableOpacity>
                <BaseButton
                  onPress={onLogin}
                  style={styles.button}
                  loading={loading}
                  text={'Đăng nhập'}
                  textStyle={styles.buttonText}
                />
                <View style={styles.bodyFooter}>
                  <Text style={styles.notAccount}>Bạn chưa có tài khoản? </Text>
                  <TouchableOpacity onPress={goToRegister}>
                    <Text style={styles.textSignUp}>Đăng ký</Text>
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

export default React.memo(LogInComponent);
