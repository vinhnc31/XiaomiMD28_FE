import { View, Text, Dimensions, FlatList, Image, StyleSheet, Pressable } from 'react-native';
import React, { useState, useRef } from 'react';
import Swiper from 'react-native-swiper';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface CarouselProps {
  data: Array<{ id: string; image: string }>;
}

const Carousel: React.FC<CarouselProps> = ({ data }) => {
  const [slide, setSlide] = useState(1);

  return (
    <View style={{ flex: 1 }}>
      <Swiper
        showsButtons={false}
        showsPagination={false}
        loop={false}
        autoplay={false}
        autoplayTimeout={2}
        onIndexChanged={(index) => setSlide(index + 1)}
      >
        {data.map((item) => (
          <View key={item.id} style={styles.slide}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
        ))}
      </Swiper>
      <View style={styles.pagination}>
        {data.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.dot,
              index + 1 === slide ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#fff',
  },

  
});

export default Carousel;