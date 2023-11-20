import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import BaseHeader from '@src/containers/components/Base/BaseHeader';
import {GuestStackParam} from '@src/navigations/GuestNavigation/stackParam';
import {GUEST_NAVIGATION} from '@src/navigations/routes';
import {goBack} from '@src/navigations/services';
import CategoryService from '@src/services/category';
import ProductService from '@src/services/product';
import React, {useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
  Modal,
  Button,
  Alert,
  Pressable,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

import styles from './styles';
import {BaseButton} from '@src/containers/components/Base';

import TouchableScale from 'react-native-touchable-scale';
import {ProductModel} from '@src/services/product/product.model';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native';
import {hs} from '@src/styles/scalingUtils';
import {Movie} from '@src/screen/home/homeFlatlist';

interface Props {
  navigation: NativeStackNavigationProp<GuestStackParam>;
  route: RouteProp<GuestStackParam, GUEST_NAVIGATION.PRODUCTLIST>;
}

const ProductListScreen = (props: Props) => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const route = props.route;
  const categoryId = route.params ? route.params.categoryId : undefined;

  const [data1, setData] = useState<Movie[]>([]);

  useEffect(() => {
    console.log('id đã được chọn: ', categoryId);
    fetchProducts();
  }, [categoryId]);

  const fetchProducts = async () => {
    try {
      const productService = new ProductService();
      const productList = await productService.getProductByIdCategory(categoryId);
      console.log('Product: ', productList.data.length);
      setProducts(productList.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleBackPress = () => {
    goBack();
  };

  const handleCartPress = () => {};

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const scale = useRef(new Animated.Value(0)).current;

  const filter = [
    {
      title: 'Giá từ',
      icon: 'shopping-cart',
      options: [
        {label: 'Dưới 5 triệu', value: 'duoi5trieu', action: () => fetchData()},
        {label: 'Từ 5 - 10 triệu', value: 'tu5den10', action: () => console.log('Da click 5tr den 10tr')},
        {label: 'Từ 10 - 15 triệu', value: 'tu10den15', action: () => console.log('Da click 10tr den 15tr')},
        {label: 'Từ 15 - 20 triệu', value: 'tu15den20', action: () => console.log('Da click 15tr - 20tr')},
        {label: 'Từ 20 - 25 triệu', value: 'tu20den25', action: () => console.log('Da click 20 - 25tr')},
        {label: 'Từ 25 - 30 triệu', value: 'tu25den30', action: () => console.log('Da click 25 - 30tr')},
        {label: 'Trên 30 triệu', value: 'tren30', action: () => console.log('Da click tren 30tr')},
      ],
      action: () => console.log('Thao gia'),
    },
    {
      title: 'Màu sắc',
      icon: 'shopping-cart',
      options: [
        {label: 'Đen', value: 'black'},
        {label: 'Trắng', value: 'white'},
        {label: 'Xanh', value: 'blue'},
        {label: 'Hồng', value: 'pink'},
        {label: 'Tự nhiên', value: 'nature'},
      ],
      action: () => console.log('theo danh gia'),
    },
    {
      title: 'Sắp xếp',
      icon: 'shopping-cart',
      options: [
        {label: 'Giá cao đến thấp', value: 'caodenthap'},
        {label: 'Giá thấp đến cao', value: 'thapdencao'},
        {label: 'Đánh giá', value: 'danhgia'},
        {label: 'Mới nhất', value: 'new'},
      ],
      action: () => console.log('theo danh gia'),
    },
  ];

  const fetchData = async () => {
    try {
      const response = await fetch('https://6399d10b16b0fdad774a46a6.mockapi.io/booCar');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError('err');
    }
  };

  const renderOptions = () => {
    if (!selectedFilter) return null;

    return selectedFilter.options.map((option, index) => (
      <TouchableOpacity
        style={{padding: 10, borderBottomWidth: index === selectedFilter.options.length - 1 ? 0 : 1}}
        key={index}
        onPress={() => {
          console.log(option.value); // xử lý khi lựa chọn option
          option.action();
          const actionResult = option.action(); // gọi đến hàm action và lưu kết quả
          console.log('Action result:', actionResult);
          setModalVisible(false);
        }}>
        <Text>{option.label}</Text>
      </TouchableOpacity>
    ));
  };

  function resizeBox(to) {
    to === 1 && setModalVisible(true);
    Animated.timing(scale, {
      toValue: to,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start(() => to === 0 && setModalVisible(false));
  }

  function ListItemSuggest({item}: {item: ProductModel}) {
    // const imagesArray = JSON.parse(item.images);
    return (
      <TouchableScale
        onPress={() => console.log('da chon 1 item', item.id)}
        activeScale={0.9}
        friction={9}
        tension={100}>
        <View style={styles.suggestItem}>
          <View style={styles.viewSuggestImage}>
            {/* {imagesArray.length > 0 ? (
              <Image
                source={{ uri: imagesArray[0] }}
                style={{ width: '70%', height: '90%' }}
              />
            ) : (
              <Text>No Image Available</Text>
            )} */}
          </View>
          <View style={{flex: 0.5}} />

          <Image
            style={{width: 30, height: 35, position: 'absolute', left: 16, bottom: 75}}
            source={require('../../../assets/images/hot2.png')}
          />
          <View style={styles.viewSuggestText}>
            <Text numberOfLines={1} style={styles.suggestTextName}>
              {item.name}
            </Text>
            <Text style={styles.text}>
              {item.price}
              <Text style={{textDecorationLine: 'underline', color: 'red'}}>đ</Text>
            </Text>
            <View style={styles.viewStar}>
              <Image style={styles.imgStar} source={require('../../../assets/images/star4.png')} />
              <Text style={styles.text}>4.9</Text>
              <Text style={styles.textCmt}>(50)</Text>
            </View>
          </View>
        </View>
      </TouchableScale>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
      <BaseHeader title={route.params!.name} onCartPress={handleCartPress} onBackPress={handleBackPress} />

      <ScrollView style={{paddingHorizontal: 8, backgroundColor: '#FBEFE5'}} showsVerticalScrollIndicator={false}>
        <View style={styles.viewFilter}>
          <Text style={{fontSize: 16, fontWeight: '500', color: 'black'}}>Lọc danh sách:</Text>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
            {filter.map((op, i) => (
              <View key={i}>
                <BaseButton
                  text={op.title}
                  onPress={() => {
                    resizeBox(1);
                    setSelectedFilter(op);
                  }}
                  width={hs(100)}
                  height={hs(36)}
                />

                <Modal transparent={true} visible={modalVisible}>
                  <SafeAreaView style={{flex: 1}}>
                    <Animated.View
                      style={[
                        styles.popup,
                        {
                          opacity: scale.interpolate({inputRange: [0, 1], outputRange: [0, 1]}),
                        },
                        {
                          transform: [{scale}],
                        },
                      ]}>
                      <View>
                        <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
                          {renderOptions()}
                          <BaseButton onPress={() => resizeBox(0)} text="Huỷ" />
                        </View>
                      </View>
                    </Animated.View>
                  </SafeAreaView>
                </Modal>
              </View>
            ))}
          </View>
        </View>

        <FlatList
          data={data1}
          keyExtractor={item => item.id.toString()} // Sử dụng item.id làm key
          columnWrapperStyle={{justifyContent: 'space-between'}}
          numColumns={2}
          horizontal={false}
          scrollEnabled={false}
          contentContainerStyle={styles.flatListSuggestContainer}
          renderItem={({item}) => <ListItemSuggest key={item.id} item={item} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(ProductListScreen);
