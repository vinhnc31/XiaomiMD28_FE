import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {BaseButton, BaseImage, BaseText} from '@src/containers/components/Base';
import BaseHeaderNoCart from '@src/containers/components/Base/BaseHeaderNoCart';
import {useAuth} from '@src/hooks/useAuth';
import {goBack} from '@src/navigations/services';
import R from '@src/res';
import {images} from '@src/res/images';
import {hs, vs, ms} from '@src/styles/scalingUtils';
import {convertImage, convertUploadFile} from '@src/utils/common';
import moment from 'moment';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ImageSourcePropType,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PopupChooseMedias, {ChooseMediasRef} from '@src/containers/components/ImagePicker';
import AccountService from '@src/services/account';
import useToast from '@src/hooks/useToast';
import {useIsFocused} from '@react-navigation/native';

const MyAccount = () => {
  const {user, fetchProfile} = useAuth();
  const isForcused = useIsFocused();
  const chooseImageRef = useRef<ChooseMediasRef>(null);

  const toast = useToast();

  const onPressImage = () => {
    chooseImageRef.current?.onShow();
  };

  useEffect(() => {
    fetchProfile();
  }, [isForcused]);

  const [state, setState] = useState({
    name: user?.name || '',
    birthday: user?.dayOfBirth || '',
    phone: user?.phone || '',
    showModalTime: false,
    image: undefined,
    loading: false,
  });

  const getAvatar = (): ImageSourcePropType => {
    if (state.image) {
      const source = convertUploadFile(state.image);
      //   setIsChangeImage(true);
      return {uri: source.uri};
    }

    if (user?.avatar) {
      return {uri: user?.avatar};
    }
    return images.avataEmpty;
  };

  const avatarSource = useMemo(() => {
    return getAvatar();
  }, [state.image]);

  const _onChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    setState(prev => ({
      ...prev,
      birthday: selectedDate,
      showModalTime: false,
    }));
  };

  const handleImageSelected = (avatarInfo: any) => {
    setState(prev => ({...prev, image: avatarInfo}));
  };

  const onPress = async () => {
    setState(prev => ({...prev, loading: true}));

    if (state.name.trim().length === 0) {
      setState(prev => ({...prev, loading: false}));
      toast.showError({message: 'Tên không được để trống'});
      return;
    }

    const nameReg =
      '^(^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạ ảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹs]+$){1,30}$';

    if (!state.name.trim().match(nameReg)) {
      setState(prev => ({...prev, loading: false}));
      toast.showError({message: 'Tên không bao gồm ký tự đặc biệt'});
      return;
    }

    const PHONE_REGEX = '^\\d{9,10}$';

    if (state.phone.trim().length > 0 && !state.phone.match(PHONE_REGEX)) {
      setState(prev => ({...prev, loading: false}));
      toast.showError({message: 'Số điện thoại không hợp lệ'});
      return;
    }

    try {
      const sv = new AccountService();
      const formData = new FormData();
      formData.append('name', state.name);

      state.birthday && formData.append('dayOfBirth', moment(state.birthday).format('DD/MM/YYYY'));

      !!state.image && formData.append('avatar', convertUploadFile(state.image));

      !!state.phone && formData.append('phone', state.phone);

      await sv.updateProfile(user?.id!, formData);
      fetchProfile();
      toast.showSuccess({messageText: 'Cập nhật tài khoản thành công'});
    } catch (error) {
      toast.showThowError(error);
    }
    setState(prev => ({...prev, loading: false}));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <BaseHeaderNoCart title="Hồ sơ của tôi" onBackPress={() => goBack()} />
      <ScrollView>
        <BaseImage
          onPress={onPressImage}
          image={avatarSource}
          imageStyle={{width: hs(100), height: vs(100), borderRadius: ms(50), alignSelf: 'center', marginTop: vs(10)}}
          resizeMode="cover"
        />
        <PopupChooseMedias
          ref={chooseImageRef}
          onImageSelected={avatarInfo => handleImageSelected(avatarInfo)}
          isAvatar
        />
        <KeyboardAvoidingView behavior="position" style={{marginHorizontal: hs(30), marginVertical: vs(30)}}>
          <BaseText text="Tên người dùng" fontSize={ms(20)} />

          <TextInput
            value={state.name}
            style={{
              backgroundColor: 'white',
              borderRadius: ms(20),
              marginVertical: vs(20),
              color: 'black',
              paddingHorizontal: hs(10),
            }}
            onChangeText={text => setState(prev => ({...prev, name: text}))}
          />

          <BaseText text="Ngày sinh" fontSize={ms(20)} />
          <TouchableOpacity onPress={() => setState(prev => ({...prev, showModalTime: true}))}>
            <TextInput
              value={state.birthday ? moment(state.birthday).format('DD/MM/YYYY') : ''}
              editable={false}
              style={{
                backgroundColor: 'white',
                borderRadius: ms(20),
                marginVertical: vs(20),
                color: 'black',
                paddingHorizontal: hs(10),
              }}
            />
          </TouchableOpacity>
          <BaseText text="Số điện thoại" fontSize={ms(20)} />
          <TextInput
            value={state.phone}
            onChangeText={text => setState(prev => ({...prev, phone: text}))}
            style={{
              backgroundColor: 'white',
              borderRadius: ms(20),
              marginVertical: vs(20),
              color: 'black',
              paddingHorizontal: hs(10),
            }}
          />
          <BaseButton text="Xác nhận" onPress={onPress} loading={state.loading} />
        </KeyboardAvoidingView>
      </ScrollView>
      {state.showModalTime && (
        <DateTimePicker value={state.birthday ? new Date(state.birthday) : new Date()} onChange={_onChange} />
      )}
    </SafeAreaView>
  );
};

export default React.memo(MyAccount);
