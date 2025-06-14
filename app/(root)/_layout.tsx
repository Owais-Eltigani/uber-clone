import { Stack } from 'expo-router';
import React from 'react';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="findRide" options={{ headerShown: false }} />
      <Stack.Screen name="confirmRide" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
