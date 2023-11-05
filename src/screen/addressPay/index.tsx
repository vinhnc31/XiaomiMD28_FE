import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BaseHeaderNoCart from "@src/containers/components/Base/BaseHeaderNoCart";
import { AppStackParam } from "@src/navigations/AppNavigation/stackParam";
import { APP_NAVIGATION } from "@src/navigations/routes";
import { goBack } from "@src/navigations/services";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView, View } from "react-native";

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
  };
  const AddressPayScreen = (props: Props) => {
    const [data1, setData] = useState<AddRess[]>([]);
    return(
        <SafeAreaView style={{flex:1,backgroundColor: 'white', flexDirection: 'column'}}>
            <BaseHeaderNoCart title="Địa chỉ nhận hàng" onBackPress={goBack} />
            <FlatList
            data={data1}
            keyExtractor={item => item.id}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
                <View>
                    
                </View>
            )}
            />
        </SafeAreaView>
    );
  }
  export default React.memo(AddressPayScreen);