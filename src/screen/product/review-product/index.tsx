import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import BaseHeader from '@src/containers/components/Base/BaseHeader';
import {GuestStackParam} from '@src/navigations/GuestNavigation/stackParam';
import {GUEST_NAVIGATION, APP_NAVIGATION} from '@src/navigations/routes';
import {navigateToPage, goBack} from '@src/navigations/services';
import React, {useEffect, useState, useRef} from 'react';
import {FlatList, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useAuth} from '@src/hooks/useAuth';
import {CartModel} from '@src/services/cart/cart.model';
import CartService from '@src/services/cart';
import styles from './styles';
import {hs, vs, ms} from '@src/styles/scalingUtils';

interface Props {
  navigation: NativeStackNavigationProp<GuestStackParam>;
  route: RouteProp<GuestStackParam, GUEST_NAVIGATION.REVIEWPRODUCT>;
}

const ReviewProductScreen = (props: Props) => {
  const route = props.route;
  const commentData = route.params ? route.params.commentProductData : undefined;
  const productName = route.params ? route.params.productName : undefined;

  const {user} = useAuth();
  const [cartData, setCartData] = useState<CartModel[]>([]);
  const cartService = new CartService();

  useEffect(() => {
    featchCart();
  }, []);

  const featchCart = async () => {
    const resultCart = await cartService.fetchCart(user?.id!);
    setCartData(resultCart.data);
  };

  // { phân sang phần comment
  const [page, setPage] = useState(1);
  const [pageSize, setpageSize] = useState(30);
  const initialCommentsToShow = 30;
  const [commentsToShow, setCommentsToShow] = useState(initialCommentsToShow);
  const startIndex = 0;
  const endIndex = page + pageSize;
  //const getProductCommentsToShow = () => commentData.slice(startIndex, commentsToShow);
  const getProductCommentsToShow = () => {
    return commentData.slice(startIndex, commentsToShow).map(comment => ({
      ...comment,
      productName: productName,
    }));
  };
  const handleSeeMoreComments = () => {
    // Increase the number of comments to show by pageSize
    setCommentsToShow(prev => prev + pageSize);
    setPage(prevPage => prevPage + 1);
  };
  const handleBackPress = () => {
    goBack();
  };

  const handleCartPress = () => {
    navigateToPage(GUEST_NAVIGATION.CART);
  };

  const renderItemComments = ({item, index}) => {
    return (
      <View style={{marginHorizontal: hs(10)}}>
        <TouchableOpacity activeOpacity={0.8}>
          <View>
            <View>
              <View style={{flexDirection: 'row', marginTop: vs(7)}}>
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

            <View style={{marginVertical: vs(10)}}>
              <Text style={styles.txtCmtBody}>{item?.commentBody || ''}</Text>
              {item.images ? <Image style={styles.imgCmtBody} source={{uri: item.images}} /> : null}
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.borderBottom}></View>
      </View>
    );
  };

  const renderNoDataMessage = () => {
    if (commentData.length === 0) {
      return (
        <View style={styles.noDataContainer}>
          <Image style={{width: hs(120), height: hs(120)}} source={require('../../../assets/images/noDataStar.png')} />
          <Text style={styles.noDataText}>Chưa có đánh giá</Text>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FBEFE5'}}>
      <BaseHeader title={'Đánh giá'} onCartPress={handleCartPress} onBackPress={handleBackPress} data={cartData} />

      {renderNoDataMessage()}

      {commentData.length > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={['dummyData']} // Bạn có thể cung cấp một số dữ liệu giả mạo hoặc sử dụng một mục đơn làm đại diện
          keyExtractor={() => 'dummyKey'} // Sử dụng một hàm trích xuất khóa giả mạo
          renderItem={() => (
            <>
              <View
                style={{
                  paddingHorizontal: 8,
                  backgroundColor: '#FFF',
                  flexDirection: 'column',
                  flex: 1,
                  marginTop: vs(12),
                }}>
                <View style={{height: vs(55), justifyContent: 'center', paddingHorizontal: hs(10)}}>
                  <Text style={{color: '#000000', fontSize: ms(18), fontFamily: 'LibreBaskerville-Bold'}}>
                    Tất cả đánh giá
                  </Text>
                </View>
                <Text style={{width: '100%', borderBottomWidth: 2, borderColor: '#EEEEEE', flex: 0.01}}></Text>

                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={commentData ? getProductCommentsToShow() : []}
                  keyExtractor={item => item.id.toString()}
                  renderItem={renderItemComments}
                />
                {commentsToShow < commentData.length && (
                  <>
                    <Text style={styles.borderBottom}></Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.btnSeeMoreComment}
                      onPress={handleSeeMoreComments}>
                      <Text style={styles.seeMoreReviewsText}>Xem thêm</Text>
                    </TouchableOpacity>
                    <Text style={styles.borderBottom}></Text>
                  </>
                )}
              </View>
            </>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default React.memo(ReviewProductScreen);
