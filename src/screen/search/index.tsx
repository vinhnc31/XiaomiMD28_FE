import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParam } from '@src/navigations/AppNavigation/stackParam';
import { APP_NAVIGATION } from '@src/navigations/routes';
import ProductService from '@src/services/product';
import { ProductModel } from '@src/services/product/product.model';
import React, { useEffect, useRef, useState } from 'react';
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

import styles from './style';
import TouchableScale from 'react-native-touchable-scale';
import { useDebounce } from 'use-debounce';

interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.CATEGORY>;
}

const SearchScreen = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<ProductModel[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<ProductModel | null>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const [value] = useDebounce(searchQuery, 2000);


  const config = {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 9,
  };


  const handleBackPress = () => {
    goBack();
  };

  const fetchData = async (query: string) => {
    try {
      setLoading(true);

      if (query.trim() !== '') {
        const productService = new ProductService();
        const result = await productService.getSearch(query);
        setSuggestions(result.data.slice(0, 10));
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchResults = async (query: string) => {
    try {
      setLoading(true);

      if (query.trim() !== '') {
        const productService = new ProductService();
        const result = await productService.getSearch(query);
        setSearchResults(result.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setShowSuggestions(false);
      setLoading(false);
      setSuggestions([])
    }
  };

  // useEffect(() => {
  //  fetchData(value);
  // }, [value]);

  const handleSuggestionPress = (item: ProductModel) => {
    console.log('item:', item.name);
    setSelectedSuggestion(item);
    setSearchQuery(item.name);
    fetchSearchResults(item.name);
  };

  function ListItemSuggest({ item }: { item: ProductModel }) {
    return (
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
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Image style={styles.backIcon} source={R.images.iconBack} />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <BaseInput
            leftIcon={'search-outline'}
            title="Search"
            value={searchQuery} x
            onChangeText={(text) => {
              setSearchResults([]);
              setSelectedSuggestion(null);
              setSearchQuery(text);

              fetchData(text);
            }}
            onSubmitEditing={event => {
              setSelectedSuggestion(null);

              if (selectedSuggestion?.name?.trim()) {
                console.log('event', event.nativeEvent.text);
                fetchSearchResults(selectedSuggestion.name);
                return;
              }
              fetchSearchResults(event.nativeEvent.text)
            }}
            borderRadius={10}
            style={styles.searchInput}
            autoCompleteType={true}
          />
        </View>
      </View>

      <View style={{ flex: 9, padding: 8}}>
        {loading && <ActivityIndicator size="large" />}
        {!loading && suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSuggestionPress(item)}>
                <Text style={styles.suggestionText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}

        {!loading && searchResults.length > 0 && (
          <FlatList
            data={searchResults}
            keyExtractor={item => item.id.toString()}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            numColumns={2}
            horizontal={false}
            // scrollEnabled={false}
            contentContainerStyle={styles.flatListSuggestContainer}
            renderItem={({ item }) => <ListItemSuggest key={item.id} item={item} />}
          />
        )}

      </View>
    </SafeAreaView>
  );
};

export default React.memo(SearchScreen);
