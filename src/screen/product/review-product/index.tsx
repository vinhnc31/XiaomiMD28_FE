import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import BaseHeader from '@src/containers/components/Base/BaseHeader';
import {GuestStackParam} from '@src/navigations/GuestNavigation/stackParam';
import {GUEST_NAVIGATION} from '@src/navigations/routes';
import {goBack} from '@src/navigations/services';
import React, {useEffect, useState, useRef} from 'react';
import {FlatList, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

import styles from './styles';
import {ScrollView} from 'react-native';
import {hs, vs, ms} from '@src/styles/scalingUtils';
import R from '@src/res';

interface Props {
  navigation: NativeStackNavigationProp<GuestStackParam>;
  route: RouteProp<GuestStackParam, GUEST_NAVIGATION.REVIEWPRODUCT>;
}

const ReviewProductScreen = (props: Props) => {
  const route = props.route;
  const commentData = route.params ? route.params.commentProductData : undefined;

  // { phân sang phần comment
  const [page, setPage] = useState(1);
  const [pageSize, setpageSize] = useState(40);
  const initialCommentsToShow = 40;
  const [commentsToShow, setCommentsToShow] = useState(initialCommentsToShow);
  const startIndex = 0;
  const endIndex = page + pageSize;
  const getProductCommentsToShow = () => commentData.slice(startIndex, commentsToShow);
  const handleSeeMoreComments = () => {
    // Increase the number of comments to show by pageSize
    setCommentsToShow(prev => prev + pageSize);
    setPage(prevPage => prevPage + 1);
  };
  const handleBackPress = () => {
    goBack();
  };

  const handleCartPress = () => {};

  const renderItemComments = ({item, index}) => {
    // Kiểm tra xem colorId của item có trùng với colorIdSlider hay không

    return (
      <View style={{marginHorizontal: hs(10)}}>
        <TouchableOpacity activeOpacity={0.8}>
          <View>
            <View>
              <View style={{flexDirection: 'row', marginTop: vs(7)}}>
                <View style={styles.itemCmtContainer}>
                  <Image style={styles.imgCmtAvatar} source={require('../../../assets/images/user.png')} />
                  <Text style={styles.txtCmtName}>{'Người dùng '}{item?.AccountId || ''}</Text>
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
              <Text style={styles.txtCmtBody}>
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

  const renderNoDataMessage = () => {
    if (commentData.length === 0) {
      return (
        <View style={styles.noDataContainer}>
          <Image style={{width: hs(120), height: hs(120)}} source={require('../../../assets/images/noDataStar.png')}/>
          <Text style={styles.noDataText}>Chưa có đánh giá</Text>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FBEFE5'}}>
      <BaseHeader title={'Đánh giá'} onCartPress={handleCartPress} onBackPress={handleBackPress} />

      {renderNoDataMessage()}

      {commentData.length > 0 && (
        <View
          style={{paddingHorizontal: 8, backgroundColor: '#FFF', flexDirection: 'column', flex: 1, marginTop: vs(12)}}>
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
              <TouchableOpacity activeOpacity={0.8} style={styles.btnSeeMoreComment} onPress={handleSeeMoreComments}>
                <Text style={styles.seeMoreReviewsText}>Xem thêm</Text>
              </TouchableOpacity>
              <Text style={styles.borderBottom}></Text>
            </>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default React.memo(ReviewProductScreen);
