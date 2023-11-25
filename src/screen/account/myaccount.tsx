import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { BaseButton, BaseImage, BaseText } from "@src/containers/components/Base";
import BaseHeaderNoCart from "@src/containers/components/Base/BaseHeaderNoCart";
import { useAuth } from "@src/hooks/useAuth";
import { goBack } from "@src/navigations/services";
import R from "@src/res";
import { images } from '@src/res/images';
import { hs,vs,ms } from "@src/styles/scalingUtils";
import { convertImage, convertUploadFile } from "@src/utils/common";
import moment from "moment";
import React, { useMemo, useRef, useState } from "react";
import { ImageSourcePropType, SafeAreaView, TextInput, TouchableOpacity, View } from "react-native";
import PopupChooseMedias, {
    ChooseMediasRef,
  } from '@src/containers/components/ImagePicker';

const MyAccount = () => {
    const {user} = useAuth();

    const chooseImageRef = useRef<ChooseMediasRef>(null);

  const onPressImage = () => {
    chooseImageRef.current?.onShow();
  };
   
    const [state,setState] = useState({
        name:user?.name,
        birthday:user?.birthday,
        phone:user?.phone,
        showModalTime:false,
        image:undefined,
        loading:false
    });

    const getAvatar = (): ImageSourcePropType => {
        if (state.image) {
          const source = convertUploadFile(state.image);
          //   setIsChangeImage(true);
          return { uri: source.uri };
        }
    
        if (user?.avatar) {
          return convertImage(user.avatar);
        }
        return images.avataEmpty;
      };

      const avatarSource = useMemo(() => {
        return getAvatar();
      }, [state.image]);
    

    const _onChange = (_event :DateTimePickerEvent,selectedDate?:Date) => {
        setState(state => ({
            ...state,
            birthday:selectedDate,
            showModalTime:false
        }));
    }

    const handleImageSelected = (avatarInfo: any) => {
        setState(prev => ({...prev, image: avatarInfo }));
      };

    const onPress = async() => {

    }

    return (
      <SafeAreaView style={{flex:1}}>
        <BaseHeaderNoCart 
            title="Hồ sơ của tôi"
            onBackPress={() => goBack()}
        />
        <BaseImage onPress={onPressImage} image={avatarSource} imageStyle={{width:hs(100),height:vs(100),borderRadius:ms(50),alignSelf:'center',marginTop:vs(10)}} resizeMode="cover" />
        <PopupChooseMedias
        ref={chooseImageRef}
        onImageSelected={avatarInfo => handleImageSelected(avatarInfo)}
        isAvatar
      />
      <View style={{marginHorizontal:hs(30),marginVertical:vs(30)}}>
        <BaseText 
            text="Tên người dùng"
            fontSize={ms(20)}
        />

        <TextInput 
            value={state.name}
            style={{backgroundColor:'white',borderRadius:ms(20),marginVertical:vs(20),color:'black',paddingHorizontal:hs(10)}}
            
            onChangeText={text => setState(prev => ({...prev,name:text}))}
        />
  
        <BaseText 
            text="Ngày sinh"
            fontSize={ms(20)}

        />
        <TouchableOpacity onPress={() => setState(prev => ({...prev,showModalTime:true}))}>
           
            <TextInput 
                value={state.birthday ? moment(state.birthday).format("DD/MM/YYYY") : ''}
                editable={false}

                style={{backgroundColor:'white',borderRadius:ms(20),marginVertical:vs(20),color:'black',paddingHorizontal:hs(10)}}
            />
        </TouchableOpacity>
        <BaseText 
            text="Số điện thoại"
            fontSize={ms(20)}
        />
        <TextInput 
            value={state.name}
            onChangeText={text => setState(prev => ({...prev,phone:text}))}
            style={{backgroundColor:'white',borderRadius:ms(20),marginVertical:vs(20),color:'black',paddingHorizontal:hs(10)}}
            
        />
        <BaseButton 
      text='Xác nhận'
      onPress={onPress}
      />
      </View>
      {state.showModalTime && 
      
      <DateTimePicker  value={state.birthday?new Date(state.birthday) : new Date()} onChange={_onChange} />
      }
      
      </SafeAreaView>
    );
  };
  

  export default React.memo(MyAccount);