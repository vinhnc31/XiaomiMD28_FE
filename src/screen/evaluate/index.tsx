import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {APP_NAVIGATION} from '@src/navigations/routes';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppStackParam} from '@src/navigations/AppNavigation/stackParam';
import styles from './styles';
import {goBack, navigateToPage} from '@src/navigations/services';
import BaseHeaderNoCart from '@src/containers/components/Base/BaseHeaderNoCart';
import {BaseButton} from '@src/containers/components/Base';
import {ms, vs, hs} from '@src/styles/scalingUtils';
import PopupChooseMedias, {ChooseMediasRef} from '@src/containers/components/ImagePicker';
import {convertUploadFile} from '@src/utils/common';
import {images} from '@src/res/images';
import EvaluateService from '@src/services/evaluate';
import {useAuth} from '@src/hooks/useAuth';
import useToast from '@src/hooks/useToast';
import OrderService from '@src/services/order';
interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.EVALUATE>;
}
const EvaluateScreen = (props: Props) => {
  const data = props.route.params?.item;
  const [result, setResult] = useState([]);
  const [comment, setComment] = useState<string>('');
  const [image, setImage] = useState(undefined);
  const [defaultRating, setDefaultRating] = useState(5);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const chooseImageRef = useRef<ChooseMediasRef>(null);
  const toast = useToast();
  const evaluateService = new EvaluateService();
  const orderService = new OrderService();
  const {user} = useAuth();
  const onPressImage = () => {
    chooseImageRef.current?.onShow();
  };
  const getData = () => {
    setResult(data.OrdersProducts);
  };
  const handleImageSelected = (avatarInfo: any) => {
    setImage(avatarInfo);
  };
  const getAvatar = (): ImageSourcePropType => {
    if (image) {
      const source = convertUploadFile(image);
      return {uri: source.uri};
    }
    return images.cameraIconx2;
  };
  const avatarSource = useMemo(() => {
    return getAvatar();
  }, [image]);
  const sendEvaluate = () => {
    const formData = new FormData();
    console.log(image);
    result.map(item => {
      formData.append('AccountId', Number(user?.id));
      formData.append('commentBody', comment);
      formData.append('productId', item['productId']);
      formData.append('star', defaultRating);
      if (image) {
        formData.append('images', convertUploadFile(image));
      }
      evaluateService.postEvaluate(formData);
      orderService.putEvaluate(data.id, {statusOrder: 1});
    });
    toast.showSuccess({messageText: 'Đánh giá sản phẩm thành công'});
    goBack();
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', flexDirection: 'column'}}>
      <BaseHeaderNoCart title="Đánh giá" onBackPress={goBack} />
      <ScrollView>
        <FlatList
          data={result}
          horizontal={false}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
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
              <Image source={{uri: item.productcolor['image']}} style={{height: 100, width: 100}} />
              <View style={{flexDirection: 'column', marginHorizontal: 10, justifyContent: 'space-around'}}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{fontSize: 18, fontFamily: 'LibreBaskerville-DpdE', width: 230, color: 'black'}}>
                  {item.Product['name']}
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{fontSize: 15, fontFamily: 'LibreBaskerville-DpdE'}}>
                    Màu sắc : {item.productcolor['Color']['nameColor']}
                  </Text>
                  <Text style={{fontSize: 15, fontFamily: 'LibreBaskerville-DpdE'}}>x {item.quantity}</Text>
                </View>
                <View style={{alignSelf: 'flex-end'}}>
                  <Text>
                    {(item.ProductColorConfig
                      ? item.ProductColorConfig['price']
                      : item.Product['price']
                    ).toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
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
                        ? require('../../assets/images/star.png')
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
        <View style={{margin: 10}}>
          <Text style={{fontSize: 15, fontFamily: 'LibreBaskerville-DpdE', marginVertical: 10, color: 'black'}}>
            Thêm ảnh
          </Text>
          <TouchableOpacity style={{width: 100}} onPress={() => onPressImage()}>
            <Image
              source={avatarSource}
              style={{height: 100, width: 100, backgroundColor: '#E9E9E9'}}
              resizeMode={'center'}
            />
          </TouchableOpacity>
          <PopupChooseMedias
            ref={chooseImageRef}
            onImageSelected={avatarInfo => handleImageSelected(avatarInfo)}
            isAvatar
          />
        </View>
        <BaseButton
          disable={comment.toString().trim().length == 0 ? true : false}
          style={{marginBottom: 30}}
          onPress={() => {
            sendEvaluate();
          }}
          text="Gửi"
          width={hs(330)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default React.memo(EvaluateScreen);
