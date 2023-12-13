import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MenuStackParam} from '@src/navigations/AppNavigation/stackParam';
import {GuestStackParam} from '@src/navigations/GuestNavigation/stackParam';
import {APP_NAVIGATION, GUEST_NAVIGATION, MENU_NAVIGATION} from '@src/navigations/routes';
import React, {useState} from 'react';
import {Modal, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import R from '@src/res';
import {BaseButton, BaseIcon, BaseImage, BaseText} from '@src/containers/components/Base';
import {useAuth} from '@src/hooks/useAuth';
import {navigateToPage, resetStack} from '@src/navigations/services';
import {hs, ms, vs} from '@src/styles/scalingUtils';
import {Colors} from '@src/styles/colors';
import {useAppDispatch} from '@src/stores';
import {logOutAction} from '@src/stores/auth/auth.actions';
import {images} from '@src/res/images';
interface Props {
  navigation: ScreenNavigationProps;
  route: RouteProp<GuestStackParam, MENU_NAVIGATION.ACCOUNT>;
}

type ScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<MenuStackParam, MENU_NAVIGATION.ACCOUNT>,
  NativeStackNavigationProp<GuestStackParam>
>;

interface IMenu {
  name: string;
  navigate: string;
  image: number;
}

const listMenu: IMenu[] = [
  {
    name: 'Hồ sơ của tôi',
    navigate: APP_NAVIGATION.MY_ACCOUNT,
    image: images.user,
  },
  {
    name: 'Đổi mật khẩu',
    navigate: APP_NAVIGATION.CHANGE_PASS,
    image: images.changepass,
  },
  {
    name: 'Địa chỉ',
    navigate: APP_NAVIGATION.ADDRESS,
    image: images.location,
  },
  {
    name: 'Lịch sử mua hàng',
    navigate: APP_NAVIGATION.HISTORYORDER,
    image: images.history,
  },
  {
    name: 'Trung tâm hỗ trợ',
    navigate: '',
    image: images.support,
  },
];

const AccountScreen = (props: Props) => {
  const {user} = useAuth();
  const distchpatch = useAppDispatch();
  console.log('user: ', user);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const renderMenu = (item: IMenu, index: number) => {
    return (
      <TouchableOpacity
        style={styles.itemMenu}
        onPress={() => {
          if (index === listMenu.length - 1) {
            onShow();
            return;
          }
          if (user) {
            navigateToPage(item.navigate);
          } else {
            navigateToPage(GUEST_NAVIGATION.LOGIN, {name_screen: MENU_NAVIGATION.ACCOUNT});
          }
        }}
        key={index}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, columnGap: hs(12)}}>
          <BaseImage image={item.image} width={hs(30)} height={vs(30)} />
          <BaseText text={item.name} style={styles.menuName} />
        </View>
        {index !== listMenu.length - 1 && <BaseIcon name="chevron-forward" />}
      </TouchableOpacity>
    );
  };

  const handleLogout = () => {
    // @ts-ignore
    distchpatch(logOutAction(true));
    resetStack(APP_NAVIGATION.ROOT);
  };

  const onHide = (): void => {
    setIsVisible(false);
  };

  const onShow = (): void => {
    setIsVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BaseImage image={user ? {uri: user?.avatar} : images.avataEmpty} imageStyle={styles.avatar} resizeMode="cover" />
      <BaseText fullText={user?.name || ''} style={styles.name} />
      {listMenu.map(renderMenu)}
      {user && (
        <TouchableOpacity onPress={handleLogout} style={styles.btnLogout}>
          <BaseText fullText={'Đăng xuất'} style={styles.textLogout} />
          <BaseIcon name="log-out-outline" color={Colors.white} size={ms(25)} />
        </TouchableOpacity>
      )}

      <Modal visible={isVisible} onRequestClose={onHide} transparent animationType="fade">
        <TouchableOpacity onPress={onHide} style={styles.modalWrap}>
          <View style={styles.modalInner}>
            <BaseText fullText={'Trung tâm hỗ trợ'} style={styles.menuName} />
            <BaseText
              fullText={'Mọi thắc mắc liên hệ trung tâm hỗ trợ. Xin cảm ơn!'}
              style={[styles.menuName, {textAlign: 'center'}]}
            />

            <BaseButton text="OK" onPress={onHide} width={hs(150)} />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default React.memo(AccountScreen);
