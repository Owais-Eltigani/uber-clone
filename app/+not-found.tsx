import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function Notfound() {
  const router = useRouter();

  return (
    <View className=" flex-1 justify-center items-center flex-col">
      <Text className="color-red-600 text-2xl font-bold">
        this page is not available
      </Text>
      <Link href={'/'} className="color-blue-600 underline text-xl font-bold">
        Go to home
      </Link>
    </View>
  );
}
