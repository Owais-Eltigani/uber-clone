import { useDriverStore } from '@/store';
import React from 'react';
import { Text, View } from 'react-native';

export default function BookRide() {
  const { selectedDriver } = useDriverStore();

  return (
    <View>
      <Text>BookRide : {selectedDriver}</Text>
    </View>
  );
}
