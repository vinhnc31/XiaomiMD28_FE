import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BaseHeader from "@src/containers/components/Base/BaseHeader";
import { GuestStackParam } from "@src/navigations/GuestNavigation/stackParam";
import { GUEST_NAVIGATION } from "@src/navigations/routes";
import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, View, FlatList, TouchableWithoutFeedback, Image, TouchableOpacity } from "react-native";
import styles from "./styles"
import { navigateToPage, goBack } from "@src/navigations/services";
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
    goBack();
  };

  const handleCartPress = () => {
    fetchDataCategory()
  };

  useEffect(() => {
    fetchDataCategory()
    console.log("eff: ", data)
  }, [])

  // useEffect(() => {
  //   console.log("data has been updated:", data);
  // }, [data]);

  const fetchDataCategory = async () => {
    try {
      const categoryService = new CategoryService();
      const result = await categoryService.fetchCategory();
      console.log(result.data);
      setData(result.data)
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
          onCartPress={handleCartPress}
          onBackPress={handleBackPress}
        />
      </View>

      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableScale onPress={() => console.log("code Xem chi tiet data: ", item.name)} activeScale={0.9} friction={9} tension={100}>
              <View style={styles.viewItemCategory}>
                <View style={{ flex: 2 }}>
                  {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.imgCategory} />
                  ) : (
                    <Text>No Image</Text>
                  )}
                </View>
                <View style={styles.viewTextCategory}>
                  <Text style={styles.textNameCategory}>{item.name}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.textQuantityCategory}>{item.id}</Text>
                    <Text style={styles.textQuantityCategory}> Sản phẩm</Text>
                  </View>
                </View>

                <View style={{ position: 'absolute', right: -17, bottom: 25 }}>
                  <TouchableOpacity onPress={() => console.log("alo")}>
                    <Image
                      style={{ width: 35, height: 35 }}
                      source={require('../../assets/images/btnChuyenMan.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableScale>
          )}
        />
      </View>

    </SafeAreaView>
  )

}

export default React.memo(CategoryScreen);
