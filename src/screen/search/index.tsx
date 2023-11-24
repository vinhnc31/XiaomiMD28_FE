import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParam } from '@src/navigations/AppNavigation/stackParam';
import { APP_NAVIGATION } from '@src/navigations/routes';
import ProductService from '@src/services/product';
import { ProductModel } from '@src/services/product/product.model';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import R from '@src/res';
import {goBack} from '@src/navigations/services';

interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.CATEGORY>;
}

const SearchScreen = (props: Props) => {
  const [listProducts, setListProducts] = useState<ProductModel[]>([]);
  const [filteredDataSource, setFilteredDataSource] = useState<ProductModel[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 }

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const productService = new ProductService();
      const productList = await productService.getProduct();
      console.log('Product: ', productList.data.length);
      setListProducts(productList.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const searchFillterArr = (text) => {
    if (text) {
      const newData = listProducts.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
      // console.log("search: ", search);
      // console.log("setFilteredDataSource: ", filteredDataSource)
    } else {
      setFilteredDataSource([]);
      setSearch(text);
    }
  }

  const handleBackPress = () => {
    goBack();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.viewHeader, { flexDirection: "row" }]}>
        <View style={{ flex: 0.5, justifyContent: "center" }}>
          <TouchableOpacity
            onPress={handleBackPress}
          >
            <Image
              style={{ width: 20, height: 20, marginLeft: 5 }}
              source={R.images.iconBack}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 4, justifyContent: "center" }}>
          <View
            style={{
              backgroundColor: "#ffffff",
              width: "95%",
              height: 47,
              alignSelf: "center",
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 20, height: 20, marginLeft: 16 }}
              source={R.images.iconSearch}
            />

            <TextInput
              style={{ width: "100%", height: "100%", marginLeft: 11 }}
              placeholder="Tìm kiếm sản phẩm"
              placeholderTextColor="#808080"
              onChangeText={(text) => searchFillterArr(text)}
              value={search}
            />

          </View>
        </View>
      </View>

      {/* <View style={styles.viewTabar}></View> */}

      <View style={styles.viewFlatlist}>
        {isLoading ? <ActivityIndicator size="large" color="#00ff00" /> : null}
        <FlatList
          style={{ alignSelf: "center"}}
          data={filteredDataSource}
          renderItem={({ item }) => {
            const partialText = item.name.split(search)
            return (

              <TouchableOpacity
                style={styles.itemView}>
                <Text>
                  {partialText.map((part, index) => {
                    console.log(partialText.length, 'length');
                    console.log(part, "part");
                    return (
                      <Text key={index}>
                        {part}
                        {index !== partialText.length - 1 && <Text style={{ color: 'red' }}>{search}</Text>}
                      </Text>
                    )
                  })}
                </Text>
                <Text style={{ color: "red" }}>{new Intl.NumberFormat('vi-VN', config).format(item.price)}</Text>
                <Text>{item.quantity}</Text>
              </TouchableOpacity>
            )
          }}
          keyExtractor={(item) => item.id.toString()}

        />
      </View>
    </View>

  );
}

export default React.memo(SearchScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    flexDirection: "column",
  },
  viewHeader: {
    flex: 1.8,
    backgroundColor: "orange",
  },
  viewTabar: {
    flex: 1.2,
    backgroundColor: "#CDF1FF",
  },
  viewFlatlist: {
    flex: 15,
    backgroundColor: "red",
  },
  itemView: {
    width: "98%",
    height: 80,
    backgroundColor: "#CDF1FF",
    margin: 5,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
});