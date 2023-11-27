import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import BaseHeaderNoCart from '@src/containers/components/Base/BaseHeaderNoCart';
import {AppStackParam} from '@src/navigations/AppNavigation/stackParam';
import {APP_NAVIGATION} from '@src/navigations/routes';
import {goBack} from '@src/navigations/services';
import React, {useEffect, useState} from 'react';
import {
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
import { BaseButton, BaseLoading } from '@src/containers/components/Base';
interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.ADDRESS>;
}
type AddRess = {
  id: string;
  name: string;
  phone: string;
  note: number;
  address: string;
  check: boolean;
};
const AddressPayScreen = (props: Props) => {
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [data1, setData] = useState<AddRess[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://655c63b225b76d9884fd1f63.mockapi.io/address');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleRadioButtonPress = async (addressId) => {
    try {
      // Fetch all addresses
      const allAddressesResponse = await fetch('https://655c63b225b76d9884fd1f63.mockapi.io/address');
      const allAddresses = await allAddressesResponse.json();
      // Find the selected address
      const selectedAddress = allAddresses.find((address) => address.id === addressId);
  
      if (selectedAddress) {
        // Update the selected address with check = true
        await fetch(`https://655c63b225b76d9884fd1f63.mockapi.io/address/${addressId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            check: true,
          }),
        });
        const updatePromises = allAddresses
          .filter((address) => address.id !== addressId)
          .map((address) => {
            return fetch(`https://655c63b225b76d9884fd1f63.mockapi.io/address/${address.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                check: false,
              }),
            });
          });
  
        await Promise.all(updatePromises);
        setData((prevData) =>
          prevData.map((address) =>
            address.id === addressId ? { ...address, check: true } : { ...address, check: false }
          )
        );
      } else {
        console.error('Address not found');
      }
    } catch (error) {
      console.error('Error updating addresses:', error);
    }
    setTimeout(() => {
      goBack();
    }, 1500);
  };
  
  const sortedData = [...data1].sort((a, b) => (b.check ? 1 : -1));
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const ModalContent = () => (
    <View style={styles.modalContent}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Thêm Địa Chỉ</Text>
      <View style={{alignSelf: 'flex-start',width: '100%',marginVertical:10}}>
        <Text style={{fontSize: 16}}>Tên người nhận</Text>
        <TextInput
          placeholder="Tên người nhận"
          style={{
            borderWidth: 0.5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 10,
            marginVertical: 10,
            width: '100%',
          }}></TextInput>
      </View>
      <View style={{alignSelf: 'flex-start',width: '100%'}}>
        <Text style={{fontSize: 16}}>Số điện thoại</Text>
        <TextInput
          placeholder="Số điện thoại"
          style={{
            borderWidth: 0.5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 10,
            marginVertical: 10,
            width: '100%',
          }}></TextInput>
      </View>
      <View style={{alignSelf: 'flex-start',width: '100%'}}>
        <Text style={{fontSize: 16}}>Ghi chú</Text>
        <TextInput
          placeholder="Ghi chú"
          style={{
            borderWidth: 0.5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 10,
            marginVertical: 10,
            width: '100%',
          }}></TextInput>
      </View>
      <View style={{alignSelf: 'flex-start',width: '100%'}}>
        <Text style={{fontSize: 16}}>Địa chỉ</Text>
        <TextInput
          placeholder="Địa chỉ"
          style={{
            borderWidth: 0.5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 10,
            marginVertical: 10,
            width: '100%',
          }}></TextInput>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between', width:"90%"}}>
        <BaseButton text='Hủy' width={70} height={40} backgroundColor='#B7B7B7' onPress={()=>closeModal()}/>
        <BaseButton text='Xác nhận' width={120} height={40}/>
      </View>
    </View>
  );
  return (
    
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', flexDirection: 'column'}}>
      <BaseHeaderNoCart title="Địa chỉ nhận hàng" onBackPress={goBack} />
      {loading ? (
          <BaseLoading size={20} top={100} loading={true} />
        ) : data1.length === 0 ? (
          <View style={styles.flatListContainer}>
            <View style={{alignItems:'center',marginTop:100}}>
              <Image
                source={require('../../assets/images/group84.png')}
                style={{width: 170, height: 170}}></Image>
            </View>
          </View>
        ) : (
      <ScrollView indicatorStyle="black" showsVerticalScrollIndicator={false}>
        <FlatList
          data={sortedData}
          keyExtractor={item => item.id}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => {handleRadioButtonPress(item.id);}}>
              <View style={styles.viewItem}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                  <CustomRadioButton selected={item.check} />
                  <View style={styles.item}>
                    <View style={styles.container}>
                      <View>
                        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                          <Text style={styles.textName}>{item.name}</Text>
                          <View style={{height: 20, width: 1, backgroundColor: 'grey', marginHorizontal: 10}}></View>
                          <Text style={styles.textPhone}>{item.phone}</Text>
                        </View>
                        <Text style={styles.textAddress}>Ghi chú: {item.note}</Text>
                        <Text style={styles.textAddress}>Địa chỉ: {item.address}</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={{margin: 10}}>
                      <Text style={{color: '#FF6900'}}>Sửa</Text>
                    </TouchableOpacity>
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
              <ModalContent />
            </View>
          </View>
      </Modal>
    </SafeAreaView>
  );
};
export default React.memo(AddressPayScreen);
