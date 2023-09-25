import * as React from 'react';
import {ForwardedRef, useImperativeHandle} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
// @ts-ignore
export interface PopupChooseMediasProps {
  onImagesSelected?: (images: string[]) => void;
  onImageSelected?: (images: any) => void;
  multiple?: boolean;
  isVideo?: boolean;
  isAudio?: boolean;
  isAvatar?: boolean;
}

export interface ChooseMediasRef {
  onShow: () => void;
  onHide: () => void;
}

const TIME_OUT_MODAL = 800;

export const MIME_TYPE_MAP: any = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};
interface ButtonProps {
  onPress: () => void;
  text: string;
  noBorderBottom?: boolean;
}

const Button = (props: ButtonProps) => (
  <View style={styles.wrapperButton}>
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.8}>
      <Text style={styles.colorButton}>{props.text}</Text>
    </TouchableOpacity>
  </View>
);

function PopupChooseMedias(props: PopupChooseMediasProps, ref: ForwardedRef<ChooseMediasRef>) {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const timeoutChoosePhotoRef = React.useRef<number>(0);
  const timeoutTakePhotoRef = React.useRef<number>(0);
  const timeoutChooseVideoRef = React.useRef<number>(0);

  const MAX_WIDTH_HEIGHT = 900;

  const MAX_WIDTH_HEIGHT_AVATAR = 350;

  const handleChoosePhoto = () => {
    ImagePicker.openPicker({
      multiple: props.multiple || false,
      compressImageMaxWidth: props.isAvatar ? MAX_WIDTH_HEIGHT_AVATAR : MAX_WIDTH_HEIGHT,
      compressImageMaxHeight: props.isAvatar ? MAX_WIDTH_HEIGHT_AVATAR : MAX_WIDTH_HEIGHT,
      mediaType: 'photo',
      compressImageQuality: 0.5,
      cropping: props.isAvatar ? true : false,
    }).then((images: any) => {
      if (!props.multiple) {
        images = [images];
      }
      props.onImageSelected && props.onImageSelected(images[0]);
      // onUploadImageCache(images as any[]);
    });
  };

  const handleTakePhoto = (): void => {
    ImagePicker.openCamera({
      width: MAX_WIDTH_HEIGHT,
      height: MAX_WIDTH_HEIGHT,
    }).then((images: any) => {
      props.onImageSelected && props.onImageSelected(images);
      // onUploadImageCache([images]);
    });
  };

  const handleChooseVideo = (): void => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then((res: any) => {
      const video = {
        video: {
          uri: res.path,
          type: 'video/mp4',
          name: 'card.mp4',
        },
      };
      // onUploadVideoCache(video);
    });
  };

  const onShow = (): void => {
    setIsVisible(true);
  };

  const onHide = (): void => {
    setIsVisible(false);
  };

  useImperativeHandle(ref, () => ({onShow, onHide}));

  const onChoosePhoto = (): void => {
    if (timeoutChoosePhotoRef.current) {
      clearTimeout(timeoutChoosePhotoRef.current);
    }
    setIsVisible(false);
    // @ts-ignore
    timeoutChoosePhotoRef.current = setTimeout(() => {
      handleChoosePhoto();
    }, TIME_OUT_MODAL);
  };

  const onTakeCamera = (): void => {
    if (timeoutTakePhotoRef.current) {
      clearTimeout(timeoutTakePhotoRef.current);
    }
    setIsVisible(false);
    // @ts-ignore
    timeoutTakePhotoRef.current = setTimeout(() => {
      handleTakePhoto();
    }, TIME_OUT_MODAL);
  };

  const onChooseVideo = (): void => {
    if (timeoutChooseVideoRef.current) {
      clearTimeout(timeoutChooseVideoRef.current);
    }
    setIsVisible(false);
    // @ts-ignore
    timeoutChooseVideoRef.current = setTimeout(() => {
      handleChooseVideo();
    }, TIME_OUT_MODAL);
  };

  // const onChooseAudio = (): void => {
  //     setState({ isVisible: false }, () => {
  //         setTimeout(() => {
  //             presenter.onChooseAudio();
  //         }, TIME_OUT_MODAL);
  //     });
  // };

  const renderModalContent = (): React.ReactChild => {
    const {isVideo} = props;
    return (
      <>
        <View style={styles.modalContent}>
          {/* Tiêu đề */}
          <View style={styles.wrapperButton}>
            <Text style={styles.titleStyle}>{'Chọn ảnh'}</Text>
          </View>

          {/* Chụp ảnh từ camera */}
          <Button onPress={onTakeCamera} text={'Camera'} />

          {/* Chọn ảnh từ thư viện */}
          <Button onPress={onChoosePhoto} text={'Thư Viện'} />

          {/* Chọn video từ thư viện */}
          {isVideo ? <Button onPress={onChooseVideo} text={'Video'} /> : null}
        </View>
        {/* Button tắt modal chọn ảnh */}
        <TouchableOpacity style={styles.cancelStyle} onPress={onHide} activeOpacity={0.8}>
          <Text style={styles.textCancel}>{'Hủy'}</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <Modal visible={isVisible} onRequestClose={onHide} transparent animationType="fade">
      <View style={styles.modalWrap}>
        <TouchableOpacity activeOpacity={1} onPress={onHide} style={styles.btnClose} />
        {renderModalContent()}
      </View>
    </Modal>
  );
}

export default React.forwardRef(PopupChooseMedias);
const styles = StyleSheet.create({
  modalWrap: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  btnClose: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  wrapperButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderTopWidth: 0.4,
    borderTopColor: '#CCCCCC',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  wrapperButtonNoBorder: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
  },
  colorButton: {
    textAlign: 'center',
    fontSize: 19,
    color: '#1976d2',
  },
  cancelStyle: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: 55,
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 40 + 10,
  },
  textCancel: {
    textAlign: 'center',
    fontSize: 20,
    color: '#F50808',
  },
  titleStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
