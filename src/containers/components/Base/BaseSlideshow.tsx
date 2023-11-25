import React, { useState, useRef } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

const DATA = [
  { id: '1', image: 'https://example.com/image1.jpg' },
  { id: '2', image: 'https://example.com/image2.jpg' },
  { id: '3', image: 'https://example.com/image3.jpg' },
  // Thêm các hình ảnh khác vào đây
];

const windowWidth = Dimensions.get('window').width;

export default function BaseSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / windowWidth);
          setActiveIndex(newIndex);
        }}
        ref={flatListRef}
      />
      <View style={styles.pagination}>
        {DATA.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.activeDot,
            ]}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: windowWidth,
    height: 200, // Điều chỉnh chiều cao của ảnh theo nhu cầu
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    margin: 5,
  },
  activeDot: {
    backgroundColor: 'blue',
  },
});
