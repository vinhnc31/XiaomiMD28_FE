import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BaseHeader from '@src/containers/components/Base/BaseHeader';
import { APP_NAVIGATION, GUEST_NAVIGATION } from '@src/navigations/routes';
import React, { useEffect, useState } from 'react';
import { ms, vs, hs } from '@src/styles/scalingUtils';
import R from '@src/res';
import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  Dimensions,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './styles';
import { AppStackParam } from '@src/navigations/AppNavigation/stackParam';
import { BaseLoading } from '@src/containers/components/Base/BaseLoading';
import Carousel from './Carousel';

import { ProductModel, ProductDetailModel, CommentProductId } from '@src/services/product/product.model';
import ProductService from '@src/services/product';
import { navigateToPage } from '@src/navigations/services';
import FavoriteService from '@src/services/favorite';
import { useAuth } from '@src/hooks/useAuth';
import Toast from 'react-native-toast-message';
import CartService from '@src/services/cart';
import { ToastAndroid } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.DETAILSPRODUCT>;
}

const DetailsScreen = (props: Props) => {
  const { user } = useAuth();
  const [productIdData, setProductIdData] = useState<ProductDetailModel[]>([]);
  const [commentProductIdData, setCommentProductIdData] = useState<CommentProductId[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const [showFullDescription, setShowFullDescription] = useState(false);

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [colorIdSlider, setcolorIdSlider] = useState(0);
  const [colorIdButtonSlider, setcolorIdButtonSlider] = useState(0);

  const route = props.route;
  const productId = route.params ? route.params.productId : undefined;
  const AccountId = user?.id || '';
  const [favoriteId, setFavoriteId] = useState(0);
  const productService = new ProductService();

  const [noData, setNoData] = useState(false);

  // { phân sang phần comment
  const commentsToShow = 3;
  const startIndex = 0;
  const getProductCommentsToShow = () => {
    return commentProductIdData.slice(startIndex, commentsToShow).map(comment => ({
      ...comment,
      productName: productIdData?.name,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchDataProduct();
        await checkIfProductIsFavorite();
        await fetchDataCommentProduct();
      } catch (error) {
        setError('fetchData err');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };
    fetchData();
    checkIfProductIsFavorite();
  }, [productId, refreshing]);

  const fetchDataProduct = async () => {
    try {
      const result = await productService.getProductId(productId);
      setProductIdData(result.data);
      // console.log('aaaaaa', Object.keys(result.data));
      if (result.data && Object.keys(result.data).length > 0) {
        setNoData(false);
      } else {
        setNoData(true);
      }
    } catch (error) {
      setError('err');
    }
  };

  const fetchDataCommentProduct = async () => {
    try {
      setLoading(true);
      const result = await productService.getCommentProductId(productId);

      setCommentProductIdData(result.data);
    } catch (error) {
      setError('err' + error);
      setNoData(true);
    }
  };

  const onRefresh = async () => {
    const RefreshData = async () => {
      try {
        await fetchDataProduct();
        await checkIfProductIsFavorite();
        await fetchDataCommentProduct();
      } catch (error) {
        setError('fetchData err');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };

    RefreshData();
  };

  const getQuantitys = (productData: ProductDetailModel): number => {
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
      if (isFavorite) {
        const removeResult = await favoriteService.deleteFavorite(favoriteId);
        if (removeResult) {
          Toast.show({
            text1: 'Xóa thành công khỏi mục yêu thích',
            type: 'success',
          });
          setIsFavorite(false);
        } else {
          console.log('Xóa yêu thích không thành công');
          Toast.show({
            text1: 'Bỏ yêu thích không thành công !',
            type: 'error',
          });
        }
      } else {
        const addPavoriteResult = await favoriteService.addFavorite({
          productId,
          AccountId,
        });
        if (addPavoriteResult) {
          Toast.show({
            text1: 'Đã thêm thành công vào danh sách yêu thích',
            type: 'success',
          });
          setIsFavorite(true);
          setFavoriteId(addPavoriteResult.data.id); // Lưu ID mới tạo được
        }
      }
      await checkIfProductIsFavorite();
    } catch (error) {
      console.log('error: ', error);
    }
  };
  const checkIfProductIsFavorite = async () => {
    try {
      const favoriteService = new FavoriteService();
      const favoriteResult = await favoriteService.fetchFavorite(AccountId);
      const favorites = favoriteResult.data;

      const isProductInFavorites = favorites.some(favorite => {
        if (favorite.productId === productId) {
          setFavoriteId(favorite.id);
          return true; // Returning true means the product is found in favorites
        }
        return false; // Continue searching
      });
      setIsFavorite(isProductInFavorites);
    } catch (error) {
      console.log('Error checking liked products:', error);
      setLoading(false);
    }
  };

  const formatPrice = (priceNumber: number) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0, // Số lẻ tối thiểu là 0
    });
    return formatter.format(priceNumber);
  };

  const dataSlider = (
    productData: ProductDetailModel,
  ): Array<{ id: number; image: string; colorId: number; nameColor: string }> => {
    let sliderData: Array<{ id: number; image: string; colorId: number; nameColor: string }> = [];

    if (productData && productData.colorProducts && Array.isArray(productData.colorProducts)) {
      productData.colorProducts.forEach(colorProduct => {
        if (colorProduct && colorProduct.Color && colorProduct.Color.id && colorProduct.Color.nameColor) {
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
    setcolorIdSlider(colorId);
    setcolorIdButtonSlider(colorId);
  };

  const renderItemNameColors = ({ item, index }) => {
    const isColorMatched = item?.colorId === colorIdSlider;
    return (
      <View key={item.id} style={styles.btnColorsContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleColorChange(item.colorId)}
          style={[
            styles.btnColors,
            {
              backgroundColor: colorIdSlider !== null && isColorMatched ? '#E5E5E5' : '#FFF',
            },
          ]}>
          <Text style={styles.txtNameColors}>{item?.nameColor}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItemComments = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity activeOpacity={0.8} onPress={goToReviewProduct}>
          <View>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.itemCmtContainer}>
                  {item.Account.avatar == '' ? (
                    <Image style={styles.imgCmtAvatar} source={require('../../../assets/images/user.png')} />
                  ) : (
                    <Image style={styles.imgCmtAvatar} source={{ uri: item.Account.avatar }} />
                  )}

                  <Text style={styles.txtCmtName}>{item?.Account.name || ''}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#817F7F',
                      fontWeight: '400',
                      fontSize: ms(14),
                      fontFamily: 'LibreBaskerville-Bold',
                      marginLeft: hs(70),
                    }}>
                    Sản phẩm:
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      flex: 1,
                      color: '#000',
                      fontWeight: '400',
                      fontSize: ms(10),
                      fontFamily: 'LibreBaskerville-Bold',
                      marginLeft: hs(10),
                      alignSelf: 'center',
                    }}>
                    {item?.productName || ''}
                  </Text>
                </View>
              </View>
              <View style={styles.imgStarCmtContainer}>
                <>
                  {[...Array(Math.floor(item?.star)).keys()].map(index => (
                    <Image key={index} style={styles.imgStarCmt} source={require('../../../assets/images/star4.png')} />
                  ))}
                  {[...Array(5 - Math.floor(item?.star)).keys()].map(index => (
                    <Image
                      key={index}
                      style={styles.imgStar2Cmt}
                      source={require('../../../assets/images/star2.png')} // Use star2.png for remaining stars
                    />
                  ))}
                </>
              </View>
            </View>

            <View>
              <Text numberOfLines={3} style={styles.txtCmtBody}>
                {item?.commentBody || ''}
              </Text>
              {item.images ? <Image style={styles.imgCmtBody} source={{ uri: item.images }} /> : null}
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.borderBottom}></View>
      </View>
    );
  };

  const goToReviewProduct = () => {
    navigateToPage(APP_NAVIGATION.REVIEWPRODUCT, {
      commentProductData: commentProductIdData,
      productName: productIdData?.name,
    });
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState('');
  // add du lieu hien thi
  const [selectedImageModal, setSelectedImageModal] = useState('');
  const [selectedPriceModal, setSelectedPriceModal] = useState(0);
  const [selectedQuantityModal, setSelectedQuantityModal] = useState(0);
  const [productColorIdModal, setProductColorIdModal] = useState(); // truyen ProductColorId nay
  const [ProductColorConfigIdModal, setProductColorConfigIdModal] = useState(); // truyen ProductColorConfigId nay
  const [selectedCountModal, setSelectedCountModal] = useState(1); // truyen
  const [config, setConfig] = useState(false);
  const { colorProducts } = productIdData;
  const [a, seta] = useState(null);
  const [b, setb] = useState(null);

  const renderItemColorModal = ({ item, index }) => {
    return (
      <View key={item.id} style={styles.btnColorsContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleColorModalPress(item)}
          style={[
            styles.btnColors,
            {
              backgroundColor: selectedColorId === item.id ? '#E5E5E5' : '#FFF',
            },
          ]}>
          <Text style={styles.txtNameColors}>{item?.Color.nameColor || ''}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItemColorConfigModal = ({ item, index }) => {
    const colorConfigs = item.colorConfigs;

    const filteredColorConfigs = colorConfigs.filter(configItem => configItem.ProductColorId === selectedColorId);
    return (
      <View key={filteredColorConfigs.id} style={styles.btnColorsContainer}>
        {filteredColorConfigs.map(configItem => (
          <TouchableOpacity
            key={configItem.id}
            activeOpacity={0.8}
            onPress={() => handleConfigModalPress(configItem)}
            style={[
              styles.btnColors,
              {
                backgroundColor: selectedColorConfigId === configItem.configId ? '#E5E5E5' : '#FFF',
              },
            ]}>
            <Text style={styles.txtNameColors}>{configItem.Config.nameConfig}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  //logic backroud
  const [selectedColorId, setSelectedColorId] = useState(0);
  const [selectedColorConfigId, setSelectedColorConfigId] = useState(0);

  // view
  const [isRenderColorConfigId, setIsRenderColorConfigId] = useState<boolean>(true);
  const handleColorModalPress = item => {
    if (item.colorConfigs.length === 0) {
      setConfig(true);
    } else {
      setConfig(false);
    }
    setb(item);
    // Handle color modal press logic
    setProductColorIdModal(item.id); // add
    setSelectedImageModal(item?.image); //view
    setSelectedColorId(item?.id || null); //btn
    //bg
    setSelectedColorConfigId(0);
    //logic set data quantity
    const selectedQuantity =
      productIdData.colorProducts && productIdData.colorProducts.length > 0
        ? getQuantitys(productIdData) === 0
          ? productIdData.quantity
          : getQuantitys(productIdData)
        : productIdData.quantity;
    setSelectedQuantityModal(selectedQuantity < 0 ? 0 : selectedQuantity);
    //logic view
    setIsRenderColorConfigId(item?.colorConfigs.length === 0 ? true : false);
  };

  const handleConfigModalPress = configItem => {
    {
      //add
      seta(configItem);
      setProductColorConfigIdModal(configItem.id);
      //view
      setSelectedPriceModal(configItem.price || 0);
      setSelectedQuantityModal(configItem.quantity < 0 ? 0 : configItem.quantity);
      //bg
      setSelectedColorConfigId(configItem.configId || 0);
      // logic view
    }
  };

  const handleDecrease = () => {
    setSelectedCountModal(prevCount => Math.max(prevCount - 1, 1));
  };
  const handleIncrease = () => {
    setSelectedCountModal(prevCount => Math.min(prevCount + 1, selectedQuantityModal || 1));
  };
  const handleAddToCart = async () => {
    handleModalPress();
    try {
      const cartService = new CartService();
      const addCartData = {
        productId: productIdData?.id,
        AccountId: AccountId,
        quantity: selectedCountModal,
        ProductColorId: productColorIdModal ?? null,
        ProductColorConfigId: ProductColorConfigIdModal ?? null,
      };
      const result = await cartService.postCart(addCartData);
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Thành công',
        text2: 'Đã thêm vào giỏ hàng',
      });
    } catch (error) {
      console.log('error: ', error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Thông báo',
        text2: 'Không thể thêm vào giỏ hàng !',
      });
    }
  };
  const handleBuyNow = () => {
    handleModalPress();
    const data = [
      {
        productImage: !config ? productIdData?.images : b['image'],
        productName: productIdData?.name,
        productId: productIdData?.id,
        productPrice: productIdData['colorProducts'].length == 0 || config ? productIdData.price : a['price'],
        quantity: selectedCountModal,
        ProductColorId: productColorIdModal ?? null,
        ProductRam: !config ? a?.Config['nameConfig'] : null,
        ProductColor: config || !config ? b?.Color['nameColor'] : null,
        ProductColorConfigId: ProductColorConfigIdModal ?? null,
      },
    ];
    navigateToPage(APP_NAVIGATION.PAYDETAIL, { data });
  };
  const handleModalPress = () => {
    // Đóng Modal khi người dùng ấn vào nền bên ngoài
    setModalVisible(!modalVisible);
    setModalVisible(false);
    setModalAction('');
    setConfig(false);
    if (productIdData?.images && productIdData?.price) {
      setSelectedImageModal(productIdData?.images || '');
      setSelectedPriceModal(productIdData?.price || 0);
      setSelectedQuantityModal(getQuantitys(productIdData) || 0);
    }
    setSelectedColorId(0);
    setSelectedColorConfigId(0);
    setIsRenderColorConfigId(true);
  };
  useEffect(() => {
    setSelectedImageModal(productIdData?.images || '');
    setSelectedPriceModal(productIdData?.price || 0);

    const selectedQuantity =
      productIdData.colorProducts && productIdData.colorProducts.length > 0
        ? getQuantitys(productIdData) === 0
          ? productIdData.quantity
          : getQuantitys(productIdData)
        : productIdData.quantity;
    setSelectedQuantityModal(selectedQuantity >= 0 ? selectedQuantity : 0);
  }, [productIdData]);

  const renderQuantityText = () => {
    const quantity = getQuantitys(productIdData) || productIdData?.quantity || 0;

    return <Text style={styles.textCmt}>({quantity < 0 ? 0 : quantity})</Text>;
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.backContainer}>
        <TouchableOpacity activeOpacity={0.8} onPress={handleBackPress} style={styles.iconbackContainer}>
          <Image source={require('../../../assets/images/back.png')} style={styles.iconBack} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.LoadingContainer}>
          <BaseLoading size={60} top={250} loading={true} />
        </View>
      ) : (
        <>
          {noData ? (
            <View style={styles.noDataContainer}>
              <Image
                style={{ width: hs(120), height: hs(120) }}
                source={require('../../../assets/images/noDataStar.png')}
              />
              <Text style={styles.noDataText}>không tìm thấy sản phẩm</Text>
            </View>
          ) : (
            <>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={['dummyData']} // Bạn có thể cung cấp một số dữ liệu giả mạo hoặc sử dụng một mục đơn làm đại diện
                keyExtractor={() => 'dummyKey'} // Sử dụng một hàm trích xuất khóa giả mạo
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                renderItem={() => (
                  <>
                    <View style={styles.item}>
                      <View style={styles.imageContainer}>
                        {!dataSlider(productIdData) || dataSlider(productIdData).length === 0 ? (
                          <Image
                            source={{ uri: productIdData?.images } || require('../../../assets/images/noimage.jpg')}
                            style={{
                              width: hs(256),
                              height: vs(256),
                              resizeMode: 'contain',
                              borderRadius: ms(5),
                              alignSelf: 'center',
                            }}
                          />
                        ) : (
                          <Carousel
                            data={dataSlider(productIdData) || []}
                            onColorChanged={colorId => {
                              setcolorIdSlider(colorId);
                            }}
                            colorIdButton={colorIdButtonSlider}
                          />
                        )}
                      </View>

                      <View style={styles.overlayIconFavorite}>
                        <View style={styles.iconFavoriteContainer}>
                          <TouchableOpacity
                            activeOpacity={0.8}
                            // Disable the button based on the loading state
                            onPress={() => {
                              if (user) {
                                handleFavoritePress();
                              } else {
                                navigateToPage(GUEST_NAVIGATION.LOGIN, {
                                  name_screen: APP_NAVIGATION.DETAILSPRODUCT,
                                  param: props.route?.params,
                                });
                              }
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

                      <View style={styles.priceNameViewStarContainer}>
                        <Text style={styles.priceText}>{formatPrice(productIdData?.price || 0)}</Text>

                        <View style={styles.nameContainer}>
                          <Text style={styles.textName}>{productIdData?.name || ''}</Text>
                        </View>

                        <View style={styles.viewStar}>
                          <Image style={styles.imgStar} source={require('../../../assets/images/star4.png')} />
                          <Text style={styles.textStar}>
                            {productIdData?.averageRating? parseFloat(productIdData?.averageRating).toFixed(1):"0"}
                          </Text>
                          <Text style={styles.textSell}>| Kho : </Text>
                          {productIdData?.colorProducts.length > 0
                            ? getQuantitys(productIdData) === 0
                              ? renderQuantityText()
                              : renderQuantityText()
                            : renderQuantityText()}
                        </View>
                      </View>
                      {dataSlider(productIdData) ? (
                        <View style={styles.flatListColorsContainer}>
                          <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={dataSlider(productIdData) || []}
                            keyExtractor={item => item.id.toString()}
                            renderItem={renderItemNameColors}
                          />
                        </View>
                      ) : null}
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
                          <TouchableOpacity activeOpacity={0.8} onPress={() => setShowFullDescription(false)}>
                            <View style={styles.seeMore}>
                              <Text style={styles.seeMoreText}>Ẩn bớt</Text>
                            </View>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity activeOpacity={0.8} onPress={() => setShowFullDescription(true)}>
                            <View style={styles.seeMore}>
                              <Text style={styles.seeMoreText}>Xem thêm</Text>
                              <Image
                                style={styles.imgPlus}
                                source={R.images.iconPlus || require('../../../assets/images/noimage.jpg')}
                              />
                            </View>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>

                    <View style={styles.reviews}>
                      <View style={styles.reviewBody}>
                        <TouchableOpacity activeOpacity={0.8} onPress={goToReviewProduct}>
                          <View style={styles.reviewsContainer}>
                            <View style={styles.reviewsContainer2}>
                              <View style={styles.reviewsTitle}>
                                <View style={styles.reviewsTitleContainer}>
                                  <Text style={styles.reviewTitleText}>Đánh giá của khác hàng</Text>
                                  <Text style={styles.numberReviews}>
                                    ({productIdData?.commentCount || commentProductIdData.length})
                                  </Text>
                                </View>

                                <View style={styles.starPoint}>
                                  <Text style={styles.pointText}>
                                    {productIdData?.averageRating
                                      ? parseFloat(productIdData?.averageRating).toFixed(1)
                                      : '0'}
                                  </Text>
                                  <Text style={styles.pointText}> / 5 </Text>
                                  <View style={styles.imgStarContainer}>
                                    {isNaN(parseFloat(productIdData?.averageRating)) ||
                                      !isFinite(productIdData?.averageRating) ? (
                                      <>
                                        {Array.from({ length: 5 }).map((_, index) => (
                                          <Image
                                            key={index}
                                            style={styles.imgStarCmt}
                                            source={require('../../../assets/images/star4.png')}
                                          />
                                        ))}
                                      </>
                                    ) : (
                                      <>
                                        {[...Array(Math.floor(parseFloat(productIdData?.averageRating))).keys()].map(
                                          index => (
                                            <Image
                                              key={index}
                                              style={styles.imgStarCmt}
                                              source={require('../../../assets/images/star4.png')}
                                            />
                                          ),
                                        )}
                                        {[
                                          ...Array(5 - Math.floor(parseFloat(productIdData?.averageRating))).keys(),
                                        ].map(index => (
                                          <Image
                                            key={index}
                                            style={styles.imgStar2Cmt}
                                            source={require('../../../assets/images/star2.png')} // Use star2.png for remaining stars
                                          />
                                        ))}
                                      </>
                                    )}
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

                        <FlatList
                          pagingEnabled
                          showsHorizontalScrollIndicator={false}
                          data={commentProductIdData ? getProductCommentsToShow() : []}
                          keyExtractor={item => item.id.toString()}
                          renderItem={renderItemComments}
                        />
                      </View>
                    </View>
                  </>
                )}
                nestedScrollEnabled // Bật tính năng cuộn lồng
              />

              <View style={styles.BuyandAddtoCartContainer}>
                <TouchableOpacity
                  onPress={() => {
                    if (user) {
                      setModalVisible(true);
                      setModalAction('addToCart');
                    } else {
                      navigateToPage(GUEST_NAVIGATION.LOGIN, {
                        name_screen: APP_NAVIGATION.DETAILSPRODUCT,
                        param: props.route?.params,
                      });
                    }
                  }}
                  style={styles.leftContainerCart}
                  activeOpacity={0.8}>
                  <View style={styles.leftRowCart}>
                    <Image style={styles.imgAddCart} source={require('../../../assets/images/add-to-cart.png')} />
                    <Text style={styles.txtAddCart}>Thêm vào giỏ hàng</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    if (user) {
                      setModalVisible(true);
                      setModalAction('buyNow');
                    } else {
                      navigateToPage(GUEST_NAVIGATION.LOGIN, {
                        name_screen: APP_NAVIGATION.DETAILSPRODUCT,
                        param: props.route?.params,
                      });
                    }
                  }}
                  style={styles.rightContainerBuy}
                  activeOpacity={0.8}>
                  <Text style={styles.textBuy}>Mua ngay</Text>
                </TouchableOpacity>
              </View>

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}>
                <TouchableWithoutFeedback onPress={handleModalPress}>
                  <View style={styles.centeredViewModal}>
                    <TouchableWithoutFeedback>
                      <View style={styles.modalView}>
                        <View style={styles.productModal}>
                          {selectedImageModal ? (
                            <Image source={{ uri: selectedImageModal }} style={styles.productModalImage} />
                          ) : (
                            <Image
                              source={require('../../../assets/images/noimage.jpg')}
                              style={styles.productModalImage}
                            />
                          )}
                          <View style={styles.productModalPriceQuantity}>
                            <Text style={styles.productModalPriceText}>{formatPrice(selectedPriceModal || 0)}</Text>
                            <Text style={styles.productModalQuantityText}>
                              {'Kho: '}
                              {selectedQuantityModal || 0}
                            </Text>
                          </View>
                          <TouchableOpacity activeOpacity={0.8} onPress={handleModalPress} style={styles.btnCloseModal}>
                            <Image
                              source={require('../../../assets/images/closewhite.png')}
                              style={styles.iconCloseModal}
                            />
                          </TouchableOpacity>
                        </View>

                        {/* Màu */}
                        {colorProducts.length > 0 ? (
                          <>
                            <Text style={[styles.borderBottom]}></Text>
                            <View style={styles.modalProductColorContainer}>
                              <Text style={styles.modalProductColorTitle}>Màu</Text>
                              <View style={{}}>
                                <FlatList
                                  horizontal
                                  showsHorizontalScrollIndicator={false}
                                  data={colorProducts || []}
                                  keyExtractor={item => item.id.toString()}
                                  renderItem={renderItemColorModal}
                                />
                              </View>
                            </View>
                          </>
                        ) : (
                          <View></View>
                        )}

                        {/* RAM */}

                        <View style={styles.modalProductConfigContainer}>
                          {isRenderColorConfigId ? (
                            <View></View>
                          ) : (
                            <>
                              <Text style={styles.modalProductConfigTitle}>Thông số</Text>
                              <View style={{}}>
                                <FlatList
                                  horizontal
                                  showsHorizontalScrollIndicator={false}
                                  data={colorProducts || []}
                                  keyExtractor={item => item.id.toString()}
                                  renderItem={renderItemColorConfigModal}
                                />
                              </View>
                            </>
                          )}
                        </View>
                        <Text style={styles.borderBottom}></Text>

                        {/* Số lượng */}
                        <View style={styles.modalNumberProductContainer}>
                          <Text style={styles.modalNumberProductTitle}>Số lượng</Text>
                          <View style={styles.modalQuantityProductContainer}>
                            <TouchableOpacity
                              disabled={selectedCountModal == 1 ? true : false}
                              onPress={handleDecrease}
                              activeOpacity={0.8}
                              style={styles.modalBtnMinusPlus}>
                              <Image
                                source={require('../../../assets/images/minus.png')}
                                style={styles.modalIconMinusPlus}
                              />
                            </TouchableOpacity>
                            <View style={styles.modalQuantiyTextContainer}>
                              <Text style={styles.modalQuantiyText}>{selectedCountModal || 1}</Text>
                            </View>
                            <TouchableOpacity
                              onPress={handleIncrease}
                              activeOpacity={0.8}
                              style={styles.modalBtnMinusPlus}>
                              <Image
                                source={require('../../../assets/images/plusblack.png')}
                                style={styles.modalIconMinusPlus}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                        <Text style={[styles.borderBottom, { flex: 0.01 }]}></Text>

                        <TouchableOpacity
                          disabled={
                            selectedQuantityModal == 0
                              ? true
                              : dataSlider(productIdData).length == 0
                                ? false
                                : config
                                  ? false
                                  : selectedColorId == 0 || selectedColorConfigId == 0
                                    ? true
                                    : false
                          }
                          activeOpacity={0.8}
                          style={
                            selectedQuantityModal == 0
                              ? styles.modalBtnAddFalse
                              : dataSlider(productIdData).length == 0
                                ? styles.modalBtnAdd
                                : config
                                  ? styles.modalBtnAdd
                                  : selectedColorConfigId == 0 || selectedColorId == 0
                                    ? styles.modalBtnAddFalse
                                    : styles.modalBtnAdd
                          }
                          onPress={() => {
                            if (modalAction === 'addToCart') {
                              handleAddToCart();
                            } else if (modalAction === 'buyNow') {
                              handleBuyNow();
                            }
                            setModalVisible(!modalVisible);
                            handleModalPress();
                          }}>
                          <Text style={styles.modalBtnText}>
                            {modalAction === 'addToCart' ? 'Thêm vào giỏ hàng' : 'Mua ngay'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default React.memo(DetailsScreen);
