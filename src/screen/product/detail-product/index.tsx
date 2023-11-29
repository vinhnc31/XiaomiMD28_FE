import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BaseHeader from '@src/containers/components/Base/BaseHeader';
import { APP_NAVIGATION, GUEST_NAVIGATION } from '@src/navigations/routes';
import React, { useEffect, useState } from 'react';
import R from '@src/res';
import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import styles from './styles';
import { AppStackParam } from '@src/navigations/AppNavigation/stackParam';
import { BaseLoading } from '@src/containers/components/Base/BaseLoading';
import Carousel from './Carousel';

import { ProductModel, ProductDetailModel } from '@src/services/product/product.model';
import ProductService from '@src/services/product';
import { navigateToPage } from '@src/navigations/services';

interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.DETAILSPRODUCT>;
}

const DetailsScreen = (props: Props) => {
  const [productIdData, setProductIdData] = useState<ProductDetailModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const [showFullDescription, setShowFullDescription] = useState(false);

  const route = props.route;
  const productId = route.params ? route.params.productId : undefined;
  //const productId = 1; 

  useEffect(() => {
    // Chỉ kích hoạt làm mới nếu refreshing đã được đặt thành true
    setLoading(false);
    if (refreshing) {
      fetchDataProduct()
        .then(() => setRefreshing(false))
        .catch(() => setRefreshing(false));
    } else {
      fetchDataProduct();
    }
  }, [productId, refreshing]); // Sử dụng mảng phụ thuộc để chỉ kích hoạt khi refreshing thay đổi

  const fetchDataProduct = async () => {
    try {
      setLoading(true);
      const productService = new ProductService();
      const result = await productService.getProductId(productId);
      console.log('---------------products data id:',productId, '-----------', result.data);
      setProductIdData(result.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('err');
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDataProduct();
    setRefreshing(false);
  };

  const getQuantitiys = (productData: any): number => {
    let totalQuantity = 0;
  
    if (productData && productData.colorProducts && Array.isArray(productData.colorProducts)) {
      productData.colorProducts.forEach((colorProduct: any) => {
        if (colorProduct && colorProduct.colorConfigs && Array.isArray(colorProduct.colorConfigs)) {
          colorProduct.colorConfigs.forEach((colorConfig: any) => {
            if (colorConfig && typeof colorConfig.quantity === 'number') {
              totalQuantity += colorConfig.quantity;
            }
          });
        }
      });
    }
  
    return totalQuantity;
  };
  

  const handleBackPress = () => {
    // Xử lý khi nút back được nhấn
    props.navigation.goBack();
  };

  console.log('productIdData?.colorConfigs?.quantity--------------', getQuantitiys(productIdData))

  const listImage = productIdData.images ? [productIdData.images, productIdData.images, productIdData.images] : [];

  //const listImage = productIdData?.images || [];  // "images": "link"
  //console.log('-------------listImage---------------', JSON.stringify(listImage));
  const imagesData = listImage.map((img, index) => ({
    id: (index + 1).toString(),
    image: img,
  }));

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#F1F1F1', width: '100%' }}>
      <View style={styles.backContainer}>
        <TouchableOpacity onPress={handleBackPress}>
          <Image source={require('../../../assets/images/back.png')} style={styles.iconBack} />
        </TouchableOpacity>
      </View>
      {loading ? (
        // <View style={styles.LoadingContainer}>
        //   <BaseLoading size={60} top={250} loading={true} />
        // </View>
        <View style={{
          height: '100%',
          justifyContent: 'center',
          
        }}>
          <BaseLoading size={60} top={250} loading={true} />
        </View>
      ) : (
        <View style={styles.container}>
          <ScrollView
            indicatorStyle="black"
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View style={styles.item}>
              <View style={styles.imageContainer}>
                <Carousel data={imagesData} />
              </View>

              <View style={styles.overlay}>
                <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                  <TouchableOpacity onPress={() => console.log('code logic button tymm <3')}>
                    <Image style={styles.imgFavourite} source={require('../../../assets/images/heart1.png')} />
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  flex: 1.5,
                  marginHorizontal: 20,
                }}>
                <Text style={styles.priceText}>
                  {productIdData?.price || ''}
                  <Text style={{ textDecorationLine: 'underline', marginLeft: 2 }}>đ</Text>
                </Text>

                <View style={{ flex: 1, justifyContent: 'center', marginBottom: 8 }}>
                  <Text style={styles.textName}>
                    {productIdData?.name || ''}
                  </Text>
                </View>

                <View style={styles.viewStar}>
                  <Image style={styles.imgStar} source={require('../../../assets/images/star4.png')} />
                  <Text style={styles.textStar}>4.9</Text>
                  <Text style={styles.textCmt}>({getQuantitiys(productIdData) || '0'})</Text>
                  <Text style={styles.textSell}>| Đã bán : </Text>
                  <Text style={styles.textSellNumber}>123</Text>
                </View>
              </View>
            </View>

            <View style={{ flex: 1, backgroundColor: '#FFFFFF', marginBottom: 10 }}>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Mô tả về sản phẩm</Text>
                {showFullDescription ? (
                  <View>
                    <Text style={styles.descriptionText}>
                      {productIdData?.description || ''}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.descriptionText} numberOfLines={10}>
                      {productIdData?.description || ''}
                    </Text>
                  </View>
                )}

                {showFullDescription ? (
                  <TouchableOpacity onPress={() => setShowFullDescription(false)}>
                    <View style={styles.seeMore}>
                      <Text style={styles.seeMoreText}>Ẩn bớt</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => setShowFullDescription(true)}>
                    <View style={styles.seeMore}>
                      <Text style={styles.seeMoreText}>Xem thêm</Text>
                      <Image style={styles.imgPlus} source={R.images.iconPlus} />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.reviews}>
              <View style={{ marginHorizontal: 20 }}>
                <TouchableOpacity>
                  <View style={styles.reviewsContainer}>
                    <View style={styles.reviewsContainer2}>
                      <View style={styles.reviewsTitle}>
                        <View style={styles.reviewsTitleContainer}>
                          <Text style={styles.reviewTitleText}>Đánh giá của khác hàng</Text>
                          <Text style={styles.numberReviews}>(100)</Text>
                        </View>

                        <View style={styles.starPoint}>
                          <Text style={styles.pointText}>4.9</Text>
                          <Text style={styles.pointText}> / 5 </Text>
                          <View style={{ marginLeft: 5, flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={styles.imgStar} source={require('../../../assets/images/star4.png')} />
                            <Image style={styles.imgStar} source={require('../../../assets/images/star4.png')} />
                            <Image style={styles.imgStar} source={require('../../../assets/images/star4.png')} />
                            <Image style={styles.imgStar} source={require('../../../assets/images/star4.png')} />
                            <Image style={styles.imgStar} source={require('../../../assets/images/star4.png')} />
                          </View>
                        </View>
                      </View>

                      <View style={styles.seeMoreReviews}>
                        <Text style={styles.seeMoreReviewsText}>Xem thêm</Text>
                        <Image style={styles.imgNext} source={require('../../../assets/images/nextD.png')} />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={{ width: '100%', borderBottomWidth: 1, borderColor: '#DDDDDD' }}></View>

                {/* <FlatList
              data={data}
              keyExtractor={item => item.id}
              horizontal={true}
              contentContainerStyle={styles.flatListContainer}
              renderItem={({item}) => (
                <TouchableWithoutFeedback onPress={() => console.log('code Xem chi tiet đánh giá: ', item.name)}>
                  
                </TouchableWithoutFeedback>
              )}
              scrollEnabled={false}/> */}

                <View>
                  <TouchableOpacity>
                    <View>
                      <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 8 }}>
                          <Image style={{ width: 20, height: 20 }} source={require('../../../assets/images/plus.png')} />
                          <Text
                            style={{
                              color: '#2A2A2A',
                              fontWeight: '400',
                              fontSize: 14,
                              fontFamily: 'LibreBaskerville-Bold',
                              marginLeft: 5,
                            }}>
                            Name
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                          <Image style={styles.imgStar} source={require('../../../assets/images/star4.png')} />
                          <Image style={styles.imgStar} source={require('../../../assets/images/star4.png')} />
                          <Image style={styles.imgStar} source={require('../../../assets/images/star4.png')} />
                          <Image style={styles.imgStar} source={require('../../../assets/images/star4.png')} />
                          <Image style={styles.imgStar} source={require('../../../assets/images/star4.png')} />
                        </View>
                      </View>

                      <View>
                        <Text
                          style={{
                            marginBottom: 15,
                            color: '#2A2A2A',
                            fontWeight: '400',
                            fontSize: 12,
                            fontFamily: 'LibreBaskerville-Bold',
                          }}>
                          Giá siêu rẻ, vừa với tầm giá ,sử dụng mượt mà, màu sắc đẹp ....
                        </Text>
                        <Image
                          style={{
                            width: 200,
                            height: 200,
                            marginBottom: 15,
                          }}
                          source={require('../../../assets/images/demo.jpg')}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>

                  <View style={{ width: '100%', borderBottomWidth: 1, borderColor: '#DDDDDD' }}></View>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.containerStyle}>
            <View style={styles.leftContainerStyle}>
              <TouchableOpacity onPress={() => {}}>
                <View style={styles.imageBtn}>
                  <Image style={styles.imageStyle} source={require('../../../assets/images/chat.png')} />
                </View>
              </TouchableOpacity>
              <Text style={styles.lineverticalLines}>Thêm vào giỏ hàng</Text>
            </View>

            <View style={styles.rightContainerStyle}>
              <TouchableOpacity>
                <Text style={styles.textLabelStyle}>Mua ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default React.memo(DetailsScreen);
