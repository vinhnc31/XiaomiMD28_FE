import React, { useState, useEffect, useRef } from 'react';
import { View, Dimensions, FlatList, Image, StyleSheet, Pressable, TouchableWithoutFeedback } from 'react-native';
import { hs, vs, ms } from '@src/styles/scalingUtils';
import { navigateToPage } from '@src/navigations/services';
import { APP_NAVIGATION } from '@src/navigations/routes';
import { TouchableOpacity } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

interface ColorItem {
  id: number;
  images: string;
}

interface CarouselProps {
  data: Array<ColorItem>;
  onColorChanged?: (colorId: number) => void;
  slideshowInterval?: number; // Khoảng thời gian chuyển đổi ảnh theo mili giây
}

const Carousel: React.FC<CarouselProps> = ({ data, onColorChanged, slideshowInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<FlatList<ColorItem>>(null);
  const [flatListWidth, setFlatListWidth] = useState(SCREEN_WIDTH);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length;
      swiperRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, slideshowInterval);

    return () => clearInterval(intervalId);
  }, [currentIndex, data.length, slideshowInterval]);

  const handleColorChanged = (colorId: number) => {
    setCurrentIndex(data.findIndex(item => item.id === colorId));
    if (onColorChanged) {
      onColorChanged(colorId);
    }
  };

  const handleScroll = (event: any) => {
    setCurrentIndex(Math.round(event.nativeEvent.contentOffset.x / flatListWidth));
  };

  const handleMomentumScrollEnd = (event: any) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / flatListWidth);
    setCurrentIndex(newIndex >= 0 && newIndex < data.length ? newIndex : 0);
    const selectedColorId = data[newIndex >= 0 && newIndex < data.length ? newIndex : 0]?.id || null;
    handleColorChanged(selectedColorId);
  };

  const getItemLayout = (_: any, index: number) => ({
    length: flatListWidth,
    offset: flatListWidth * index,
    index,
  });

  const goToDetailProducts = (id: number) => {
    navigateToPage(APP_NAVIGATION.DETAILSPRODUCT, {productId: id});
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={swiperRef}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => (
            <TouchableWithoutFeedback key={item.id} onPress={() => goToDetailProducts(item.id)} style={styles.slideContainer}>
              <View style={styles.slide}>
                <Image source={{ uri: item.images }} style={styles.image} />
              </View>

            </TouchableWithoutFeedback>
        )}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        initialScrollIndex={currentIndex}
        getItemLayout={getItemLayout}
        onLayout={(event) => {
          setFlatListWidth(event.nativeEvent.layout.width);
        }}
      />

      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === currentIndex && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: SCREEN_WIDTH,
    height: '100%',
    resizeMode: 'cover',
  },
  slideContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.3, // Điều chỉnh chiều cao của slide container tại đây
  },
  slide: {
    flex: 1,
    width: '100%',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: 'white',
    width: hs(8),
    height: vs(8),
    borderRadius: ms(4),
    marginVertical: vs(3),
    marginHorizontal: hs(3),
    borderWidth: 0.2,
  },
  activeDot: {
    backgroundColor: '#FF6900',
    width: hs(20), // Kích thước của dấu chấm khi được chọn
  },
});

export default Carousel;
