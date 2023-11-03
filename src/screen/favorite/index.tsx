import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParam, MenuStackParam } from '@src/navigations/AppNavigation/stackParam';
import { APP_NAVIGATION, MENU_NAVIGATION } from '@src/navigations/routes';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<MenuStackParam, MENU_NAVIGATION.FAVORITE>,
  NativeStackNavigationProp<AppStackParam>
>;

interface Props {
  navigation: ScreenNavigationProps;
  route: RouteProp<MenuStackParam, MENU_NAVIGATION.FAVORITE>;
}

const FavoriteScreen = (props: Props) => {

  const [products, setProducts] = useState([
    { id: '1', name: 'Sản phẩm 1' },
    { id: '2', name: 'Sản phẩm 2' },
    { id: '3', name: 'Sản phẩm 3' },
    // Thêm sản phẩm khác tại đây...
  ]);

  const [likedProducts, setLikedProducts] = useState([]);

  const toggleLike = (productId) => {
    if (likedProducts.includes(productId)) {
      console.log("toggle like: ", productId);
      setLikedProducts(likedProducts.filter(id => id !== productId));
    } else {
      setLikedProducts([...likedProducts, productId]);
    }
   
  };

  const renderItem = ({ item }) => {
    const isLiked = likedProducts.includes(item.id);

    console.log("render", isLiked);
    return (
      <View style={styles.productContainer}>
        <Text>{item.name}</Text>
        <TouchableOpacity
          onPress={() => toggleLike(item.id)}
          style={[
            styles.likeButton,
            { backgroundColor: isLiked ? 'red' : 'grey' },
          ]}
        >
          <Text style={styles.likeButtonText}>Tym</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default React.memo(FavoriteScreen);

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  likeButton: {
    padding: 8,
    borderRadius: 5,
  },
  likeButtonText: {
    color: 'white',
  },
});