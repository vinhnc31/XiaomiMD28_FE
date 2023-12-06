import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import BaseHeader from '@src/containers/components/Base/BaseHeader';
import {APP_NAVIGATION, GUEST_NAVIGATION} from '@src/navigations/routes';
import React, {useEffect, useState} from 'react';
import {ms, vs, hs} from '@src/styles/scalingUtils';
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
import {AppStackParam} from '@src/navigations/AppNavigation/stackParam';
import {BaseLoading} from '@src/containers/components/Base/BaseLoading';
import Carousel from './Carousel';

import {ProductModel, ProductDetailModel, CommentProductId} from '@src/services/product/product.model';
import ProductService from '@src/services/product';
import {navigateToPage} from '@src/navigations/services';
import FavoriteService from '@src/services/favorite';
import {useAuth} from '@src/hooks/useAuth';
import Toast from 'react-native-toast-message';
import CartService from '@src/services/cart';
import {ToastAndroid} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface Props {
  navigation: NativeStackNavigationProp<AppStackParam>;
  route: RouteProp<AppStackParam, APP_NAVIGATION.DETAILSPRODUCT>;
}

const DetailsScreen = (props: Props) => {
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
  const {user} = useAuth();
  const AccountId = user?.id || '';
  const [favoriteId, setFavoriteId] = useState(0);
  const [isBtnAddToCart, setIsBtnAddToCart] = useState<boolean>(false);
  const [noData, setNoData] = useState(true);

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
    // Gọi hàm checkIfProductIsFavorite ngay khi vào trang
    checkIfProductIsFavorite();
  }, [productId, refreshing]);

  const fetchDataProduct = async () => {
    try {
      const productService = new ProductService();
      const result = await productService.getProductId(productId);

      console.log(
        '---------------products data id:',
        productId,
        '-----Object.keys(result.data)------',
        Object.keys(result.data),
      );
      setProductIdData(result.data);
      if (result.data && Object.keys(result.data).length > 0) {
        // `result.data` không rỗng
        setNoData(false);
      } else {
        // `result.data` rỗng hoặc là một giá trị "falsy"
        setNoData(true);
      }
    } catch (error) {
      setError('err');
    }
  };

  const fetchDataCommentProduct = async () => {
    try {
      setLoading(true);
      const productService = new ProductService();
      const result = await productService.getCommentProductId(productId);

      console.log('getCommentProductId---', Object.keys(result.data));
      setCommentProductIdData(result.data);
      if (result.data && Object.keys(result.data).length > 0) {
        // `result.data` không rỗng
        setNoData(false);
      } else {
        // `result.data` rỗng hoặc là một giá trị "falsy"
        setNoData(true);
      }
    } catch (error) {
      setError('err' + error);
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
      // Disable the button while handling the press
      const favoriteService = new FavoriteService();

      if (isFavorite) {
        // Nếu sản phẩm đã có trong danh sách yêu thích, thì xóa nó đi
        const removeResult = await favoriteService.deleteFavorite(favoriteId);
        console.log('xóa yêu thích -----', removeResult?.status);

        if (removeResult) {
          Toast.show({
            text1: 'Xóa thành công khỏi mục yêu thích',
            type: 'success',
          });
          setIsFavorite(false);
        } else {
          // Xử lý trường hợp không thành công nếu cần
          console.log('Xóa yêu thích không thành công');
        }
      } else {
        // Nếu sản phẩm chưa có trong danh sách yêu thích, thêm nó vào
        const addPavoriteResult = await favoriteService.addFavorite({
          productId,
          AccountId,
        });
        console.log('Thêm vào danh sách yêu thích thành công', addPavoriteResult.status);
        if (addPavoriteResult) {
          Toast.show({
            text1: 'Đã thêm thành công vào danh sách yêu thích',
            type: 'success',
          });
          setIsFavorite(true);
          setFavoriteId(addPavoriteResult.data.id); // Lưu ID mới tạo được
        }
      }

      // After adding/removing from favorites, fetch the updated data
      //await fetchDataProduct();
      await checkIfProductIsFavorite();
    } catch (error) {
      console.log('error: ', error);
    }
  };

  // kiem tra xem account này có yêu thích sản phẩm này không
  const checkIfProductIsFavorite = async () => {
    try {
      const favoriteService = new FavoriteService();
      const favoriteResult = await favoriteService.fetchFavorite(AccountId);
      const favorites = favoriteResult.data;

      // Kiểm tra xem sản phẩm đã có trong danh sách yêu thích hay chưa
      const isProductInFavorites = favorites.some(favorite => {
        if (favorite.productId === productId) {
          //console.log('Favorite ID:----', favorite.id);
          setFavoriteId(favorite.id);
          return true; // Returning true means the product is found in favorites
        }
        return false; // Continue searching
      });

      // Cập nhật trạng thái isFavorite
      setIsFavorite(isProductInFavorites);
    } catch (error) {
      console.log('Error checking liked products:', error);
      setLoading(true);
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

  const renderItemComments = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity activeOpacity={0.8} onPress={goToReviewProduct}>
          <View>
            <View>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.itemCmtContainer}>
                  {item.Account.avatar == '' ? (
                    <Image style={styles.imgCmtAvatar} source={require('../../../assets/images/user.png')} />
                  ) : (
                    <Image style={styles.imgCmtAvatar} source={{uri: item.Account.avatar}} />
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
              {item.images ? <Image style={styles.imgCmtBody} source={{uri: item.images}} /> : null}
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

  const {colorProducts} = productIdData;

  const renderItemColorModal = ({item, index}) => {
    return (
      <View key={item.id} style={styles.btnColorsContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setProductColorIdModal(item?.id); // add

            setSelectedImageModal(item?.image); //view

            setSelectedColorId(item?.id || null); //btn

            setIsBtnAddToCart(false);
            setSelectedColorConfigId(0);
            setIsRenderColorConfigId(item?.colorConfigs.length === 0 ? true : false);
            const has = selectedColorId === item.id ? false : true;
            setHasColorId(has);
            setHasColorConfigId(item?.colorConfigs.length === 0 ? false : true);
            setProductColorConfigIdModal(item?.colorConfigs.length === 0 ? '' : ProductColorConfigIdModal);
          }}
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

  const renderItemColorConfigModal = ({item, index}) => {
    const colorConfigs = item.colorConfigs;

    const filteredColorConfigs = colorConfigs.filter(configItem => configItem.ProductColorId === selectedColorId);
    return (
      <View key={filteredColorConfigs.id} style={styles.btnColorsContainer}>
        {filteredColorConfigs.map(configItem => (
          <TouchableOpacity
            key={configItem.id}
            activeOpacity={0.8}
            onPress={() => {
              setProductColorConfigIdModal(configItem.configId);
              setProductColorIdModal(configItem.ProductColorId);

              setSelectedPriceModal(configItem.price);
              setSelectedQuantityModal(configItem.quantity || 0);
              setSelectedColorConfigId(configItem.configId || null);

              const has = selectedColorConfigId === configItem.configId ? false : true;
              setIsBtnAddToCart(true);
              setHasColorConfigId(has);
            }}
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

  const [modalVisible, setModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState('');
  // get data

  // add du lieu hien thi
  const [selectedImageModal, setSelectedImageModal] = useState('');
  const [selectedPriceModal, setSelectedPriceModal] = useState(0);
  const [selectedQuantityModal, setSelectedQuantityModal] = useState(0);

  const [productColorIdModal, setProductColorIdModal] = useState(''); // truyen ProductColorId nay
  const [ProductColorConfigIdModal, setProductColorConfigIdModal] = useState(''); // truyen ProductColorConfigId nay
  const [selectedCountModal, setSelectedCountModal] = useState(1); // truyen

  const handleDecrease = () => {
    // Giảm số lượng, nhưng không thể nhỏ hơn 1
    if (hasColorId && hasColorConfigId) {
      setSelectedCountModal(prevCount => Math.max(prevCount - 1, 1));
    }
  };
  const handleIncrease = () => {
    // Tăng số lượng
    if (hasColorId && hasColorConfigId) {
      setSelectedCountModal(prevCount => Math.min(prevCount + 1, selectedQuantityModal || 1));
    }
  };

  const [selectedColorId, setSelectedColorId] = useState(0);
  const [selectedColorConfigId, setSelectedColorConfigId] = useState(0);
  const [hasColorId, setHasColorId] = useState<boolean>(false);
  const [hasColorConfigId, setHasColorConfigId] = useState<boolean>(false);
  const [isRenderColorConfigId, setIsRenderColorConfigId] = useState<boolean>(false);

  const handleAddToCart = async () => {
    try {
      if (selectedCountModal && productColorIdModal && ProductColorConfigIdModal) {
        const cartService = new CartService();

        const addCartData = {
          productId: productIdData?.id,
          AccountId: AccountId,
          quantity: selectedCountModal,
          ProductColorId: productColorIdModal,
          ProductColorConfigId: ProductColorConfigIdModal,
        };

        console.log('addCartData---', addCartData);

        if (hasColorId && hasColorConfigId) {
          const result = await cartService.postCart(addCartData);

          console.log('result---', result);

          // Hiển thị toast khi thành công
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Thành công',
            text2: 'Đã thêm vào giỏ hàng',
          });
        }
      } else {
        // Handle the case where one or more of the required variables are missing
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Thông báo',
          text2: 'Vui lòng chọn đầy đủ thông tin trước khi thêm vào giỏ hàng !',
        });
      }
    } catch (error) {
      console.log('error: ', error);

      // Hiển thị toast khi có lỗi
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Thông báo',
        text2: 'Không thể thêm vào giỏ hàng !',
      });
    }
  };

  const handleBuyNow = () => {
    console.log('mua ngay: ');
  };
  const handleModalPress = () => {
    // Đóng Modal khi người dùng ấn vào nền bên ngoài
    setModalVisible(!modalVisible);
    setModalVisible(false);
    setModalAction('');
    if (productIdData?.images && productIdData?.price && getQuantitys(productIdData)) {
      setSelectedImageModal(productIdData?.images || '');
      setSelectedPriceModal(productIdData?.price || 0);
      setSelectedQuantityModal(getQuantitys(productIdData) || 0);
    }
    setProductColorIdModal('');
    setProductColorConfigIdModal('');
    setSelectedCountModal(1);
    setSelectedColorId(0);
    setSelectedColorConfigId(0);
    setHasColorId(false);
    setHasColorConfigId(false);
    setIsBtnAddToCart(false);
    setIsRenderColorConfigId(false);
  };

  useEffect(() => {
    // Kiểm tra giá trị trước khi gán vào state
    if (productIdData?.images && productIdData?.price && getQuantitys(productIdData)) {
      setSelectedImageModal(productIdData?.images || '');
      setSelectedPriceModal(productIdData?.price || 0);
      setSelectedQuantityModal(getQuantitys(productIdData) || 0);
    }
  }, [productIdData]);

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
                style={{width: hs(120), height: hs(120)}}
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
                            source={{uri: productIdData?.images} || require('../../../assets/images/noimage.jpg')}
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
                              // Xử lý thông tin vị trí ở đây, ví dụ: console.log(index);
                              console.log('index-----------------z', colorId);
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

                      <View style={styles.priceNameViewStarContainer}>
                        <Text style={styles.priceText}>{formatPrice(productIdData?.price || 0)}</Text>

                        <View style={styles.nameContainer}>
                          <Text style={styles.textName}>{productIdData?.name || ''}</Text>
                        </View>

                        <View style={styles.viewStar}>
                          <Image style={styles.imgStar} source={require('../../../assets/images/star4.png')} />
                          <Text style={styles.textStar}>{productIdData?.averageRating || 0.0}</Text>
                          <Text style={styles.textCmt}>({getQuantitys(productIdData) || 0})</Text>
                          <Text style={styles.textSell}>| Đã bán : </Text>
                          <Text style={styles.textSellNumber}>123</Text>
                        </View>
                      </View>

                      <View style={styles.flatListColorsContainer}>
                        <FlatList
                          horizontal
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
                                  <Text style={styles.numberReviews}>({productIdData?.commentCount || 0})</Text>
                                </View>

                                <View style={styles.starPoint}>
                                  <Text style={styles.pointText}>
                                    {parseFloat(productIdData?.averageRating).toFixed(1) || '0.0'}
                                  </Text>
                                  <Text style={styles.pointText}> / 5 </Text>
                                  <View style={styles.imgStarContainer}>
                                    {isNaN(parseFloat(productIdData?.averageRating)) ||
                                    !isFinite(productIdData?.averageRating) ? (
                                      <>
                                        {Array.from({length: 5}).map((_, index) => (
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

                      <>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          style={styles.btnSeeMoreComment}
                          onPress={goToReviewProduct}>
                          <Text style={styles.seeMoreReviewsText}>Xem thêm</Text>
                        </TouchableOpacity>
                        <Text style={[styles.borderBottom, {flex: 0.01}]}></Text>
                      </>
                    </View>
                  </>
                )}
                nestedScrollEnabled // Bật tính năng cuộn lồng
              />

              <View style={styles.BuyandAddtoCartContainer}>
                <TouchableOpacity
                  onPress={() => {
                    console.log('them vao gio hang');
                    setModalVisible(true);
                    setModalAction('addToCart');
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
                    console.log('mua ngay');
                    setModalVisible(true);
                    setModalAction('buyNow');
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
                  console.log('Modal has been closed.');
                  setModalVisible(!modalVisible);
                }}>
                <TouchableWithoutFeedback onPress={handleModalPress}>
                  <View style={styles.centeredViewModal}>
                    <TouchableWithoutFeedback>
                      <View style={styles.modalView}>
                        <View style={styles.productModal}>
                          <Image
                            source={{uri: selectedImageModal} || require('../../../assets/images/noimage.jpg')}
                            style={styles.productModalImage}
                          />
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
                        <Text style={[styles.borderBottom]}></Text>

                        {/* Màu */}
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

                        {/* RAM */}

                        <View style={styles.modalProductConfigContainer}>
                          {isRenderColorConfigId ? <></> : <Text style={styles.modalProductConfigTitle}>Ram</Text>}

                          <View style={{}}>
                            <FlatList
                              horizontal
                              showsHorizontalScrollIndicator={false}
                              data={colorProducts || []}
                              keyExtractor={item => item.id.toString()}
                              renderItem={renderItemColorConfigModal}
                            />
                          </View>
                        </View>
                        <Text style={styles.borderBottom}></Text>

                        {/* Số lượng */}
                        <View style={styles.modalNumberProductContainer}>
                          <Text style={styles.modalNumberProductTitle}>Số lượng</Text>
                          <View style={styles.modalQuantityProductContainer}>
                            <TouchableOpacity
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
                        <Text style={[styles.borderBottom, {flex: 0.01}]}></Text>

                        <TouchableOpacity
                          activeOpacity={0.8}
                          style={styles.modalBtnAdd}
                          onPress={() => {
                            if (isBtnAddToCart) {
                              if (modalAction === 'addToCart') {
                                handleAddToCart();
                              } else if (modalAction === 'buyNow') {
                                handleBuyNow();
                              }
                              setModalVisible(!modalVisible);
                            } else {
                              Toast.show({
                                type: 'error',
                                position: 'top',
                                text1: 'Thông báo',
                                text2: 'Vui lòng chọn màu có hàng !',
                                visibilityTime: 1500,
                              });
                            }
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
