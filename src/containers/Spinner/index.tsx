import {useAppSelector} from '@src/stores';
import {Colors} from '@src/styles/colors';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import csStyles from './styles';

const SpinnerComponent = () => {
  const isLoading = useAppSelector(state => state.commonState.isLoading);

  return isLoading ? (
    <View style={csStyles.view_loading}>
      <View style={csStyles.viewContent}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    </View>
  ) : null;
};

export default React.memo(SpinnerComponent);
