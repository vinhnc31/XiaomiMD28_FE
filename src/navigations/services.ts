import {StackActions} from '@react-navigation/core';
import type {NavigationContainerRef} from '@react-navigation/native';
import * as React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export function navigateToPage(name: string, params?: object): void {
  navigationRef.current?.navigate(name, params);
}

export function pushToPage(name: string, params?: object): void {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}

export function goBack(): void {
  navigationRef.current?.goBack();
}

export function popMany(count?: number): void {
  navigationRef.current?.dispatch(StackActions.pop(count));
}

export function resetStack(name: string, params?: object): void {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name, params}],
  });
}

export function popToTop(): void {
  navigationRef.current?.dispatch(StackActions.popToTop());
}
