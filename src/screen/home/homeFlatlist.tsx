import { Dimensions, Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import TouchableScale from "react-native-touchable-scale";
import { navigateToPage } from "@src/navigations/services";
import styles from "./styles";
import React from "react";
import R from "@src/res";
import { ProductModel } from "@src/services/product/product.model";

export type Movie = {
  id: string;
  name: string;
  image: string;
  price: string;
};

const config = {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 9,
};


const numColumns = 2; // Số cột bạn muốn hiển thị

//goi y
export function ListItemSuggest({ item }: { item: ProductModel }) {
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
            <Text style={styles.text}>4.9</Text>
            <Text style={styles.textCmt}>(50)</Text>
          </View>
        </View>
      </View>
    </TouchableScale>
  );
}

export function ListItemCategory({ item }: { item: Movie }) {
  return (
    <TouchableScale onPress={() => console.log("da chon 1 item", item.id)} activeScale={0.9} friction={9} tension={100}>
      <View style={styles.categoryItem}>
        <View style={styles.viewCategoryImage}>
          <Image
            source={{ uri: item.image }}
            style={styles.categoryImage}
          />
        </View>
        <View style={styles.viewCategoryText}>
          <Text numberOfLines={2} style={styles.viewCategoryTextName}>{item.name}</Text>
        </View>
      </View>
    </TouchableScale>

  )
}


export function ListItemFavorite({ item }: { item: Movie }) {
  return (
    <TouchableWithoutFeedback onPress={() => console.log("code Xem chi tiet data: ", item.name)}>
      <View style={styles.item}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="stretch" />
        <View style={styles.overlay}>
          <View style={{ flex: 2.5, alignItems: 'flex-end', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => console.log("code logic button tymm <3")}>
              <Image
                style={styles.imgFavourite}
                source={require('../../assets/images/favourite.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 4 }}></View>
          <View style={{ flex: 1.5, justifyContent: 'center', paddingHorizontal: 12 }}>
            <Text numberOfLines={1} style={styles.text}>{item.name}</Text>
          </View>
          <View style={{ flex: 1.5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12 }}>
            <View style={styles.viewStar}>
              <Image
                style={styles.imgStar}
                source={require('../../assets/images/star4.png')}
              />
              <Text style={styles.text}>4.9</Text>
              <Text style={styles.textCmt}>(50)</Text>
            </View>
            <Text style={styles.text}>{item.price}<Text style={{ textDecorationLine: 'underline', color: 'red' }}>đ</Text></Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}