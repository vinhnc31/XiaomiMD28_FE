import {ms, vs} from '@src/styles/scalingUtils';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    height: vs(70),
  },

  textTitle: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: vs(70),
    marginTop: vs(5),
    backgroundColor: 'white',
  },

  title: {
    fontSize: 35,
    marginLeft: 15,
    color: '#2A2A2A',
    fontFamily: 'LibreBaskerville-Bold',
  },

  buttonContainer: {
    flex: 1.7,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // list yeu thich
  text: {
    fontSize: 18,
    color: '#2A2A2A',
    fontWeight: '400',
    fontFamily: 'LibreBaskerville-Bold',
  },
  //danh sach yeu thich
  flatListContainer: {
    flex: 1,
    flexDirection: 'column', // Chia đều theo chiều dọc
  },
  item: {
    flex: 1,
    height: 265,
    marginTop: 8,
    marginBottom: 10,
    borderBottomWidth: 1, // Độ dày của đường kẻ border bên dưới
    borderBottomColor: '#C2C2C2', // Màu sắc của đường kẻ border bên dưới
    borderTopWidth: 0, // Độ dày của đường kẻ border bên trên (0px)

    elevation: 2, // Độ sâu của đổ bóng (cho Android)
    shadowColor: 'black', // Màu của đổ bóng (cho iOS)
    shadowOffset: {width: 0, height: 2}, // Độ dài và độ rộng của đổ bóng (cho iOS)
    shadowOpacity: 0.2, // Độ trong suốt của đổ bóng (cho iOS)
    shadowRadius: 2, // Bán kính của đổ bóng (cho iOS)
  },
  imageContainer: {
    flex: 4,
    height: 265,
    marginVertical: vs(15),
    backgroundColor: '#EFEFEF',
  },

  image: {
    flex: 1,
    height: '100%', // Ảnh sẽ đầy màn hình theo chiều cao
    width: 'auto',
  },
  overlay: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.2)', // Màu nền cho dòng văn bản (với độ trong suốt)
  },
  imgFavourite: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginBottom: 6,
  },
  //view đánh giá sản phẩm
  viewStar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  imgStar: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  textCmt: {
    color: '#817F7F', // Màu văn bản
    fontSize: 18,
    fontFamily: 'LibreBaskerville-Bold',
    marginLeft: 5,
  },
});
