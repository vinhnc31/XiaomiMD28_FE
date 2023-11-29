import React, { useEffect, useState } from 'react';

import { Text, SafeAreaView, Button, View, StyleSheet, TouchableOpacity, Dimensions, FlatList, Image, Modal, TextInput } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParam, MenuStackParam } from '@src/navigations/AppNavigation/stackParam';
import { MENU_NAVIGATION } from '@src/navigations/routes';
import { BottomPopup } from '../../containers/components/Base/BottomPopup'
import { CategoryModel } from '@src/services/category/category.model';
import CategoryService from '@src/services/category';
import SelectDropdown from 'react-native-select-dropdown'
import DropDownPicker from 'react-native-dropdown-picker';
import { ProductModel } from '@src/services/product/product.model';
import ProductService from '@src/services/product';

export type ScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<MenuStackParam, MENU_NAVIGATION.NOTIFICATIONS>,
  NativeStackNavigationProp<AppStackParam>
>;

interface Props {
  navigation: ScreenNavigationProps;
  route: RouteProp<MenuStackParam, MENU_NAVIGATION.NOTIFICATIONS>;
}



const NotificationScreen = (props: Props) => {

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

  const productService = new ProductService();
  const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    const fetchProductsByColor = async () => {
      try {
        if (value) {
          const products = await productService.getProductByColor(value);
          setFilteredProducts(products);
        } else {
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products by color:', error);
      }
    };

    fetchProductsByColor();
  }, [value]);

  return (

    <View style={{ flex: 1, justifyContent: 'space-around' }}>
      <DropDownPicker
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
      />
      <Text>Selected Item: {value ? value : 'None'}</Text>

      {/* Display filtered products */}
      <Text>Filtered Products:</Text>
      {filteredProducts.map((product) => (
        <Text key={product.id}>{product.name}</Text>
        // Add other product details as needed
      ))}
    </View>

  );
};

export default React.memo(NotificationScreen);
