import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import React from 'react';

export default function Index() {
  //   console.log('app/index');
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={'/(root)/(tabs)/home'} />;
  }

  return <Redirect href={'/(auth)/welcome'} />;
}
