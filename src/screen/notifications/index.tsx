import React, {useEffect, useState} from 'react';

import {
  Text,
  SafeAreaView,
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Modal,
  TextInput,
  RefreshControl,
} from 'react-native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParam, MenuStackParam} from '@src/navigations/AppNavigation/stackParam';
import {MENU_NAVIGATION, APP_NAVIGATION, GUEST_NAVIGATION} from '@src/navigations/routes';
import {navigateToPage, goBack} from '@src/navigations/services';
import {NotificationModel} from '@src/services/notification/notification.model';
import {useAuth} from '@src/hooks/useAuth';
import NotificationService from '@src/services/notification';
import TouchableScale from 'react-native-touchable-scale';
import styles from './styles';
import {BaseLoading} from '@src/containers/components/Base';
import {ms, vs, hs} from '@src/styles/scalingUtils';

export type ScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<MenuStackParam, MENU_NAVIGATION.NOTIFICATIONS>,
  NativeStackNavigationProp<AppStackParam>
>;

interface Props {
  navigation: ScreenNavigationProps;
  route: RouteProp<MenuStackParam, MENU_NAVIGATION.NOTIFICATIONS>;
}

const NotificationScreen = (props: Props) => {
  const [data, setData] = useState<NotificationModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const {user} = useAuth();
  const AccountId = user?.id;
  useEffect(() => {
    fetchDataNotification();
    console.log('eff: ', data);
  }, []);
  const fetchDataNotification = async () => {
    try {
      setLoading(true);
      const notificationService = new NotificationService();
      const result = await notificationService.getNotification(AccountId);
      // console.log(result.data);
      setData(result.data);
      setLoading(false);
    } catch (error) {
      setError('err');
      setLoading(false);
    }
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDataNotification();
    setRefreshing(false);
  };
  const renderNoDataMessage = () => {
    if (loading) {
      return (
        <View style={styles.LoadingContainer}>
          <BaseLoading size={60} top={250} loading={true} />
        </View>
      );
    }
    if (data.length === 0) {
      return (
        <View style={styles.noDataContainer}>
          <Image style={{width: hs(120), height: hs(120)}} source={require('../../assets/images/noDataStar.png')} />
          <Text style={styles.noDataText}>Không có thông báo</Text>
        </View>
      );
    }
    return null;
  };
  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column', backgroundColor: '#F8F8F8'}}>
      <>
        <View style={styles.headerContainer}>
          <View style={{flex: 8, alignItems: 'flex-start', justifyContent: 'center'}}>
            <Text numberOfLines={1} style={styles.headerTitle}>
              Thông báo
            </Text>
          </View>
        </View>
        <View style={{borderColor: '#A7A7A7', borderWidth: 0.8}} />
      </>
      {renderNoDataMessage()}
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={true}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({item, index}) => (
          <View>
            <TouchableScale
              key={index}
              onPress={() => console.log('click---', data)}
              activeScale={1}
              friction={9}
              tension={100}
              style={{height: vs(125), justifyContent: 'center', alignItems: 'center'}}>
              <View style={styles.viewItemNotification}>
                <View style={{flex: 2}}>
                  <Image source={require('../../assets/images/demo.jpg')} style={styles.imgNotification} />
                </View>

                <View style={styles.viewTextNotification}>
                  <Text numberOfLines={4} style={styles.textContentNotification}>
                    {item?.content}
                  </Text>
                </View>
              </View>
            </TouchableScale>
          </View>
        )}
      />
    </SafeAreaView>
  );
  

 
};

export default React.memo(NotificationScreen);

