import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParam, MenuStackParam} from '@src/navigations/AppNavigation/stackParam';
import {APP_NAVIGATION, MENU_NAVIGATION} from '@src/navigations/routes';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';

import styles from './styles';
import {BaseButton} from '@src/containers/components/Base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BaseLoading} from '@src/containers/components/Base/BaseLoading';
import {navigateToPage} from '@src/navigations/services';
import TouchableScale from 'react-native-touchable-scale';

type ScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<MenuStackParam, MENU_NAVIGATION.FAVORITE>,
  NativeStackNavigationProp<AppStackParam>
>;

interface Props {
  navigation: ScreenNavigationProps;
  route: RouteProp<MenuStackParam, MENU_NAVIGATION.FAVORITE>;
}

const FavoriteScreen = (props: Props) => {
  const [data, setData] = useState<Favorites[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  type Favorites = {
    id: string;
    name: string;
    image: string;
  };
  useEffect(() => {
    // Chỉ kích hoạt làm mới nếu refreshing đã được đặt thành true
    setLoading(false);
    if (refreshing) {
      fetchData()
        .then(() => setRefreshing(false))
        .catch(() => setRefreshing(false));
    } else {
      fetchData();
    }
  }, [refreshing]); // Sử dụng mảng phụ thuộc để chỉ kích hoạt khi refreshing thay đổi

  const onRefresh = () => {
    setRefreshing(true);
    fetchData()
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://6399d10b16b0fdad774a46a6.mockapi.io/booCar');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      setError('err');
      setLoading(false);
    }
  };

  const goToDetails = () => {
    navigateToPage(APP_NAVIGATION.DETAILSPRODUCT);
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', paddingBottom: 80}}>
      <View style={styles.titleContainer}>
        <View style={styles.textTitle}>
          <View style={{flex: 9, height: '100%', justifyContent: 'center'}}>
            <Text style={styles.title}>Yêu thích</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <BaseButton
            onPress={() => console.log('Press')}
            renderIcon={<Icon name="shopping-cart" size={30} color="black" />}
            style={{backgroundColor: 'white', marginBottom: 8}}
          />
        </View>
      </View>
      <View style={{width: '100%', borderBottomWidth: 1, borderColor: '#DDDDDD'}}></View>

      {loading ? (
        <BaseLoading size={20} top={100} loading={true} />
      ) : (
        <ScrollView
          indicatorStyle="black"
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={{width: '100%', marginTop: 14, marginBottom: 5}}>
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              horizontal={true}
              contentContainerStyle={styles.flatListContainer}
              renderItem={({item}) => (
                <View style={{width: '100%'}}>
                  <TouchableScale
                    onPress={() => {
                      goToDetails();
                      console.log('code Xem chi tiet data: ', item.name);
                    }}
                    activeScale={0.95}
                    friction={9}
                    tension={100}>
                    <View style={styles.item}>
                      <View style={styles.imageContainer}>
                        <Image source={{uri: item.image}} style={styles.image} resizeMode="stretch" />

                        <View style={styles.overlay}>
                          <View style={{alignItems: 'flex-end', justifyContent: 'center'}}>
                            <TouchableOpacity onPress={() => console.log('code logic button tymm <3')}>
                              <Image
                                style={styles.imgFavourite}
                                source={require('../../assets/images/favourite.png')}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flex: 1.5,
                          marginHorizontal: 15,
                        }}>
                        <View style={{flex: 1, justifyContent: 'center', marginBottom: 8}}>
                          <Text numberOfLines={1} style={styles.text}>
                            {item.name}
                          </Text>
                        </View>

                        <View style={styles.viewStar}>
                          <Image style={styles.imgStar} source={require('../../assets/images/star4.png')} />
                          <Text style={styles.text}>4.9</Text>
                          <Text style={styles.textCmt}>(50)</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableScale>
                </View>
              )}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>
      )}
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