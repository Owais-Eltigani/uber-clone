import CustomButton from '@/components/CustomButton';
import DriverCard from '@/components/DriverCard';
import RideLayout from '@/components/RideLayout';
import { useDriverStore } from '@/store';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, View } from 'react-native';

export default function ConfirmRide() {
  const { selectedDriver, drivers } = useDriverStore();

  console.log('confirmride: ', { selectedDriver });
  return (
    <RideLayout title="Choose Ride">
      <FlatList
        data={drivers}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <DriverCard item={item} />}
        ListFooterComponent={() => (
          <View className="mt-10 mx-5">
            <CustomButton
              title="Select Ride"
              onPress={() => router.push('/(root)/bookRide')}
            />
          </View>
        )}
      />
    </RideLayout>
  );
}
