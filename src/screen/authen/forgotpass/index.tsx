import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useToast from '@src/hooks/useToast';
import {GuestStackParam} from '@src/navigations/GuestNavigation/stackParam';
import {GUEST_NAVIGATION} from '@src/navigations/routes';
import {navigateToPage, resetStack} from '@src/navigations/services';
import R from '@src/res';
import AccountService from '@src/services/account';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Image, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './style';
import BaseInput from '@src/containers/components/Base/BaseInput';
import {StatusBar} from 'react-native';
import {hs, ms, vs} from '@src/styles/scalingUtils';
import {BaseButton, BaseIcon, BaseText} from '@src/containers/components/Base';
import {
  GoogleSignin,
  GoogleSigninButton,
  NativeModuleError,
  statusCodes,
} from '@react-native-google-signin/google-signin';
interface Props {
  navigation: NativeStackNavigationProp<GuestStackParam>;
  route: RouteProp<GuestStackParam, GUEST_NAVIGATION.FORGOTPASS>;
}
import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

const ForgotScreen = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const goToLogin = () => {
    navigateToPage(GUEST_NAVIGATION.LOGIN);
  };

  const [fcmToken, setFcmToken] = useState<string>();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1023021056607-8ipdiimvi5c8rl7v8qbk4dhdimb2g80n.apps.googleusercontent.com',
    });
    onSubcribeNotify();
  }, []);

  const onSubcribeNotify = async () => {
    const token = await messaging().getToken();
    console.log('fcmToken: ', token);
    if (!token) return;
    setFcmToken(token);
  };

  const onRegister = async () => {
    setLoading(true);
    const emailRegex = '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$';

    if (!email.trim().match(emailRegex)) {
      setLoading(false);
      toast.showError({message: 'Email không đúng định dạng'});
      return;
    }

    try {
      const sv = new AccountService();

      setLoading(true);
      // @ts-ignore
      await sv.fogotpass({email, newPassword: password});
      toast.showSuccess({messageText: 'Cập nhật mật khẩu thành công'});
      setLoading(false);
      resetStack(GUEST_NAVIGATION.LOGIN);
    } catch (error) {
      console.log('error: ', error);
      toast.showThowError(error);
      setLoading(false);
    }
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      const sv = new AccountService();
      setLoading(true);
      const res = await sv.loginGoogle(userInfo.idToken!, fcmToken);

      // @ts-ignore
      await dispatch(logInAction(res.data)).unwrap();
      toast.showSuccess({messageText: 'Đăng nhập thành công'});
      setLoading(false);
    } catch (error) {
      console.log('error: ', error);
      toast.showThowError(error);
      setLoading(false);
      const typedError = error as NativeModuleError;
      console.log('typedError: ', typedError.message);

      switch (typedError.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // sign in was cancelled

          break;
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress

          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // android only

          break;

        default:
          break;
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={{flex: 1}}>
        <FastImage style={styles.container} source={R.images.bgRegister}>
          <View style={styles.wrap}>
            <View style={styles.header}>
              <Image style={styles.logoImg} source={R.images.logoApp} />
            </View>

            <View style={styles.body}>
              <View style={styles.bodyInner}>
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

                <BaseButton
                  onPress={onRegister}
                  style={styles.button}
                  loading={loading}
                  text={'Xác nhận'}
                  textStyle={styles.buttonText}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: 12,
                    justifyContent: 'center',
                    marginVertical: 16,
                  }}>
                  <View style={{borderWidth: 0.5, borderColor: '#9A9A9A', flex: 1, height: 1}}></View>
                  <BaseText text="OR" />
                  <View style={{borderWidth: 0.5, borderColor: '#9A9A9A', flex: 1, height: 0.5}}></View>
                </View>
                {/* <TouchableOpacity
                  style={{
                    backgroundColor: '#007FFF',
                    flexDirection: 'row',
                    paddingVertical: vs(12),
                    paddingHorizontal: hs(10),
                    columnGap: hs(10),
                    borderRadius: ms(8),
                    justifyContent: 'center',
                  }}>
                  <BaseIcon name="logo-google" color={'white'} />
                  <BaseText text="Đăng nhập với Google" color={'white'} />
                </TouchableOpacity> */}

                <GoogleSigninButton
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={_signIn}
                  disabled={loading}
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

export default React.memo(ForgotScreen);
