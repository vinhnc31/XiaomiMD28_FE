import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import BaseHeader from '@src/containers/components/Base/BaseHeader';
import {APP_NAVIGATION, GUEST_NAVIGATION} from '@src/navigations/routes';
import React, {useEffect, useState} from 'react';
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
import {AppStackParam} from '@src/navigations/AppNavigation/stackParam';
import {BaseLoading} from '@src/containers/components/Base/BaseLoading';
import Carousel from './Carousel';

import {ProductModel} from '@src/services/product/product.model';
import ProductService from '@src/services/product';

interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.DETAILSPRODUCT>;
}

const DetailsScreen = (props: Props) => {
  const [productData, setProduct] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const [showFullDescription, setShowFullDescription] = useState(false);

  const productId = 1; 

  type Products = {
    images: [];
    id: string;
    name: string;
    price: string;
    description: string;
    quantity: string;
    CategoryId: string;
    createdAt: string;
    updatedAt: string;
  };
  useEffect(() => {
    // Chỉ kích hoạt làm mới nếu refreshing đã được đặt thành true
    setLoading(false);
    if (refreshing) {
      fetchData()
        .then(() => setRefreshing(false))
        .catch(() => setRefreshing(false));
    } else {
      fetchData();
    }
  }, [refreshing]); // Sử dụng mảng phụ thuộc để chỉ kích hoạt khi refreshing thay đổi

  const onRefresh = () => {
    setRefreshing(true);
    fetchData()
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://654b50895b38a59f28eedbb4.mockapi.io/api/product/${productId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setProduct(result);
      setLoading(false);
    } catch (error) {
      setError('err');
      setLoading(false);
    }
  };

  

  

  const handleBackPress = () => {
    // Xử lý khi nút back được nhấn
    props.navigation.goBack();
  };


  // 2 dòng dưới vẫn đúng
  const listImage = productData?.images || [];
  const imagesData = listImage.map((img, index) => ({
    id: (index + 1).toString(), // Tạo ID bằng cách sử dụng index
    image: img,
  }));

  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column', backgroundColor: '#F1F1F1', width: '100%'}}>
      <View style={styles.backContainer}>
        <TouchableOpacity onPress={handleBackPress}>
          <Image source={require('../../../assets/images/back.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <BaseLoading size={20} top={100} loading={true} />
      ) : (
        <View style={styles.container}>
          <ScrollView
            indicatorStyle="black"
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View style={styles.item}>
              <View style={styles.imageContainer}>
                {/* <Image source={require('../../../assets/images/demo.jpg')} style={styles.image} resizeMode="stretch" /> */}
                <Carousel data={imagesData} />
              </View>

              <View style={styles.overlay}>
                <View style={{alignItems: 'flex-end', justifyContent: 'center'}}>
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
                  {productData?.price || ''}
                  <Text style={{textDecorationLine: 'underline', marginLeft: 2}}>đ</Text>
                </Text>

                <View style={{flex: 1, justifyContent: 'center', marginBottom: 8}}>
                  <Text style={styles.textName}>
                    {productData?.name || ''}
                  </Text>
                </View>

                <View style={styles.viewStar}>
                  <Image style={styles.imgStar} source={require('../../../assets/images/star4.png')} />
                  <Text style={styles.textStar}>4.9</Text>
                  <Text style={styles.textCmt}>({productData?.quantity || ''})</Text>
                  <Text style={styles.textSell}>| Đã bán : </Text>
                  <Text style={styles.textSellNumber}>123</Text>
                </View>
              </View>
            </View>

            <View style={{flex: 1, paddingHorizontal: 16}}></View>

            <View style={{flex: 1, backgroundColor: '#FFFFFF', marginBottom: 20}}>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Mô tả về sản phẩm</Text>
                {showFullDescription ? (
                  <View>
                    <Text style={styles.descriptionText}>
                      {productData?.description || ''}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.descriptionText} numberOfLines={10}>
                    {productData?.description || ''}
                    </Text>
                  </View>
                )}

                {showFullDescription ? (
                  <TouchableOpacity onPress={() => setShowFullDescription(false)}>
                    <View style={styles.seeMore}>
                      <Text style={styles.seeMoreText}>Ẩn bớt</Text>
                      <Image style={styles.imgPlus} source={R.images.iconMinus} />
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
              <View style={{marginHorizontal: 20}}>
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
                          <View style={{marginLeft: 5, flexDirection: 'row', alignItems: 'center'}}>
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
                <View style={{width: '100%', borderBottomWidth: 1, borderColor: '#DDDDDD'}}></View>

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
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 8}}>
                          <Image style={{width: 20, height: 20}} source={require('../../../assets/images/plus.png')} />
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
                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
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

                  <View style={{width: '100%', borderBottomWidth: 1, borderColor: '#DDDDDD'}}></View>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.containerStyle}>
            <View style={styles.leftContainerStyle}>
              <TouchableOpacity>
                <View style={styles.imageBtn}>
                  <Image style={styles.imageStyle} source={require('../../../assets/images/chat.png')} />
                </View>
              </TouchableOpacity>
              <Text style={styles.lineverticalLines}></Text>
              <TouchableOpacity>
                <View style={styles.imageBtn}>
                  <Image style={styles.imageStyle} source={require('../../../assets/images/addToCart.png')} />
                </View>
              </TouchableOpacity>
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
