import {BaseButton, BaseText} from '@src/containers/components/Base';
import BaseHeaderNoCart from '@src/containers/components/Base/BaseHeaderNoCart';
import {useAuth} from '@src/hooks/useAuth';
import {goBack, navigateToPage} from '@src/navigations/services';
import {hs, vs, ms} from '@src/styles/scalingUtils';
import React, {useState} from 'react';
import {SafeAreaView, TextInput, View} from 'react-native';
import useToast from '@src/hooks/useToast';
import AccountService from '@src/services/account';
import {APP_NAVIGATION} from '@src/navigations/routes';

const ChangePass = () => {
  const {user} = useAuth();

  const toast = useToast();
  const [state, setState] = useState({
    pass: user?.password || '',
    newPassword: '',
    reNewPassword: '',
    loading: false,
  });

  const onPress = async () => {
    try {
      const sv = new AccountService();
      setState(prev => ({...prev, loading: true}));
      const res = await sv.changePass(user?.id!, {
        password: state.pass,
        newPassword: state.newPassword,
        reNewPassword: state.reNewPassword,
      });
      if (res) {
        setState(prev => ({...prev, loading: false}));
        toast.showSuccess({messageText: 'Đổi mật khẩu thành công'});
        navigateToPage(APP_NAVIGATION.ROOT);
      }
    } catch (error) {
      setState(prev => ({...prev, loading: false}));
      toast.showThowError(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <BaseHeaderNoCart title="Đổi mật khẩu" onBackPress={() => goBack()} />

      <View style={{marginHorizontal: hs(30), marginVertical: vs(30)}}>
        <BaseText text="Mật khẩu cũ" fontSize={ms(20)} />

        <TextInput
          value={state.pass}
          style={{
            backgroundColor: 'white',
            borderRadius: ms(20),
            marginVertical: vs(20),
            color: 'black',
            paddingHorizontal: hs(10),
          }}
          onChangeText={text => setState(prev => ({...prev, pass: text}))}
        />

        <BaseText text="Mật khẩu mới" fontSize={ms(20)} />

        <TextInput
          value={state.newPassword}
          style={{
            backgroundColor: 'white',
            borderRadius: ms(20),
            marginVertical: vs(20),
            color: 'black',
            paddingHorizontal: hs(10),
          }}
          onChangeText={text => setState(prev => ({...prev, newPassword: text}))}
        />

        <BaseText text="Nhập lại mật khẩu mới" fontSize={ms(20)} />

        <TextInput
          value={state.reNewPassword}
          style={{
            backgroundColor: 'white',
            borderRadius: ms(20),
            marginVertical: vs(20),
            color: 'black',
            paddingHorizontal: hs(10),
          }}
          onChangeText={text => setState(prev => ({...prev, reNewPassword: text}))}
        />

        <BaseButton text="Xác nhận" onPress={onPress} loading={state.loading} />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(ChangePass);
