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
import {HistoryOrderModel} from '@src/services/historyOrder/history.model';
import HistoryOrderService from '@src/services/historyOrder';

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
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const {user} = useAuth();
  const AccountId = user?.id;
  const [dataOrder, setDataOrder] = useState<HistoryOrderModel[]>([]);
  const historyOrder = new HistoryOrderService();
  const [item, setDataNoti] = useState();
  useEffect(() => {
    fetchDataNotification();
    fetchDataOrder();
  }, [user]);
  const fetchDataNotification = async () => {
    try {
      setLoading(true);
      const notificationService = new NotificationService();
      const result = await notificationService.getNotification(AccountId);
      setData(result.data);
      setLoading(false);
    } catch (error) {
      setError('err');
      setLoading(false);
    }
  };
  const fetchDataOrder = async () => {
    try {
      setLoading(true);
      const data = [].concat(
        (await historyOrder.getOrder(Number(user?.id), '0')).data,
        (await historyOrder.getOrder(Number(user?.id), '1')).data,
        (await historyOrder.getOrder(Number(user?.id), '2')).data,
        (await historyOrder.getOrder(Number(user?.id), '3')).data,
      );

      setDataOrder(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const test = (id: number) => {
    for (let i = 0; i < dataOrder.length; i++) {
      if (dataOrder[i].id === id) {
        setDataNoti(dataOrder[i]);
        if (item) {
          navigateToPage(APP_NAVIGATION.ORDERDETAIL, {item});
        }
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDataNotification();
    await fetchDataOrder();
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
    if (data?.length === 0) {
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
              onPress={() => {
                test(item?.OrderId);
              }}
              activeScale={1}
              friction={9}
              tension={100}
              style={styles.btnContainer}>
              <View style={styles.viewItemNotification}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    width: vs(100),
                    height: vs(100),
                    backgroundColor: '#F1F1F1',
                  }}>
                  {item?.imageVoucher ? (
                    <Image source={{uri: item?.imageVoucher}} style={styles.imgNotification} />
                  ) : (
                    <>
                      {dataOrder.map(order => {
                        if (order.id === item.OrderId) {
                          const productColor = order.OrdersProducts[0]?.productcolor;
                          const imageSource = productColor?.image
                            ? {uri: productColor.image}
                            : {uri: order.OrdersProducts[0]['Product']['images']};

                          return <Image key={order.id} source={imageSource} style={styles.imgNotification} />;
                        }
                      })}
                    </>
                  )}
                </View>
                <View style={styles.viewTextNotification}>
                  <Text style={styles.textContentNotification}>{item?.content}</Text>
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
