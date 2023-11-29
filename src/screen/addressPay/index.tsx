import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import BaseHeaderNoCart from '@src/containers/components/Base/BaseHeaderNoCart';
import {AppStackParam} from '@src/navigations/AppNavigation/stackParam';
import {APP_NAVIGATION} from '@src/navigations/routes';
import {goBack} from '@src/navigations/services';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {SafeAreaView, View} from 'react-native';
import styles from './styles';
import CustomRadioButton from '@src/containers/components/Base/BaseRadioButton';
import {BaseButton, BaseLoading} from '@src/containers/components/Base';
import AddressService from '@src/services/address';
import {useAuth} from '@src/hooks/useAuth';
import {AddressModel} from '@src/services/address/address.model';
import BaseTextInput from '@src/containers/components/Base/BaseTextInput';
import useToast from '@src/hooks/useToast';
interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.ADDRESS>;
}
const AddressPayScreen = (props: Props) => {
  const {user} = useAuth();
  const toast = useToast();
  const [data, setData] = useState<AddressModel[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [idItem, setIdItem] = useState<number>();
  const [phone, setPhone] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [addressError, setAddressError] = useState<string>('');
  const [selectedAddress, setSelectedAddress] = useState<AddressModel | null>(null);
  const addressService = new AddressService();
  const handleDeleteItem = (itemId:number) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa địa chỉ này không?',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Hủy xóa'),
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: async () => {
            try {
              const result = await addressService.deleteAddress(itemId);
              fetchData();
              toast.showSuccess({messageText: 'Xóa địa chỉ thành công'});
              closeModal();
            } catch (error) {
              console.error('Error deleting item from AsyncStorage', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await addressService.fetchAddress(user?.id!);
      setData(result.data);
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (addressData: AddressModel, id: number) => {
    if (addressData) {
      setSelectedAddress(addressData);
      setName(addressData.nameReceiver);
      setPhone(addressData.phoneReceiver);
      setNote(addressData.note);
      setAddress(addressData.address);
      setIdItem(addressData.id);
    }
    setModalVisible(true);
  };
  const closeModal = () => {
    setPhone('');
    setName('');
    setNote('');
    setAddress('');
    setModalVisible(false);
    setNameError('');
    setAddressError('');
    setPhoneError('');
  };
  const isEmpty = value => {
    return value.trim() === '';
  };

  const validateInputs = () => {
    const phoneRegex = /^(0[98753][0-9]{8})$/;
    let valid = true;

    if (isEmpty(name)) {
      setNameError('Tên không thể để trống');
      valid = false;
    } else {
      setNameError('');
    }

    if (isEmpty(phone)) {
      setPhoneError('Số điện thoại không thể để trống');
      valid = false;
    } else if (!phoneRegex.test(phone)) {
      setPhoneError('Số điện thoại không đúng định dạng');
      valid = false;
    } else {
      setPhoneError('');
    }

    if (isEmpty(address)) {
      setAddressError('Địa chỉ không thể để trống');
      valid = false;
    } else {
      setAddressError('');
    }
    return valid;
  };
  const Address = item => {
    props.route.params?.onAddress(item);
    goBack();
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', flexDirection: 'column'}}>
      <BaseHeaderNoCart
        title={props.route.params == undefined ? 'Địa chỉ' : 'Địa chỉ nhận hàng'}
        onBackPress={goBack}
      />
      {loading ? (
        <BaseLoading size={20} top={100} loading={true} />
      ) : (
        <ScrollView indicatorStyle="black" showsVerticalScrollIndicator={false}>
          <FlatList
            data={data}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  props.route.params == undefined ? openModal(item, item.id) : Address(item);
                }}>
                <View style={styles.viewItem}>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                    {props.route.params == undefined ? null : (
                      <CustomRadioButton selected={props.route.params?.addressData?.id == item.id} />
                    )}
                    <View style={styles.item}>
                      <View style={styles.container}>
                        <View>
                          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Text style={styles.textName}>{item.nameReceiver}</Text>
                            <View style={{height: 20, width: 1, backgroundColor: 'grey', marginHorizontal: 10}}></View>
                            <Text style={styles.textPhone}>{item.phoneReceiver}</Text>
                          </View>
                          <Text style={styles.textAddress}>Ghi chú: {item.note}</Text>
                          <Text style={styles.textAddress}>Địa chỉ: {item.address}</Text>
                        </View>
                      </View>
                      {props.route.params == undefined ? (
                        <TouchableOpacity
                          style={{position: 'relative', zIndex: 1, top: -10, right: -5}}
                          onPress={() => {
                            handleDeleteItem(item.id);
                          }}>
                          <Image style={{width: 25, height: 25}} source={require('../../assets/images/close.png')} />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity style={{margin: 10}} onPress={() => openModal(item, item.id)}>
                          <Text style={{color: '#FF6900'}}>Sửa</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={{alignItems: 'center'}} onPress={() => openModal()}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{width: 30, height: 30, marginRight: 10}}
                source={require('../../assets/images/add(3).png')}
              />
              <Text style={{fontSize: 18, color: 'red'}}>Thêm địa chỉ</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      )}
      <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10}}>
              {selectedAddress ? 'Sửa Địa Chỉ' : 'Thêm Địa Chỉ'}
            </Text>
            <BaseTextInput hintext={'Tên người dùng'} onChangeText={(value: string) => setName(value)} name={name} />
            <Text style={{color: 'red'}}>{nameError}</Text>
            <BaseTextInput hintext={'Số điện thoại'} onChangeText={(value: string) => setPhone(value)} name={phone} />
            <Text style={{color: 'red'}}>{phoneError}</Text>
            <BaseTextInput hintext={'Ghi chú'} onChangeText={(value: string) => setNote(value)} name={note} />
            <Text></Text>
            <BaseTextInput hintext={'Địa chỉ'} onChangeText={(value: string) => setAddress(value)} name={address} />
            <Text style={{color: 'red'}}>{addressError}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center'}}>
              <BaseButton text="Hủy" width={70} height={40} backgroundColor="#B7B7B7" onPress={() => closeModal()} />
              <BaseButton
                text="Xác nhận"
                width={120}
                height={40}
                onPress={async () => {
                  if (validateInputs()) {
                    if (selectedAddress) {
                      await addressService.putAddress(idItem!, {
                        nameReceiver: name,
                        phoneReceiver: phone,
                        note: note,
                        address: address,
                        AccountId: user?.id!,
                      });
                    } else {
                      await addressService.postAddress({
                        nameReceiver: name,
                        phoneReceiver: phone,
                        note: note,
                        address: address,
                        AccountId: user?.id!,
                      });
                      toast.showSuccess({messageText: 'Thêm địa chỉ thành công'});
                    }
                    fetchData();
                    closeModal();
                  }
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default React.memo(AddressPayScreen);
