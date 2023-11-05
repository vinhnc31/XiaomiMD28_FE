import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BaseHeader from "@src/containers/components/Base/BaseHeader";
import { GuestStackParam } from "@src/navigations/GuestNavigation/stackParam";
import { GUEST_NAVIGATION } from "@src/navigations/routes";
import { goBack } from "@src/navigations/services";
import CategoryService from "@src/services/category";
import ProductService from "@src/services/product";
import React, { useEffect, useState, useRef } from "react";
import { Dimensions, FlatList, Image, SafeAreaView, Text, TouchableWithoutFeedback, View, Modal, Button, Alert, Pressable, TouchableOpacity, Animated, Easing } from "react-native"

import styles from './styles';
import { BaseButton } from "@src/containers/components/Base";

import TouchableScale from "react-native-touchable-scale";
import { ProductModel } from "@src/services/product/product.model";
import Icon from 'react-native-vector-icons/FontAwesome';


interface Props {
  navigation: NativeStackNavigationProp<GuestStackParam>;
  route: RouteProp<GuestStackParam, GUEST_NAVIGATION.PRODUCTLIST>;
}

const ProductListScreen = (props: Props) => {
  const [products, setProducts] = useState([]);
  const route = props.route;
  const categoryId = route.params ? route.params.categoryId : undefined;

  useEffect(() => {
    console.log("id đã được chọn: ", categoryId);
    fetchProducts();
  }, [categoryId]);

  const fetchProducts = async () => {
    try {
      const productService = new ProductService();
      const productList = await productService.getProductByIdCategory(categoryId);
      console.log("Product: ", productList.data.length);
      setProducts(productList.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleBackPress = () => {
    goBack();
  };

  const handleCartPress = () => {
  };


  const [modalVisible, setModalVisible] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;


  const options = [
    {
      title: 'Theo tên',
      icon: 'shopping-cart',
      action: () => console.log('Theo tên')
    },
    {
      title: 'Theo giá',
      icon: 'shopping-cart',
      action: () => console.log('Thao gia')
    },
    {
      title: 'Theo đánh giá',
      icon: 'shopping-cart',
      action: () => console.log("theo danh gia")
    },
    {
      title: 'Theo từ thấp đến cao',
      icon: 'shopping-cart',
      action: () => console.log("Theo thu tu")
    },

  ];

  function resizeBox(to) {
    to === 1 && setModalVisible(true);
    Animated.timing(scale, {
      toValue: to,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start(() => to === 0 && setModalVisible(false));
  }



  function ListItemSuggest({ item }: { item: ProductModel }) {
    const imagesArray = JSON.parse(item.images);
    return (
      <TouchableScale onPress={() => console.log("da chon 1 item", item.id)} activeScale={0.9} friction={9} tension={100}>
        <View style={styles.suggestItem}>
          <View style={styles.viewSuggestImage}>
            {/* <Image
              source={{ uri: item.images[0] }}
              style={{ width: '70%', height: '90%' }}
            /> */}
            {imagesArray.length > 0 ? (
              <Image
                source={{ uri: imagesArray[0] }}
                style={{ width: '70%', height: '90%' }}
              />
            ) : (
              <Text>No Image Available</Text>
            )}


          </View>
          <View style={{ flex: 0.5 }} />

          <Image style={{ width: 30, height: 35, position: 'absolute', left: 16, bottom: 75 }}
            source={require('../../../assets/images/hot2.png')}
          />
          <View style={styles.viewSuggestText}>
            <Text numberOfLines={1} style={styles.suggestTextName}>{item.name}</Text>
            <Text style={styles.text}>{item.price}<Text style={{ textDecorationLine: 'underline', color: 'red' }}>đ</Text></Text>
            <View style={styles.viewStar}>
              <Image
                style={styles.imgStar}
                source={require('../../../assets/images/star4.png')}
              />
              <Text style={styles.text}>4.9</Text>
              <Text style={styles.textCmt}>(50)</Text>
            </View>
          </View>
        </View>
      </TouchableScale>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
      <View>
        <BaseHeader
          title={route.params!.name}
          onCartPress={handleCartPress}
          onBackPress={handleBackPress}
        />
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.mainContainer}>
          <TouchableWithoutFeedback onPress={() => console.log('code chuyen man')}>
            <View style={styles.inputContainer}>
              <View style={{ flex: 1.5, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ width: 20, height: 20 }} source={require('../../../assets/images/search.png')} />
              </View>
              <View style={{ flex: 9, height: '100%', justifyContent: 'center' }}>
                <Text style={styles.title}>Search...</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.buttonContainer}>
            <BaseButton
              onPress={() => resizeBox(1)}
              renderIcon={<Image style={{ width: 25, height: 25 }} source={require('../../../assets/images/filter.png')} />}
              style={{ backgroundColor: 'white', marginBottom: 8 }}
            />
          </View>

          <View>
            <Modal
              transparent={true}
              visible={modalVisible}>
              <SafeAreaView style={{ flex: 1 }} >
                {/* onTouchStart={() => resizeBox(0)} */}
                <Animated.View style={[styles.popup,
                {
                  opacity: scale.interpolate({ inputRange: [0, 1], outputRange: [0, 1] })
                },
                {
                  transform: [{ scale }]
                }
                ]}>
                  {options.map((op, i) => (
                    <View style={{ borderWidth: 1 }}>
                      <TouchableOpacity style={[styles.option, { borderBottomWidth: i === options.length - 1 ? 0 : 1 }]} key={i} onPress={op.action}>
                        <Text>{op.title}</Text>
                        <Icon name={op.icon} size={26} style={{ marginLeft: 10 }} />

                      </TouchableOpacity>
                    </View>


                  ))}

                  <TouchableOpacity onPress={() => resizeBox(0)}>
                    <Text>Luu</Text>
                  </TouchableOpacity>

                </Animated.View>

              </SafeAreaView>
            </Modal>
          </View>


        </View>



        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          numColumns={2}
          horizontal={false}
          scrollEnabled={false}
          contentContainerStyle={styles.flatListSuggestContainer}
          renderItem={({ item }) => <ListItemSuggest item={item} />}
        />




      </View>


    </SafeAreaView>
  )

}

export default React.memo(ProductListScreen);


