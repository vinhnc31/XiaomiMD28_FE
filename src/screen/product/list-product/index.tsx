import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BaseHeader from "@src/containers/components/Base/BaseHeader";
import { GuestStackParam } from "@src/navigations/GuestNavigation/stackParam";
import { GUEST_NAVIGATION } from "@src/navigations/routes";
import { goBack } from "@src/navigations/services";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native"


interface Props {
  navigation: NativeStackNavigationProp<GuestStackParam>;
  route: RouteProp<GuestStackParam, GUEST_NAVIGATION.PRODUCTLIST>;
}

const ProductListScreen = (props: Props) => {
  const [products, setProducts] = useState([]);

  const { route } = props;
  const { id } = route.params;

  useEffect(() => {
    // Gọi API để lấy danh sách sản phẩm dựa vào id
    axios.get(`http://10.10.66.63:3000/api/product/${id}`)
      .then(response => {
        // Xử lý dữ liệu response.data (danh sách sản phẩm) ở đây
        const productList = response.data;
        console.log("productlist: ", productList.data.length);
        setProducts(productList);

        productList.map(product => {
          console.log('Product Name:', product.name);
          console.log('Product Price:', product.price);
          // Thực hiện các thao tác khác với thông tin sản phẩm
        });
      })
      .catch(error => {
        // Xử lý lỗi nếu có
      });
  }, [id]);
  

  const handleBackPress = () => {
    goBack();
  };

  const handleCartPress = () => {
  };

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
      <View>
        <BaseHeader
          title="Danh mục"
          onCartPress={handleCartPress}
          onBackPress={handleBackPress}
        />
      </View>

      <View>
      <Text>List of Products in Category</Text>

    </View>


      </SafeAreaView>
  )

}

export default React.memo(ProductListScreen);