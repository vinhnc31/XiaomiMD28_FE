import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BaseHeader from "@src/containers/components/Base/BaseHeader";
import { GuestStackParam } from "@src/navigations/GuestNavigation/stackParam";
import { GUEST_NAVIGATION } from "@src/navigations/routes";
import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, View, FlatList, TouchableWithoutFeedback, Image, TouchableOpacity } from "react-native";
import styles from "./styles"
import { navigateToPage } from "@src/navigations/services";
import TouchableScale from 'react-native-touchable-scale';
import CategoryService from "@src/services/category";
import { CategoryModel } from "@src/services/category/category.model";

interface Props {
  navigation: NativeStackNavigationProp<GuestStackParam>;
  route: RouteProp<GuestStackParam, GUEST_NAVIGATION.CATEGORY>;
}

const CategoryScreen = (props: Props) => {
  const [data, setData] = useState<CategoryModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  const handleBackPress = () => {
    // Xử lý khi nút back được nhấn
    navigateToPage(GUEST_NAVIGATION.LOGIN)
  };

  const handleCartPress = () => {
    // Xử lý khi nút giỏ hàng được nhấn
    fetchDataCategory()
    console.log("eff: ", data.length)
  };

  useEffect(() => {
  }, [])

  const fetchDataCategory = async () => {
    try {
      const categoryService = new CategoryService();
      const result = await categoryService.fetchCategory();
      // result..forEach(item => item.id = item.id.toString());
      // console.log(typeof result);
      console.log(result);
      setData(Object.values(result)); // Cập nhật dữ liệu vào biến dat
    } catch (error) {
      setError("err");
      setLoading(false);
    }
  };



  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
      <View>
        <BaseHeader
          title="Danh mục"
          onBackPress={null}
          onCartPress={handleCartPress}
        />
      </View>

      <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <FlatList
      data={data}
      keyExtractor={(item) => item.name}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View >
        <Image source={{ uri: item.image }}/>
        <Text>{item.name}</Text>
        <Text>ID: {item.id}</Text>
        </View>
      )}
    />
        
      </View>

    </SafeAreaView>
  )

}

export default React.memo(CategoryScreen);
