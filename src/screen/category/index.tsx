import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BaseHeader from "@src/containers/components/Base/BaseHeader";
import { GuestStackParam } from "@src/navigations/GuestNavigation/stackParam";
import { GUEST_NAVIGATION } from "@src/navigations/routes";
import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, View, FlatList, TouchableWithoutFeedback, Image, TouchableOpacity } from "react-native";
import styles from "./styles"

interface Props {
  navigation: NativeStackNavigationProp<GuestStackParam>;
  route: RouteProp<GuestStackParam, GUEST_NAVIGATION.CATEGORY>;
}

const CategoryScreen = (props: Props) => {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  type Category = {
    id: string;
    image: string;
    name: string;
    quantityCategory: number;
  };

  const handleBackPress = () => {
    // Xử lý khi nút back được nhấn
  };

  const handleCartPress = () => {
    // Xử lý khi nút giỏ hàng được nhấn
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://6399d10b16b0fdad774a46a6.mockapi.io/facebook');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log(result);
      setData(result);
      setLoading(false);
    } catch (error) {
      setError("err");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData()
  })

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
      <View>
        <BaseHeader
          title="Danh mục"
          onBackPress={handleBackPress}
          onCartPress={handleCartPress}
        />
      </View>

      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => console.log("code Xem chi tiet data: ", item.name)}>
              <View style={styles.viewItemCategory}>
                <View style={{ flex: 2 }}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.imgCategory}
                  />
                </View>
                <View style={styles.viewTextCategory}>
                  <Text style={styles.textNameCategory}>{item.name}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.textQuantityCategory}>{item.quantityCategory}</Text>
                    <Text style={styles.textQuantityCategory}> Sản phẩm</Text>
                  </View>
                </View>

                <View style={{position: 'absolute', right: -17, bottom: 30}}>
                  <TouchableOpacity onPress={() => console.log("alo")}>
                    <Image
                      style={{ width: 35, height: 35 }}
                      source={require('../../assets/images/btnChuyenMan.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>

            </TouchableWithoutFeedback>
          )}
        />
      </View>

    </SafeAreaView>
  )

}

export default React.memo(CategoryScreen);