import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  return (
    <SafeAreaView className="flex">
      <View className="flex">
        <Text className="text-3xl">Profile</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
