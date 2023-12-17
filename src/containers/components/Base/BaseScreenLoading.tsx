import { images } from '@src/res/images';
import { Colors } from '@src/styles/colors';
import { DimensionUtils } from '@src/utils/DimensionUtils';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { BaseImage } from './BaseImage';
import CategoryService from '@src/services/category';
import CategoryStore from '@src/containers/store/storeCategory';
import ProductService from '@src/services/product';
import ProductStore from '@src/containers/store/storeProduct';
import FavoriteStore from '@src/containers/store/storeFavorite';
import useBannerStore from '@src/containers/store/bannerStore';
import useProductStore from '@src/containers/store/storeProduct';


export default function BaseScreenLoading() {

  const [error, setError] = useState('');

  const fetchDataCategory = async () => {
    try {
      const categoryService = new CategoryService();
      const result = await categoryService.fetchCategory();
      CategoryStore.setState((state) => ({
        dataCategory: result.data,
      }));
    } catch (error) {
      setError('err');
    }
  };

  const fetchDataProduct = async () => {
    try {
      const productService = new ProductService();
      const result = await productService.getProduct();
      useProductStore.setState((state) => ({
        dataProduct: result.data,
      }));
    } catch (error) {
      setError('err');
    }
  };

  const fetchDataFavorites = async () => {
    try {
      const productService = new ProductService();
      const result = await productService.getMostProduct();
      FavoriteStore.setState((state) => ({
        dataFavorite: result.data,
      }));
    } catch (error) {
      setError('err');
    }
  }

  const bannerData = [
    {
      id: 1,
      images: "https://i02.appmifile.com/71_operator_vn/27/09/2023/95b60375bdc6a63196c664cf3b57d991.jpg?f=webp",
      productId: 1,
    },
    {
      id: 2,
      images: "https://i02.appmifile.com/754_operator_sg/11/12/2023/c2d754383bcd7bd1328596ea4799d885.png?f=webp",
      productId: 2,
    },
    {
      id: 3,
      images: "https://i02.appmifile.com/922_operator_vn/06/11/2023/53e013feed25a04f9348a2431fa2a192.jpg?f=webp",
      productId: 3,
    },
  ];

  const fetchDataBanner = async () => {
    useBannerStore.setState((state) => ({
      bannerData: bannerData,
    }))
  }

  useEffect(() => {
    fetchDataCategory();
    fetchDataProduct();
    fetchDataFavorites();
    fetchDataBanner();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
      }}>
      <BaseImage
        style={{ marginTop: -DimensionUtils.getScreenHeight() * 0.5, alignSelf: 'center' }}
        image={images.logoApp}
        width={DimensionUtils.getScreenWidth() * 0.8}
        height={109}
      />
      <ActivityIndicator size="large" color="#b0b0b0" style={{ bottom: -110 }} />
    </View>
  );
}
