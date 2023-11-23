import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import BaseHeader from '@src/containers/components/Base/BaseHeader';
import {GuestStackParam} from '@src/navigations/GuestNavigation/stackParam';
import {GUEST_NAVIGATION} from '@src/navigations/routes';
import {goBack} from '@src/navigations/services';
import ProductService from '@src/services/product';
import React, {useEffect, useState, useRef} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import styles from './styles';
import {BaseButton} from '@src/containers/components/Base';

import TouchableScale from 'react-native-touchable-scale';
import {ProductModel} from '@src/services/product/product.model';
import {ScrollView} from 'react-native';
import {hs} from '@src/styles/scalingUtils';
import R from '@src/res';

interface Props {
  navigation: NativeStackNavigationProp<GuestStackParam>;
  route: RouteProp<GuestStackParam, GUEST_NAVIGATION.PRODUCTLIST>;
}

const ProductListScreen = (props: Props) => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const route = props.route;
  const categoryId = route.params ? route.params.categoryId : undefined;

  const [loading, setLoading] = useState<boolean>(false);

  const config = {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  };


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

  

  function ListItemSuggest({item}: {item: ProductModel}) {
    // const imagesArray = JSON.parse(item.images);
    // console.log(item.images);
    return (
      <TouchableScale
        onPress={() => console.log('da chon 1 item', item.id)}
        activeScale={0.9}
        friction={9}
        tension={100}>
        <View style={styles.suggestItem}>
          <View style={styles.viewSuggestImage}>
            <Image source={{ uri: item.images }} style={{ width: '70%', height: '90%' }} />
          </View>
          <View style={{flex: 0.5}} />

          <View style={styles.viewSuggestText}>
            <Text numberOfLines={1} style={styles.suggestTextName}>
              {item.name}
            </Text>
            <Text style={styles.text}>
              {new Intl.NumberFormat("vi-VN", config).format(
                        item.price
                      )}
            </Text>
            <View style={styles.viewStar}>
              <Image style={styles.imgStar} source={R.images.iconStar} />
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
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>

              <BaseButton
                  onPress={() => console.log("ssaasas")}
                  style={{width: 100}}
                  loading={loading}
                  text={'Theo tên từ A - Z'}
                  // textStyle={styles.buttonText}
                />
                  <BaseButton
                  onPress={() => console.log("ssaasas")}
                  style={{width: 100}}
                  loading={loading}
                  text={'Theo tên từ Z - A'}
                  // textStyle={styles.buttonText}
                />
                  <BaseButton
                  onPress={() => console.log("ssaasas")}
                  style={{width: 100}}
                  loading={loading}
                  text={'Theo đánh giá'}
                  // textStyle={styles.buttonText}
                />
          </View>
        </View>

        <FlatList
          data={products}
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
