import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useToast from '@src/hooks/useToast';
import {GuestStackParam} from '@src/navigations/GuestNavigation/stackParam';
import {APP_NAVIGATION, GUEST_NAVIGATION, MENU_NAVIGATION} from '@src/navigations/routes';
import {navigateToPage, pushToPage} from '@src/navigations/services';
import R from '@src/res';
import AccountService from '@src/services/account';
import React, {useRef, useState} from 'react';
import {ActivityIndicator, Image, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import BaseInput from '@src/containers/components/Base/BaseInput';
import {StatusBar} from 'react-native';
import {hs, ms, vs} from '@src/styles/scalingUtils';
import {BaseButton, BaseIcon, BaseImage, BaseText} from '@src/containers/components/Base';
import {useAppDispatch} from '@src/stores';
import {logInAction} from '@src/stores/auth/auth.actions';
import {images} from '@src/res/images';
import GuestNavigation from '@src/navigations/GuestNavigation';

interface Props {
  navigation: NativeStackNavigationProp<GuestStackParam>;
  route: RouteProp<GuestStackParam, GUEST_NAVIGATION.LOGIN>;
}

const LogInComponent = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const {navigation} = props;

  const goToRegister = () => {
    navigateToPage(GUEST_NAVIGATION.REGISTER);

    // navigateToPage(APP_NAVIGATION.ROOT);
  };

  const onLogin = async () => {
    console.log('bem');
    setLoading(true);

    try {
      const sv = new AccountService();
      const res = await sv.logIn({
        email,
        password,
      });
      console.log('res: ', res);
      // @ts-ignore
      await dispatch(logInAction(res.data)).unwrap();
      toast.showSuccess({messageText: 'Đăng nhập thành công'});
      setLoading(false);
    } catch (error) {
      console.log('error: ', error);
      toast.showThowError(error);
      setLoading(false);
    }
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
                <TouchableOpacity style={{marginVertical: vs(10), alignSelf: 'flex-end'}} onPress={() => navigateToPage(GUEST_NAVIGATION.FORGOTPASS)}>
                  <Text style={[styles.forgotPass, {textDecorationLine: 'underline'}]}>Quên mật khẩu?</Text>
                </TouchableOpacity>
                <BaseButton
                  onPress={onLogin}
                  style={styles.button}
                  loading={loading}
                  text={'Đăng nhập'}
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
                <TouchableOpacity
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
                </TouchableOpacity>
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
