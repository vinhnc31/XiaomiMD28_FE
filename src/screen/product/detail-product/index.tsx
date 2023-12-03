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
import Toast from 'react-native-toast-message';
import {ToastAndroid} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

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
  const [favoriteId, setFavoriteId] = useState(0);

  // { phân sang phần comment
  const [page, setPage] = useState(1);
  const [pageSize, setpageSize] = useState(20);
  const initialCommentsToShow = 3;
  const [commentsToShow, setCommentsToShow] = useState(initialCommentsToShow);
  const startIndex = 0;
  const endIndex = page + pageSize;
  const getProductCommentsToShow = () => getProductComment(productIdData).slice(startIndex, commentsToShow);
  const handleSeeMoreComments = () => {
    // Increase the number of comments to show by pageSize
    setCommentsToShow(prev => prev + pageSize);
    setPage(prevPage => prevPage + 1);
  };
  // }

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
    setPage(1);
    await fetchDataProduct();
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
      const favoriteResult = await favoriteService.fetchFavorite(AccountId);
      const favorites = favoriteResult.data;

      // Kiểm tra xem sản phẩm đã có trong danh sách yêu thích hay chưa
      const isProductInFavorites = favorites.some(favorite => {
        if (favorite.productId === productId) {
          console.log('Favorite ID:', favorite.id);
          setFavoriteId(favorite.id);
          return true; // Returning true means the product is found in favorites
        }
        return false; // Continue searching
      });

      if (isFavorite) {
        // Nếu sản phẩm đã có trong danh sách yêu thích, thì xóa nó đi
        //const removeResult = await favoriteService.deleteFavorite(favoriteId);
        //console.log('xóa yêu thích -----', removeResult?.status);
        console.log('product có id { ', productId, ' } đã có trong yêu thích');

        // if (removeResult?.status === 201) {
        //   Toast.show({
        //     text1: 'Xóa thành công khỏi mục yêu thích',
        //     type: 'success',
        //   });
        //   setIsFavorite(false);
        // }
        Toast.show({
          text1: 'Thông báo',
          type: 'success',
          visibilityTime: 1500,
          position: 'top',
          text2: 'Xóa thành công khỏi mục yêu thích',
          autoHide: true,
          topOffset: 20,
          //keyboardOffset: 1,
        });
        return;
      } else {
        // Nếu sản phẩm chưa có trong danh sách yêu thích, thêm nó vào
        const addPavoriteResult = await favoriteService.addFavorite({
          productId,
          AccountId,
        });
        console.log('Thêm vào danh sách yêu thích thành công', addPavoriteResult.status);
        if (addPavoriteResult.status === 201) {
          setIsFavorite(true);
          Toast.show({
            text1: 'Đã thêm thành công vào danh sách yêu thích',
            type: 'success',
          });
        }
        return;
      }
      setLoading(false);
    } catch (error) {
      console.log('error: ', error);
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
          <Text style={styles.txtNameColors}>{item?.nameColor}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // lay dữ data comments trong data product
  const getProductComment = productData => {
    let dataComment = [];

    if (productData && productData.comments && Array.isArray(productData.comments)) {
      dataComment = productData.comments.map(comment => ({
        id: comment.id,
        images: comment.images,
        commentBody: comment.commentBody,
        star: comment.star,
        AccountId: comment.AccountId,
        productId: comment.productId,
      }));
    }

    return dataComment;
  };

  console.log('cmt-----------------------', getProductComment(productIdData));

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRAM, setSelectedRAM] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleRAMChange = ram => {
    setSelectedRAM(ram);
  };

  const handleQuantityChange = quantity => {
    setSelectedQuantity(quantity);
  };

  const renderItemComments = ({item, index}) => {
    // Kiểm tra xem colorId của item có trùng với colorIdSlider hay không

    return (
      <View>
        <TouchableOpacity>
          <View>
            <View>
              <View style={{flexDirection: 'row', }}>
                <View style={styles.itemCmtContainer}>
                  <Image style={styles.imgCmtAvatar} source={require('../../../assets/images/user.png')} />
                  <Text style={styles.txtCmtName}>NameID :{item?.AccountId || ''}</Text>
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
                    Điện thoại Xiaomi 14Điện thoại Xiaomi 14
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
                      style={styles.imgStarCmt}
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
              {item.images ? <Image style={styles.imgCmtBody} source={{uri: item.images}} /> : ''}
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.borderBottom}></View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.backContainer}>
        <TouchableOpacity onPress={handleBackPress} style={styles.iconbackContainer}>
          <Image source={require('../../../assets/images/back.png')} style={styles.iconBack} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.LoadingContainer}>
          <BaseLoading size={60} top={250} loading={true} />
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
                    {dataSlider(productIdData).length === [] ? (
                      <Carousel
                        data={dataSlider(productIdData) || []}
                        onColorChanged={colorId => {
                          // Xử lý thông tin vị trí ở đây, ví dụ: console.log(index);
                          console.log('index-----------------z', colorId);
                          setcolorIdSlider(colorId);
                        }}
                        colorIdButton={colorIdButtonSlider}
                      />
                    ) : (
                      <Image
                        source={{uri: productIdData?.images}}
                        style={{
                          width: hs(256),
                          height: vs(256),
                          resizeMode: 'contain',
                          borderRadius: ms(5),
                          alignItems: 'center',
                          alignSelf: 'center',
                        }}
                      />
                    )}
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
                    <TouchableOpacity onPress={handleSeeMoreComments}>
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
                                    {[...Array(5 - Math.floor(parseFloat(productIdData?.averageRating))).keys()].map(
                                      index => (
                                        <Image
                                          key={index}
                                          style={styles.imgStarCmt}
                                          source={require('../../../assets/images/star2.png')} // Use star2.png for remaining stars
                                        />
                                      ),
                                    )}
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
                      data={productIdData ? getProductCommentsToShow() : []}
                      keyExtractor={item => item.id.toString()}
                      renderItem={renderItemComments}
                    />
                    {commentsToShow < getProductComment(productIdData).length && (
                      <TouchableOpacity style={styles.btnSeeMoreComment} onPress={handleSeeMoreComments}>
                        <Text style={styles.seeMoreReviewsText}>Xem thêm</Text>
                      </TouchableOpacity>
                    )}
                  </View>
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
            <View style={styles.centeredViewModal}>
              <View style={styles.modalView}>
                <View style={styles.productModal}>
                  <Image source={require('../../../assets/images/demo.jpg')} style={styles.productModalImage} />
                  <View style={styles.productModalPriceQuantity}>
                    <Text style={styles.productModalPriceText}>{formatPrice(productIdData?.price || 0)}</Text>
                    <Text style={styles.productModalQuantityText}>Kho: {getQuantitys(productIdData) || 0}</Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setModalVisible(!modalVisible)}
                    style={styles.btnCloseModal}>
                    <Image source={require('../../../assets/images/closewhite.png')} style={styles.iconCloseModal} />
                  </TouchableOpacity>
                </View>
                <Text style={[styles.borderBottom]}></Text>

                {/* Màu */}
                <View style={styles.modalProductColorContainer}>
                  <Text style={styles.modalProductColorTitle}>Màu</Text>
                  <View style={{}}>
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

                {/* RAM */}
                <View style={styles.modalProductConfigContainer}>
                  <Text style={styles.modalProductConfigTitle}>Ram</Text>
                  <View style={{}}>
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
                <Text style={styles.borderBottom}></Text>

                {/* Số lượng */}
                <View style={styles.modalNumberProductContainer}>
                  <Text style={styles.modalNumberProductTitle}>Số lượng</Text>
                  <View style={styles.modalQuantityProductContainer}>
                    <TouchableOpacity activeOpacity={0.8} style={styles.modalBtnMinusPlus}>
                      <Image source={require('../../../assets/images/minus.png')} style={styles.modalIconMinusPlus} />
                    </TouchableOpacity>
                    <View style={styles.modalQuantiyTextContainer}>
                      <Text style={styles.modalQuantiyText}>1</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} style={styles.modalBtnMinusPlus}>
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
                    console.log('mua hoặc add to cart');
                  }}>
                  <Text style={styles.modalBtnText}>Thêm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
    </SafeAreaView>
  );
};

export default React.memo(DetailsScreen);
