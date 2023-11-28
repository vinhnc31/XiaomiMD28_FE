import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParam } from '@src/navigations/AppNavigation/stackParam';
import { APP_NAVIGATION } from '@src/navigations/routes';
import ProductService from '@src/services/product';
import { ProductModel } from '@src/services/product/product.model';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import R from '@src/res';
import { goBack } from '@src/navigations/services';
import { vs } from '@src/styles/scalingUtils';
import BaseInput from '@src/containers/components/Base/BaseInput';

import Autocomplete from 'react-native-autocomplete-input';
import styles from './style';

interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.CATEGORY>;
}

const SearchScreen = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  const handleBackPress = () => {
    goBack();
  };


  const fetchData = async (query: string) => {
    try {
      setLoading(true);

      // Kiểm tra xem query có giá trị không
      if (query.trim() !== '') {
        const productService = new ProductService();
        const result = await productService.getSearch(query);
        setSearchResults(result.data);
      } else {
        // Nếu không có giá trị, đặt searchResults về mảng rỗng
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };


  // useEffect để theo dõi sự thay đổi của searchQuery và gọi fetchData
  useEffect(() => {
    if (searchQuery.trim() !== '') {
      fetchData(searchQuery);
    } else {
      // Nếu không có giá trị, đặt searchResults về mảng rỗng
      setSearchResults([]);
    }
  }, [searchQuery]);


  const handleSearch = () => {
    fetchData(searchQuery);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#FF6900', }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={handleBackPress} style={{ marginLeft: 8 }}>
            <Image style={{ width: vs(28), height: vs(28) }} source={R.images.iconBack} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 9, alignItems: 'center', justifyContent: 'center', }}>
          <BaseInput
            leftIcon={'search-outline'}
            title="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch} // Xử lý sự kiện khi người dùng ấn Enter
            borderRadius={10}
            style={{ width: '95%', height: 40, marginRight: 4 }}
          />
      </View>
        
      </View>

      <View style={{ flex: 9, backgroundColor: 'yellow' }}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSearchQuery(item.name)}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}

      </View>

    </SafeAreaView>

    
  );
}

export default React.memo(SearchScreen);
