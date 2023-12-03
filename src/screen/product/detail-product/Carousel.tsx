import {View, Text, Dimensions, FlatList, Image, StyleSheet, Pressable, TouchableOpacity} from 'react-native';
import {ms, vs, hs} from '@src/styles/scalingUtils';
import React, {useState, useEffect, useRef} from 'react';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

interface ColorItem {
  id: number;
  colorId: number;
  image: string;
  nameColor: string;
}

interface CarouselProps {
  data: Array<ColorItem>;
  onColorChanged?: (colorId: number) => void;
  colorIdButton: number;
}

const Carousel: React.FC<CarouselProps> = ({data, onColorChanged, colorIdButton}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<FlatList<ColorItem>>(null);
  const [indexDot, setIndexDot] = useState(0);
  const [isButton, setIsButton] = useState(false);
  console.log('dataaaaaaaaaaaaaaaaaaaa', data);

  useEffect(() => {
    const index = data.findIndex(item => item.colorId === colorIdButton);
    if (index !== -1 && swiperRef.current) {
      swiperRef.current.scrollToItem({
        item: data[index],
        animated: true,
        viewPosition: 0.5, // Adjust this value as needed
      });
    }
    console.log('iiiiiiiiiiiiiiiiiii', index);
    console.log('bbbbbbbbbbbbbbbbbbb', isButton);
    setIndexDot(index);
    setIsButton(true);
  }, [colorIdButton]);

  const handleColorChanged = (colorId: number) => {
    setCurrentIndex(data.findIndex(item => item.colorId === colorId));
    if (onColorChanged) {
      onColorChanged(colorId);
      setIsButton(false);
    }
  };

  const handleScroll = (event: any) => {
    setCurrentIndex((event.nativeEvent.contentOffset.x / SCREEN_WIDTH).toFixed(0));
  };

  const handleMomentumScrollEnd = (event: any) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setCurrentIndex(newIndex >= 0 && newIndex < data.length ? newIndex : 0);
    const selectedColorId = data[newIndex >= 0 && newIndex < data.length ? newIndex : 0]?.colorId || null;
    handleColorChanged(selectedColorId);
  };

  const getItemLayout = (_: any, index: number) => ({
    length: SCREEN_WIDTH,
    offset: SCREEN_WIDTH * index,
    index,
  });

  return (
    <View style={{flex: 1}}>
      <FlatList
        ref={swiperRef}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <View key={item.id} style={styles.slide}>
            <Image source={{uri: item.image}} style={styles.image} />
          </View>
        )}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        initialScrollIndex={currentIndex}
        getItemLayout={getItemLayout}
      />

      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, (isButton ? index === indexDot : index === currentIndex) && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: hs(256),
    height: vs(256),
    resizeMode: 'contain',
    borderRadius: ms(5),
  },
  slide: {
    flex: 1,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  colorItem: {
    width: hs(30),
    height: vs(30),
    borderRadius: ms(15),
    borderWidth: 2,
    marginHorizontal: hs(5),
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
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: hs(8),
    height: vs(8),
    borderRadius: ms(4),
    marginVertical: vs(3),
    marginHorizontal: hs(3),
    borderWidth: 0.2,
  },
  activeDot: {
    backgroundColor: 'black',
    width: hs(10), // Kích thước của dấu chấm khi được chọn
  },
});

export default Carousel;
