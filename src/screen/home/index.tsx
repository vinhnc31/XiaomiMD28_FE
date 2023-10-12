/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { RouteProp } from '@react-navigation/native';
import styles from './styles';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MenuStackParam } from '@src/navigations/AppNavigation/stackParam';
import { MENU_NAVIGATION } from '@src/navigations/routes';
import React, { useState } from 'react';
import { SafeAreaView, Text, ScrollView, View, TouchableOpacity, Image, TouchableWithoutFeedback, FlatList } from 'react-native';
import BaseInput from '@src/containers/components/Base/BaseInput';
import { BaseButton } from '@src/containers/components/Base';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  navigation: BottomTabNavigationProp<MenuStackParam>;
  route: RouteProp<MenuStackParam, MENU_NAVIGATION.HOME>;
}

const HomeScreen = (props: Props) => {

  const data = [
    { id: '1', name: 'Category 1', image: require('../../assets/images/demo.jpg') },
    { id: '2', name: 'Category 2', image: require('../../assets/images/logo.png') },
    { id: '3', name: 'Category 3', image: require('../../assets/images/logo.png') },
    { id: '4', name: 'Category 4', image: require('../../assets/images/logo.png') },
    { id: '5', name: 'Category 5', image: require('../../assets/images/logo.png') },
    { id: '6', name: 'Category', image: require('../../assets/images/logo.png') },
    { id: '7', name: 'Category 7', image: require('../../assets/images/logo.png') },
    { id: '8', name: 'Category 8', image: require('../../assets/images/logo.png') },
  ];


  const [showAll, setShowAll] = useState(false);
  const displayedData = showAll ? data : data.slice(0, 3);


  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <View style={styles.mainContainer}>
        <TouchableWithoutFeedback onPress={() => console.log("code chuyen man")}>
          <View style={styles.inputContainer}>
            <View style={{ flex: 1.5, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                style={{ width: 20, height: 20 }}
                source={require('../../assets/images/search.png')}
              />
            </View>
            <View style={{ flex: 9, height: '100%', justifyContent: 'center' }}>
              <Text style={styles.title}>Search...</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.buttonContainer}>
          <BaseButton
            onPress={() => console.log('Press')}
            renderIcon={<Icon name="shopping-cart" size={30} color="black" />}
            style={{ backgroundColor: 'white', marginBottom: 8 }}
          />
        </View>
      </View>



      <ScrollView>
        <View style={{ height: 200 }}>
          <View style={{ backgroundColor: 'yellow', width: '100%', height: '100%', borderRadius: 20 }}>
            <Text>Slideshow</Text>
          </View>
        </View>

        <View style={styles.categoryView}>
          <View style={styles.contentWrapper}>
            <Text style={styles.titleText}>Danh mục</Text>
            <TouchableOpacity onPress={() => console.log("clicked")}>
              <View style={styles.viewButton}>
                <Text style={styles.seeMoreText}>Xem thêm</Text>
                <Image
                  style={styles.rightArrowImage}
                  source={require('../../assets/images/right-arrow.png')}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ height: '100%' }}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              horizontal={true}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => console.log("da chon 1 item", item.id)}>
                  <View style={styles.categoryItem}>
                    <View style={styles.viewCategoryImage}>
                      <Image source={item.image} style={styles.categoryImage} />
                    </View>
                    <Text style={styles.viewCategoryTextName}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        <View style={{ width: '100%', paddingHorizontal: 8, marginTop: 16}}>
          <Text style={styles.titleText}>Yêu thích gần nhất</Text>

          <FlatList
            data={displayedData}
            keyExtractor={(item) => item.id}
            horizontal={true}
            contentContainerStyle={styles.flatListContainer}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Image source={item.image} style={styles.image} resizeMode="cover" />
                <View style={styles.overlay}>
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.text}>{item.name}</Text>
                </View>
              </View>
            )}
            scrollEnabled={false}
          />


        </View>

        <View style={{ width: '100%', height: 1000, backgroundColor: '#aaaaaa' }}>
          <Text>Goi y hom nay</Text>
        </View>


      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(HomeScreen);
