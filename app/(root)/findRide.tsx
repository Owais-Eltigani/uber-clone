import CustomButton from '@/components/CustomButton';
import GoogleTextInput from '@/components/GoogleTextInput';
import RideLayout from '@/components/RideLayout';
import { useLocationStore } from '@/store';
import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function FindRide() {
  const { userLatitude, destinationLatitude, destinationAddress, userAddress } =
    useLocationStore();

  return (
    <RideLayout title="rider screen">
      <View className="flex flex-col gap-5 text-green-500 text-xl pb-10 ">
        {/*  */}
        <View className="flex-1 flex-col gap-5">
          <Text className="font-JakartaExtraBold capitalize"> from </Text>
          <GoogleTextInput editable={false} initialLocation={userAddress!} />
        </View>
        {/*  */}
        <View className="flex-1 flex-col gap-5">
          <Text className="font-JakartaExtraBold capitalize"> to </Text>
          <GoogleTextInput
            editable={false}
            initialLocation={destinationAddress!}
          />
        </View>

        <CustomButton
          title="Find a Ride"
          onPress={() => router.push('/(root)/confirmRide')}
          className="mt-2"
        />
      </View>
    </RideLayout>
  );
}
