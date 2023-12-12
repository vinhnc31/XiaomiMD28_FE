import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BaseHeaderLisPrd from '@src/containers/components/Base/BaseHeaderListPrd';
import { GuestStackParam } from '@src/navigations/GuestNavigation/stackParam';
import { APP_NAVIGATION, GUEST_NAVIGATION } from '@src/navigations/routes';
import ProductService from '@src/services/product';
import ConfigurationService from '@src/services/configuration';
import React, { useEffect, useState, useRef } from 'react';
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View, Modal } from 'react-native';

import styles from './styles';
import { BaseButton } from '@src/containers/components/Base';

import TouchableScale from 'react-native-touchable-scale';
import { ProductModel } from '@src/services/product/product.model';
import { ConfigurationModel } from '@src/services/configuration/configuration.model';
import { ScrollView } from 'react-native';
import { hs } from '@src/styles/scalingUtils';
import R from '@src/res';
import BaseInput from '@src/containers/components/Base/BaseInput';
import { navigateToPage, goBack } from '@src/navigations/services';
import { BaseLoading } from '@src/containers/components/Base/BaseLoading';
import { Dropdown } from 'react-native-element-dropdown';

interface Props {
  navigation: NativeStackNavigationProp<GuestStackParam>;
  route: RouteProp<GuestStackParam, GUEST_NAVIGATION.PRODUCTLIST>;
}

const ProductListScreen = (props: Props) => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const route = props.route;
  const categoryId = route.params ? route.params.categoryId : undefined;
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [hasData, setHasData] = useState(true); //check hiển thị tb k có dât

  const [minimum, setMinimum] = useState<string>('');
  const [max, setMax] = useState<string>('');


  const [valueColor, setValueColor] = useState(null);
  const [items, setItems] = useState([
    { label: 'Titanium', nameColor: 'titanium', color: 'titanium' },
    { label: 'Xanh', nameColor: 'xanh', color: 'green' },
    { label: 'Đen', nameColor: 'den', color: 'black' },
    { label: 'Xám', nameColor: 'xam', color: 'gray' },
    { label: 'Hồng', nameColor: 'hong', color: 'pink' },
    { label: 'Trắng', nameColor: 'trang', color: 'white' },
    { label: 'Tím', nameColor: 'tim', color: 'purple' },
    { label: 'Vàng', nameColor: 'vang', color: 'yellow' },
  ]);
  const [isFocus, setIsFocus] = useState(false);

  const [valueConfiguration, setValueConfiguration] = useState(null);
  const [configuration, setConfiguration] = useState<ConfigurationModel[]>([]);
  // Hàm để lấy sản phẩm dựa trên giá trị cấu hình
  const getProductByConfig = async () => {
    try {
      setLoadingData(true);
      const productService = new ProductService();
      const productList = await productService.getProductByConfig(valueConfiguration, categoryId);
      console.log("ssssssss: ", productList.data.length);
      setProducts(productList.data);
      setHasData(productList.data.length > 0);
    } catch (error) {
      console.error('Error fetching products by config:', error);
    } finally {
      setLoadingData(false);
    }
  };

  // Hàm để lấy sản phẩm dựa trên giá trị cấu hình
  const getProductByColor = async () => {
    try {
      setLoadingData(true);
      const productService = new ProductService();
      const productList = await productService.getProductByColor(valueColor, categoryId);
      console.log("data by color: ", productList.data.length);
      setProducts(productList.data);
      setHasData(productList.data.length > 0);
    } catch (error) {
      console.error('Error fetching products by config:', error);
    } finally {
      setLoadingData(false);
    }
  };

  // Thêm hàm mới để lấy sản phẩm theo giá
  const getProductByPrice = async (minPrice: number, maxPrice: number, categoryId: number) => {
    try {
      setLoadingData(true);
      const productService = new ProductService();
      const productList = await productService.getProductByPrice(minPrice, maxPrice, categoryId);
      console.log("Data by price: ", productList.length);
      setProducts(productList.data);
      setHasData(productList.data.length > 0);
    } catch (error) {
      console.error('Error fetching products by price:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoadingData(true); // Bắt đầu tải dữ liệu
      const productService = new ProductService();
      const productList = await productService.getProductByIdCategory(categoryId);
      console.log('Product: ', productList.data.length);
      setProducts(productList.data);
      setHasData(productList.data.length > 0); // Cập nhật trạng thái có dữ liệu hay không
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoadingData(false); // Kết thúc tải dữ liệu, có hoặc không có dữ liệu
    }
  };

  const fetchConfig = async () => {
    try {
      const categoryService = new ConfigurationService();
      const result = await categoryService.fetchConfiguration();
      setConfiguration(result.data);
      console.log(result.data.length);
    } catch (error) {
      setError('err');
    }
  };


  // Trong hàm áp dụng lọc
const applyFilter = () => {
  const minPrice = parseInt(minimum);
  const maxPrice = parseInt(max);
  
  // Kiểm tra nếu giá trị minimum và maximum rỗng thì gọi hàm fetchProducts
  if (isNaN(minPrice) && isNaN(maxPrice)) {
    fetchProducts();
  } else {
    setValueConfiguration(null);
    setValueColor(null);
    getProductByPrice(minPrice, maxPrice, categoryId);
  }
};

  useEffect(() => {
    fetchConfig();
    if (valueConfiguration && categoryId) {
      getProductByConfig();
      console.log("vao day")
    } else {
      fetchProducts();
    }
  }, [valueConfiguration, categoryId]);

  useEffect(() => {
    fetchConfig();
    if (valueColor && categoryId) {
      getProductByColor();
      console.log("vao day")
    } else {
      fetchProducts();
    }
    console.log("value, id: ", valueColor, categoryId);
  }, [valueColor, categoryId]);

  const [isChecked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked(!isChecked);
  };


  const config = {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 9,
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

  const sortProductByStar = (order: 'asc' | 'desc') => {
    const sortedProducts = [...products].sort((a, b) => {
      if (order === 'asc') {
        return a.averageRating - b.averageRating;
      }
      return b.averageRating - a.averageRating;
    });
  
    setProducts(sortedProducts);
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
    navigateToPage(APP_NAVIGATION.CART);
  };

  function ListItemSuggest({ item }: { item: ProductModel }) {
    return (
      <TouchableScale
        onPress={() => console.log('da chon 1 item', item.id)}
        activeScale={0.9}
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
            <Text style={styles.text}>{new Intl.NumberFormat('vi-VN', config).format(item.price)}</Text>
            <View style={styles.viewStar}>
              <Image style={styles.imgStar} source={R.images.iconStar} />
              <Text style={styles.text}>{item.averageRating} </Text>
              <Text style={styles.textCmt}>({item.commentCount})</Text>
            </View>
          </View>
        </View>
      </TouchableScale>
    );
  }

  const [isFilterVisible, setFilterVisible] = useState(false);


  const toggleFilter = () => {
    onFilterPress
    setFilterVisible(!isFilterVisible);
  };

  const { onFilterPress } = props;

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
      <BaseHeaderLisPrd
        title={route.params!.name}
        onCartPress={handleCartPress}
        onBackPress={handleBackPress}
        onFilterPress={toggleFilter}
      />

      <ScrollView style={{ paddingHorizontal: 8, backgroundColor: '#FBEFE5' }} showsVerticalScrollIndicator={false}>
        
      {isFilterVisible && (
        <View style={styles.viewFilter}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
          <BaseButton
            onPress={sortByAscending}
            style={{ flex: 1, backgroundColor: '#D9D9D9' }}
            loading={loading}
            text={'Giá từ thấp đến cao'}
            textStyle={styles.buttonText}
          />
          <BaseButton
            onPress={sortByDescending}
            style={{ flex: 1, backgroundColor: '#D9D9D9', marginHorizontal: 8 }}
            loading={loading}
            text={'Giá từ cao đến thấp'}
            textStyle={styles.buttonText}
          />
          <BaseButton
            onPress={() => sortProductByStar('desc')}
            style={{ flex: 1, backgroundColor: '#D9D9D9' }}
            loading={loading}
            text={'Đánh giá'}
            textStyle={styles.buttonText}
          />
        </View>

        <View style={{borderWidth: 1, marginTop: 8, borderColor: '#D9D9D9'}}/>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
          <View
            style={{
              flex: 6,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginRight: 8,
            }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <BaseInput
                leftIcon={''}
                title="Tối thiểu"
                value={minimum}
                onChangeText={setMinimum}
                borderRadius={10}
                style={{ width: '100%', height: 40, marginBottom: -2, borderRadius: 5 }}
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
                style={{ width: '100%', height: 40, marginBottom: -2, borderRadius: 5}}
              />
            </View>
          </View>

          <View style={{ flex: 2.5 }}>
            <BaseButton
              // onPress={() => filterProducts(parseInt(minimum), parseInt(max))}
              onPress={applyFilter}
              style={{ flex: 1, backgroundColor: '#FF6900', height: 40 }}
              loading={loading}
              text={'Áp dụng'}
              textStyle={styles.buttonText}
            />
          </View>
        </View>

        <View style={{borderWidth: 1, marginTop: 8, borderColor: '#D9D9D9'}}/>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue'}, {marginRight: 8}]}
            placeholderStyle={styles.placeholderStyle}
            placeholder='Màu sắc'
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={items}
            maxHeight={300}
            labelField="label"
            valueField="nameColor"
            value={valueColor}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              console.log("color: ", item.nameColor)
              setValueColor(item.nameColor);
              setIsFocus(false);
            }}
            renderItem={(item, index, isSelected) => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: item.color,
                    marginRight: 10,
                    borderWidth: 1,
                    margin: 2,
                    borderColor: '#FF6900',
                  }}
                />
                <Text style={{ color: 'black', fontFamily: 'LibreBaskerville-Regular' }}>{item.label}</Text>
              </View>
            )}
          />

          <Dropdown
            style={[styles.dropdown1, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            placeholder='Cấu hình'
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={configuration}
            maxHeight={300}
            labelField="nameConfig"
            valueField="nameConfig"
            value={valueConfiguration}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              console.log('Selected Configuration:', item.nameConfig);
              setValueConfiguration(item.nameConfig);
              setIsFocus(false);
            }}
            disable={categoryId !== 1}
          />
        </View>
        </View>
      )}
       

        {loadingData ? (
          <View style={{ height: 100 }}>
            <BaseLoading size={30} top={10} loading={true} color={'red'} />
          </View>
        ) : (
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
        )}


        {!hasData &&
          <View style={{ flex: 1, marginTop: 100, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={R.images.imgNoResult} style={{ width: 100, height: 100 }} />
            <Text style={{ fontSize: 20, fontFamily: 'LibreBaskerville-Bold', color: 'black' }}>Không có sản phẩm</Text>
          </View>}
      </ScrollView>
      </SafeAreaView>
  );
};

      {/* <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={toggleModal}
        statusBarTranslucent={true}>
        <View style={styles.modalContainer}>
          <View style={{ height: 60, backgroundColor: '#FF6900', flexDirection: 'row' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity
                onPress={toggleModal}
                style={{ backgroundColor: 'white', width: 20, alignItems: 'center' }}>
                <Text>X</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 9, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Lọc kết quả</Text>
            </View>
          </View>

          <View>
            <TouchableOpacity onPress={toggleCheckbox} style={styles.checkboxContainer}>
              <View style={[styles.checkbox, isChecked && styles.checked]} />
              <Text style={styles.label}>Checkbox Label</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}


export default React.memo(ProductListScreen);
