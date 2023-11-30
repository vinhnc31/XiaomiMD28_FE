import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BaseHeader from '@src/containers/components/Base/BaseHeader';
import { GuestStackParam } from '@src/navigations/GuestNavigation/stackParam';
import { APP_NAVIGATION, GUEST_NAVIGATION } from '@src/navigations/routes';
import ProductService from '@src/services/product';
import React, { useEffect, useState, useRef } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Modal
} from 'react-native';

import styles from './styles';
import { BaseButton } from '@src/containers/components/Base';

import TouchableScale from 'react-native-touchable-scale';
import { ProductModel } from '@src/services/product/product.model';
import { ScrollView } from 'react-native';
import { hs } from '@src/styles/scalingUtils';
import R from '@src/res';
import BaseInput from '@src/containers/components/Base/BaseInput';
import { navigateToPage, goBack } from "@src/navigations/services";


import DropDownPicker from 'react-native-dropdown-picker';
interface Props {
  navigation: NativeStackNavigationProp<GuestStackParam>;
  route: RouteProp<GuestStackParam, GUEST_NAVIGATION.PRODUCTLIST>;
}

const ProductListScreen = (props: Props) => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const route = props.route;
  const categoryId = route.params ? route.params.categoryId : undefined;
  const [loading, setLoading] = useState<boolean>(false);

  const [minimum, setMinimum] = useState<string>('');
  const [max, setMax] = useState<string>('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Titanium', value: 'titanium', color: 'gray' },
    { label: 'Xanh', value: 'xanh', color: 'green' },
    { label: 'Đen', value: 'den', color: 'black' },
    { label: 'Xám', value: 'xam', color: 'gray' },
    { label: 'Hồng', value: 'hong', color: 'pink' },
    { label: 'Trắng', value: 'trang', color: 'white' },
    { label: 'Tím', value: 'tim', color: 'purple' },
    { label: 'Vàng', value: 'vang', color: 'yellow' },
  ]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked(!isChecked);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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


  const sortProducts = (order: 'asc' | 'desc') => {
    const sortedProducts = [...products].sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setProducts(sortedProducts);
  };


  const filterProducts = (minPrice: number, maxPrice: number) => {
    let filteredProducts = products;
    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      filteredProducts = filteredProducts.filter(item => item.price >= minPrice && item.price <= maxPrice);
    } else {
      fetchProducts();
      return;
    }
    setProducts([...filteredProducts]);  // Cập nhật mảng products
  };


  const sortByAscending = () => {
    sortProducts('asc');
  };

  const sortByDescending = () => {
    sortProducts('desc');
  };

  const handleBackPress = () => {
    goBack();
  };

  const handleCartPress = () => {
    navigateToPage(APP_NAVIGATION.CART)
  };

  function ListItemSuggest({ item }: { item: ProductModel }) {
    return (
      <TouchableScale onPress={() => console.log('da chon 1 item', item.id)} activeScale={0.9}
        friction={9}
        tension={100}>
        <View style={styles.suggestItem}>
          <View style={styles.viewSuggestImage}>
            <Image source={{ uri: item.images }} style={{ width: '100%', height: '100%' }} />
          </View>
          <View style={{ flex: 0.5 }} />

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
              <Text style={styles.text}>4.9 </Text>
              <Text style={styles.textCmt}>(50)</Text>
            </View>
          </View>
        </View>
      </TouchableScale>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
      <BaseHeader title={route.params!.name} onCartPress={handleCartPress} onBackPress={handleBackPress} onFilterPress={toggleModal} />

      <ScrollView
        style={{ paddingHorizontal: 8, backgroundColor: '#FBEFE5' }}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.viewFilter}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
            <BaseButton
              onPress={sortByAscending}
              style={{ flex: 1, backgroundColor: '#D9D9D9', marginRight: 8 }}
              loading={loading}
              text={'Giá từ thấp đến cao'}
              textStyle={styles.buttonText}
            />
            <BaseButton
              onPress={sortByDescending}
              style={{ flex: 1, backgroundColor: '#D9D9D9' }}
              loading={loading}
              text={'Giá từ cao đến thấp'}
              textStyle={styles.buttonText}
            />
          </View>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <View style={{ flex: 6, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginRight: 8 }}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <BaseInput
                  leftIcon={''}
                  title="Tối thiểu"
                  value={minimum}
                  onChangeText={setMinimum}
                  borderRadius={10}
                  style={{ width: '100%', height: 40, marginBottom: -2 }}
                />
              </View>

              <View style={{ borderWidth: 1, width: 10, marginTop: 8, marginHorizontal: 6, borderColor: 'gray' }} />

              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <BaseInput
                  leftIcon={''}
                  title="Tối đa"
                  value={max}
                  onChangeText={setMax}
                  borderRadius={10}
                  style={{ width: '100%', height: 40, marginBottom: -2 }}
                />
              </View>
            </View>

            <View style={{ flex: 2.5 }}>
              <BaseButton
                onPress={() => filterProducts(parseInt(minimum), parseInt(max))}
                style={{ flex: 1, backgroundColor: '#FF6900', height: 40 }}
                loading={loading}
                text={'Áp dụng'}
                textStyle={styles.buttonText}
              />
            </View>

          </View>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
            <BaseButton
              onPress={() => console.log("ssaasas")}
              style={{ flex: 1, backgroundColor: '#D9D9D9' }}
              loading={loading}
              text={'Theo đánh giá'}
              textStyle={styles.buttonText}
            />

            <BaseButton
              onPress={() => console.log("ssaasas")}
              style={{ flex: 1, backgroundColor: '#D9D9D9' }}
              loading={loading}
              text={'Theo màu'}
              textStyle={styles.buttonText}
            />

            {/* <DropDownPicker
              open={open}
              value={value}
              items={items.map((item) => ({
                label: (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: item.color,
                        marginRight: 10,
                      }}
                    />
                    <Text>{item.label}</Text>
                  </View>
                ),
                value: item.value,
                color: item.color,
              }))}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              containerStyle={{ zIndex: 1000 }}
            /> */}

            <BaseButton
              onPress={() => console.log("ssaasas")}
              style={{ flex: 1, backgroundColor: '#D9D9D9' }}
              loading={loading}
              text={'Theo cấu hình'}
              textStyle={styles.buttonText}
            />
          </View>
        </View>

        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()} // Sử dụng item.id làm key
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          numColumns={2}
          horizontal={false}
          scrollEnabled={false}
          contentContainerStyle={styles.flatListSuggestContainer}
          renderItem={({ item }) => <ListItemSuggest key={item.id} item={item} />}
        />
      </ScrollView>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={toggleModal}
        statusBarTranslucent={true}
      >
        <View style={styles.modalContainer}>
          <View style={{ height: 60, backgroundColor: '#FF6900', flexDirection: 'row' }}>
           

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={toggleModal} style={{backgroundColor: 'white', width: 20, alignItems: 'center'}}>
                <Text>X</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 9, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Lọc kết quả</Text>

            </View>
          </View>

          <View>
            <TouchableOpacity onPress={toggleCheckbox} style={styles.checkboxContainer}>
              <View style={[styles.checkbox, isChecked && styles.checked]} />
              <Text style={styles.label}>Checkbox Label</Text>
            </TouchableOpacity>
          </View>




        </View>




      </Modal>
    </SafeAreaView>
  );
};

export default React.memo(ProductListScreen);
