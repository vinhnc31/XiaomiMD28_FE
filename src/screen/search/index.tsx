import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParam } from '@src/navigations/AppNavigation/stackParam';
import { APP_NAVIGATION } from '@src/navigations/routes';
import ProductService from '@src/services/product';
import { ProductModel } from '@src/services/product/product.model';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import R from '@src/res';
import { goBack } from '@src/navigations/services';
import { vs } from '@src/styles/scalingUtils';
import BaseInput from '@src/containers/components/Base/BaseInput';
import { BaseLoading } from '@src/containers/components/Base/BaseLoading';

import styles from './style';
import TouchableScale from 'react-native-touchable-scale';

interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.CATEGORY>;
}

export const nonAccentVietnamese = (str: string) => {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
};

const SearchScreen = (props: Props) => {

  const handleBackPress = () => {
    goBack();
  };

  const [products, setProducts] = useState<ProductModel[]>([]);  //chuyen den man get all data
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState<ProductModel[]>([]);  // kq search
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<ProductModel[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<ProductModel | null>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [hasData, setHasData] = useState(true);
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);


  const config = {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 9,
  };

  useEffect(() => {
    fetchDataProduct();
  }, []);

  useEffect(() => {
    fetchSearchResults(search, page);
    console.log("page: " + page);
  }, [page]);

  const fetchDataProduct = async () => {
    try {
      const productService = new ProductService();
      const result = await productService.getProduct();
      setProducts(result.data);
    } catch (error) {
      setError('Lỗi');
    }
  }

  const searchFilterArr = (text) => {
    setIsSearching(true);
    const searchTextWithoutAccent = nonAccentVietnamese(text); // Chuyển đổi sang chuỗi không dấu
    if (searchTextWithoutAccent) {
      const newData = products.filter(function (item) {
        const itemData = nonAccentVietnamese(item.name ? item.name.toUpperCase() : '').toUpperCase();
        return itemData.indexOf(searchTextWithoutAccent.toUpperCase()) > -1;
      });
      setSuggestions(newData.slice(0, 10));
      setHasData(newData.length > 0);
      setSearch(text);
      console.log("Tìm kiếm: ", text);
      // console.log("setFilteredDataSource: ", filteredDataSource.length)
    } else {
      setSearchResults([])
      setSearch(text);
    }
  }



  useEffect(() => {
    if (isSearching && search === "") {
      setSuggestions([]);
      setIsSearching(false);
    }
  }, [search, isSearching]);

  const handleEndReached = () => {
    if (!isLoadingMore && hasMoreData) {
      setPage(page + 1);
      setIsLoadingMore(true);
    }
  };

  const fetchSearchResults = useCallback(async (query: string, nextPage: number = 1) => {
    try {
      if (query !== search) {
        return;
      }

      setIsLoadingMore(true);
      const pageSize = 10;
      const startIndex = (nextPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      console.log('Fetching more results. Page1:', page);
      let filtered = [];

      const queryWithoutAccent = nonAccentVietnamese(query);
      if (queryWithoutAccent && queryWithoutAccent.trim() !== '') {
        filtered = products
          .filter((product) => nonAccentVietnamese(product.name).toLowerCase().includes(queryWithoutAccent.toLowerCase()))
          .slice(startIndex, endIndex);

        setHasMoreData(filtered.length === pageSize);
      }
      if (nextPage === 1) {
        setSearchResults(filtered);
      } else {
        setSearchResults((prevResults) => [...prevResults, ...filtered]);
      }

      setShowSuggestions(false);
      setSuggestions([]);
    } catch (error) {
      // Handle error
    } finally {
      setIsLoadingMore(false);
    }
  }, [products, search]);



  const handleSuggestionPress = useCallback((item: ProductModel) => {
    console.log('Chọn sản phẩm:', item.name);
    setSelectedSuggestion(item);
    setSearch(item.name);
    fetchSearchResults(item.name);
  }, [fetchSearchResults]);

  const renderSuggestionItem = ({ item }: { item: ProductModel }) => (
    <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSuggestionPress(item)}>
      <Text style={styles.suggestionText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderListItemSuggest = ({ item }: { item: ProductModel }) => (
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


  const renderNoData = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={R.images.imgNoResult} style={{ width: 100, height: 100 }} />
      <Text style={{ fontSize: 20, fontFamily: 'LibreBaskerville-Bold', color: 'black' }}>Không có sản phẩm</Text>
    </View>
  );

  const handleSearchSubmit = useCallback(() => {
    setShowSuggestions(false);
    setSuggestions([]);

    // Gọi hàm hiển thị dữ liệu sau khi nhấn Enter sau 2 giây
    setTimeout(() => {
      fetchSearchResults(search);
    }, 1000);
  }, [fetchSearchResults, search]);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Image style={styles.backIcon} source={R.images.iconBack} />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <BaseInput
            leftIcon={'search-outline'}
            title="Tìm kiếm"
            value={search}
            onChangeText={(text) => {
              setPage(1)
              setSearchResults([]);
              setSelectedSuggestion(null);
              setSearch(text);
              text && searchFilterArr(text);
            }}
            onSubmitEditing={handleSearchSubmit}
            borderRadius={10}
            style={styles.searchInput}
            autoCompleteType={true}
          />
        </View>
      </View>

      <View style={{ flex: 9, padding: 8 }}>
        {loading && (
          <View style={{ height: 100 }}>
            <BaseLoading size={30} top={10} loading={true} color={'red'} />
          </View>
        )}
        {!loading && suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderSuggestionItem}
          />
        )}{!loading && searchResults.length > 0 && (
          <FlatList
            data={searchResults}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            numColumns={2}
            horizontal={false}
            contentContainerStyle={styles.flatListSuggestContainer}
            renderItem={renderListItemSuggest}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.1} // Adjust as needed
          />
        )}

        {!hasData && renderNoData()}

        {isLoadingMore && (
          <View style={{ height: 100 }}>
            <BaseLoading size={30} top={0} loading={true} color={'#FF6900'} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default React.memo(SearchScreen);