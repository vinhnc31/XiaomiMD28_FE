import {View, Text, Dimensions, FlatList, Image, StyleSheet, Pressable} from 'react-native';
import React, {useState, useRef} from 'react';

const SCREEN_WIDTH = Dimensions.get('window').width;
const maxSlide = 10;
interface CarouselProps {
  data: Array<{id: string; image: string}>;
}

const Carousel: React.FC<CarouselProps> = ({data}) => {
  const flatlistRef = useRef<FlatList | null>(null);
  const [slide, setSlide] = useState(1);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  const onPrevious = () => {
    if (slide === 1) return;
    if (flatlistRef.current) {
      flatlistRef.current.scrollToIndex({index: slide - 2});
    }
  };
  const onNext = () => {
    if (slide === data.length) return;
    if (flatlistRef.current) {
      flatlistRef.current.scrollToIndex({index: slide});
    }
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        ref={flatlistRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SCREEN_WIDTH}
        snapToAlignment="center"
        decelerationRate={'fast'}
        pagingEnabled={true}
        onScroll={event => {
          const offset = event.nativeEvent.contentOffset.x / SCREEN_WIDTH;
          const hasDecimal = offset - Math.floor(offset) !== 0;
          if (!hasDecimal) {
            const newSlide = offset + 1;
            if (newSlide >= 1 && newSlide <= data.length) setSlide(newSlide);
            setPrevDisabled(newSlide === 1);
            setNextDisabled(newSlide === data.length);
          }
        }}
        scrollEventThrottle={0}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          if (!item.image) return <Text style={{}}>None</Text>;
          return (
            <View style={{width: SCREEN_WIDTH, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={{uri: item.image}} style={styles.image} />
            </View>
          );
        }}
      />
      <View style={styles.footer}>
        <Pressable
          onPress={onPrevious}
          disabled={prevDisabled}
          style={({pressed}) => [{opacity: pressed || prevDisabled ? 0.5 : 1}]}>
          <Text style={styles.btnTxt}>←</Text>
        </Pressable>
        {/* {[...Array(maxSlide).keys()].map(i => {
          let slideNumber = i + 1;
          if (slide > maxSlide) slideNumber = Math.floor(slide / maxSlide) * maxSlide + slideNumber;
          if (slideNumber < data.length) {
            return (
              <Pressable
                onPress={() => flatlistRef.current?.scrollToIndex({index: slideNumber - 1})}
                style={{ position: 'relative', top: 100, zIndex: 2,}}>
                <Text
                  style={{
                    fontWeight: slide === slideNumber ? '900' : '500',
                    fontSize: slide === slideNumber ? 50 : 40,
                    color: slide === slideNumber ? 'red' : 'black',
                  }}>.
                </Text>
              </Pressable>
            );
          }
        })} */}
        {/* <Text style={{marginTop: 150}}>Slider number: {slide}</Text> */}
        <Pressable
          onPress={onNext}
          disabled={nextDisabled}
          style={({pressed}) => [{opacity: pressed || nextDisabled ? 0.5 : 1}]}>
          <Text style={styles.btnTxt}>→</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  image: {
    width: '95%',
    height: SCREEN_WIDTH - 10,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  footer: {
    position: 'absolute',
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  btnTxt: {
    fontSize: 30,
    width: 30,
    height: 30,
    marginTop: 30,
  },
});
