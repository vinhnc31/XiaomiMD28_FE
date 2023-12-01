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

import {ProductModel, ProductDetailModel} from '@src/services/product/product.model';
import ProductService from '@src/services/product';
import {navigateToPage} from '@src/navigations/services';
import FavoriteService from '@src/services/favorite';
import {useAuth} from '@src/hooks/useAuth';

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

  const [isFavorite, setIsFavorite] = useState(false);
  const [colorIdSlider, setcolorIdSlider] = useState(0);
  const [colorIdButtonSlider, setcolorIdButtonSlider] = useState(0);

  const route = props.route;
  const productId = route.params ? route.params.productId : undefined;
  const {user} = useAuth();
  const AccountId = user?.id || '';

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

  useEffect(() => {
    checkIfProductIsFavorite(); // Call a function to check if the product is liked
  }, [productId]); // Fetch liked products whenever productId changes

  const fetchDataProduct = async () => {
    try {
      setLoading(true);
      const productService = new ProductService();
      const result = await productService.getProductId(productId);

      console.log('---------------products data id:', productId, '-----------', result.data);
      setProductIdData(result.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('err');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDataProduct();
    setRefreshing(false);
  };

  const getQuantitiys = (productData: ProductDetailModel): number => {
    let totalQuantity = 0;
    if (productData && productData.colorProducts && Array.isArray(productData.colorProducts)) {
      productData.colorProducts.forEach(colorProduct => {
        if (colorProduct && colorProduct.colorConfigs && Array.isArray(colorProduct.colorConfigs)) {
          colorProduct.colorConfigs.forEach(colorConfig => {
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
    props.navigation.goBack();
  };

  const handleFavoritePress = async () => {
    try {
      const favoriteService = new FavoriteService();
      const favoriteResult = await favoriteService.fetchFavorite(AccountId);
      const favorites = favoriteResult.data;

      // Kiểm tra xem sản phẩm đã có trong danh sách yêu thích hay chưa
      const isProductInFavorites = favorites.some(favorite => favorite.productId === productId);

      if (isProductInFavorites) {
        // Nếu sản phẩm đã có trong danh sách yêu thích, thì xóa nó đi
        //const removeResult = await favoriteService.removeFavorite({ productId, AccountId });
        console.log('product có id { ', productId, ' } đã có trong yêu thích');
        return;
      } else {
        // Nếu sản phẩm chưa có trong danh sách yêu thích, thêm nó vào
        const addPavoriteResult = await favoriteService.addFavorite({
          productId,
          AccountId,
        });
        console.log('Thêm vào danh sách yêu thích thành công', addPavoriteResult.status);
      }
      setIsFavorite(!isFavorite);
      setLoading(false);
    } catch (error) {
      console.log('error: ', error);
      setIsFavorite(!isFavorite);
      setLoading(false);
    }
  };

  // kiem tra xem account này có yêu thích sản phẩm này không
  const checkIfProductIsFavorite = async () => {
    try {
      const favoriteService = new FavoriteService();
      const favoriteResult = await favoriteService.fetchFavorite(AccountId);
      const favorites = favoriteResult.data;

      const isProductInFavorites = favorites.some(favorite => favorite.productId === productId);
      setIsFavorite(isProductInFavorites);
    } catch (error) {
      console.log('Error checking liked products:', error);
    }
  };

  const formatPrice = priceNumber => {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0, // Số lẻ tối thiểu là 0
    });
    return formatter.format(priceNumber);
  };

  const dataSlider = (
    productData: ProductDetailModel,
  ): Array<{id: number; image: string; colorId: number; nameColor: string}> => {
    let sliderData: Array<{id: number; image: string; colorId: number; nameColor: string}> = [];

    if (productData && productData.colorProducts && Array.isArray(productData.colorProducts)) {
      productData.colorProducts.forEach(colorProduct => {
        if (colorProduct && colorProduct.Color && colorProduct.Color.id && colorProduct.Color.nameColor) {
          // Lấy thông tin cần thiết và thêm vào mảng
          sliderData.push({
            id: colorProduct.Color.id,
            image: colorProduct.image,
            colorId: colorProduct.colorId,
            nameColor: colorProduct.Color.nameColor,
          });
        }
      });
    }

    return sliderData;
  };

  const handleColorChange = (colorId: number) => {
    console.log('Selected Color ID:', colorId);
    setcolorIdSlider(colorId);
    setcolorIdButtonSlider(colorId);
  };

  const renderItemNameColors = ({item, index}) => {
    // Kiểm tra xem colorId của item có trùng với colorIdSlider hay không
    const isColorMatched = item?.colorId === colorIdSlider;

    return (
      <View key={item.id} style={styles.btnColorsContainer}>
        <TouchableOpacity
          onPress={() => handleColorChange(item.colorId)}
          style={[
            styles.btnColors,
            {
              backgroundColor: colorIdSlider !== null && isColorMatched ? '#E5E5E5' : '#FFF',
            },
          ]}>
          <Text
            style={styles.txtNameColors}>
            {item?.nameColor}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.backContainer}>
        <TouchableOpacity onPress={handleBackPress}>
          <Image source={require('../../../assets/images/back.png')} style={styles.iconBack} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.LoadingContainer}>
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
                <Carousel
                  data={dataSlider(productIdData) || []}
                  onColorChanged={colorId => {
                    // Xử lý thông tin vị trí ở đây, ví dụ: console.log(index);
                    console.log('index-----------------z', colorId);
                    setcolorIdSlider(colorId);
                  }}
                  colorIdButton={colorIdButtonSlider}
                />
              </View>

              <View style={styles.overlayIconFavorite}>
                <View style={styles.iconFavoriteContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      console.log('code logic button tymm <3');
                      handleFavoritePress();
                    }}>
                    <Image
                      style={styles.imgFavourite}
                      source={
                        isFavorite
                          ? require('../../../assets/images/heart2.png')
                          : require('../../../assets/images/heart1.png')
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={styles.priceNameViewStarContainer}>
                <Text style={styles.priceText}>{formatPrice(productIdData?.price || 0)}</Text>

                <View style={styles.nameContainer}>
                  <Text style={styles.textName}>{productIdData?.name || ''}</Text>
                </View>

                <View style={styles.viewStar}>
                  <Image style={styles.imgStar} source={require('../../../assets/images/star4.png')} />
                  <Text style={styles.textStar}>4.9</Text>
                  <Text style={styles.textCmt}>({getQuantitiys(productIdData) || '0'})</Text>
                  <Text style={styles.textSell}>| Đã bán : </Text>
                  <Text style={styles.textSellNumber}>123</Text>
                </View>
              </View>

              <View style={styles.flatListColorsContainer}>
                <FlatList
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  data={dataSlider(productIdData) || []}
                  keyExtractor={item => item.id.toString()}
                  renderItem={renderItemNameColors}
                />
              </View>
            </View>

            <View style={styles.mainDescription}>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Mô tả về sản phẩm</Text>
                {showFullDescription ? (
                  <View>
                    <Text style={styles.descriptionText}>{productIdData?.description || ''}</Text>
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
              <View style={styles.reviewBody}>
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
                <View style={styles.borderBottom}></View>

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

                  <View style={styles.borderBottom}></View>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.BuyandAddtoCartContainer}>
            <View style={styles.leftContainerCart}>
              <TouchableOpacity
                onPress={() => {
                  console.log('them vao gio hang');
                }}>
                <View style={styles.leftRowCart}>
                  <Image style={styles.imgAddCart} source={require('../../../assets/images/add-to-cart.png')} />
                  <Text style={styles.txtAddCart}>Thêm vào giỏ hàng</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.rightContainerBuy}>
              <TouchableOpacity>
                <Text style={styles.textBuy}>Mua ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default React.memo(DetailsScreen);
