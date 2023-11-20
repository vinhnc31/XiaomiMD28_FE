import { Dimensions, FlatList, Modal, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';

const deviceHeight = Dimensions.get('window').height;
export class BottomPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }
  }

  show = () => {
    this.setState({ show: true })
  }

  close = () => {
    this.setState({ show: false })
  }

  renderOutsideTouchable(onTouch) {
    const view = <View style={{ flex: 1, width: '100%' }} />
    if (!onTouch) return view

    return (
      <TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }}>
        {view}
      </TouchableWithoutFeedback>
    )
  }

  renderTitle = () => {
    const { title } = this.props;
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{
          color: 'black', fontSize: 25, fontWeight: '500', margin: 15
        }}>
          {title}
        </Text>
      </View>
    )
  }

  renderContent = () => {
    const { data } = this.props;
    return (
      <View>
        <FlatList
          style={{ marginBottom: 20 }}
          showVerticalScrollIndicator={false}
          data={data}
          renderItem={this.renderItems}
          extraData={data}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          contentContainerStyle={{
            paddingBottom: 40
          }}
        />
      </View>
    )
  }

  renderItems = ({ item }) => {
    return (
      <View style={{height: 46, flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: '400', color: '#182e44', marginLeft: 16}}>{item.name}</Text>
      </View>
    );
  };

  renderSeparator = () => {
    return (
      <View style={{
        opacity: 0.1,
        backgroundColor: '#182E44',
        height: 1
      }} />
    );
  };

  render() {
    let { show } = this.state;
    const { onToucheOutside, title } = this.props
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={show}
        onRequestClose={this.close}>
        <View style={{ flex: 1, backgroundColor: '#000000AA', justifyContent: 'flex-end' }}>
          {this.renderOutsideTouchable(onToucheOutside)}
          <View style={{
            backgroundColor: '#ffffff',
            width: '100%',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            paddingHorizontal: 10,
            maxHeight: deviceHeight * 0.5
          }}>
            {this.renderTitle()}
            {this.renderContent()}
          </View>

        </View>
      </Modal>
    )
  }
}