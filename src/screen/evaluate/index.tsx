import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {APP_NAVIGATION} from '@src/navigations/routes';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Image, ImageSourcePropType, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {AppStackParam} from '@src/navigations/AppNavigation/stackParam';
import styles from './styles';
import {goBack, navigateToPage} from '@src/navigations/services';
import BaseHeaderNoCart from '@src/containers/components/Base/BaseHeaderNoCart';
import {BaseButton} from '@src/containers/components/Base';
import {ms, vs, hs} from '@src/styles/scalingUtils';
import PopupChooseMedias, {ChooseMediasRef} from '@src/containers/components/ImagePicker';
import { convertUploadFile } from '@src/utils/common';
import { images } from '@src/res/images';
interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.EVALUATE>;
}
const EvaluateScreen = (props: Props) => {
  const [comment, setComment] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [defaultRating, setDefaultRating] = useState(5);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const chooseImageRef = useRef<ChooseMediasRef>(null);
  const onPressImage = () => {
    chooseImageRef.current?.onShow();
  };
  const handleImageSelected = (avatarInfo: any) => {
    setImage(avatarInfo);
  };
  const getAvatar = (): ImageSourcePropType => {
    if (image) {
      const source = convertUploadFile(image);
      return { uri: source.uri };
    }
    return images.cameraIconx2;
  };
  const avatarSource = useMemo(() => {
    return getAvatar();
  }, [image]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', flexDirection: 'column'}}>
      <BaseHeaderNoCart title="Đánh giá" onBackPress={goBack} />
      <View style={{flexDirection: 'column'}}>
        <View
          style={{
            margin: 10,
            borderWidth: 0.5,
            borderRadius: 10,
            padding: 8,
            flexDirection: 'row',
            elevation: 2,
            backgroundColor: 'white',
          }}>
          <View style={{height: 100, width: 100, backgroundColor: 'red'}}></View>
          <View style={{flexDirection: 'column', marginHorizontal: 10, justifyContent: 'space-around'}}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{fontSize: 18, fontFamily: 'LibreBaskerville-DpdE', width: 230, color: 'black'}}>
              Điện thoại Xiaomi 14 Pro
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 15, fontFamily: 'LibreBaskerville-DpdE'}}>Màu sắc : Xanh</Text>
              <Text style={{fontSize: 15, fontFamily: 'LibreBaskerville-DpdE'}}>x 1</Text>
            </View>
            <View style={{alignSelf: 'flex-end'}}>
              <Text>6.150.000₫</Text>
            </View>
          </View>
        </View>
        <View style={{height: 1, backgroundColor: '#D9D9D9', marginVertical: 10}}></View>
        <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', marginHorizontal: 10}}>
          <Text style={{fontSize: 18, fontFamily: 'LibreBaskerville-DpdE', color: 'black', width: 100}}>
            Chất lượng sản phẩm
          </Text>
          <View style={{flexDirection: 'row'}}>
            {maxRating.map((item, key) => {
              return (
                <TouchableOpacity activeOpacity={0.7} key={item} onPress={() => setDefaultRating(item)}>
                  <Image
                    style={styles.star}
                    source={
                      item <= defaultRating
                        ? require('../../assets/images/star2.png')
                        : require('../../assets/images/star1.png')
                    }
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={{height: 1, backgroundColor: '#D9D9D9', marginVertical: 10}}></View>
        <Text style={{fontSize: 18, fontFamily: 'LibreBaskerville-DpdE', color: 'black', margin: 10}}>
          Đánh giá về sản phẩm
        </Text>
        <View style={{paddingHorizontal: 10, borderWidth: 0.5, marginHorizontal: 10, borderRadius: 10}}>
          <TextInput
            style={{textAlignVertical: 'top'}}
            editable
            multiline
            onChangeText={value => setComment(value)}
            value={comment}
            numberOfLines={7}
            placeholder="Hãy để lại nhận xét của bạn về sản phẩm nhé !"></TextInput>
        </View>
        <View style={{margin:10}}>
          <Text style={{fontSize: 15, fontFamily: 'LibreBaskerville-DpdE',marginVertical:10,color:'black'}}>Thêm ảnh</Text>
          <TouchableOpacity
            onPress={() => onPressImage()}
            >
              <Image source={avatarSource} style={{height: 100, width: 100, backgroundColor: '#E9E9E9',}} resizeMode={'center'}/>
            </TouchableOpacity>
          <PopupChooseMedias
            ref={chooseImageRef}
            onImageSelected={avatarInfo => handleImageSelected(avatarInfo)}
            isAvatar
          />
        </View>
        <BaseButton
          onPress={() => {
            console.log('Ok');
          }}
          text="Gửi"
          width={hs(330)}
        />
      </View>
    </SafeAreaView>
  );
};
export default React.memo(EvaluateScreen);
