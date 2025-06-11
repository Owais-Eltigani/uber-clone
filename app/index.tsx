import { Redirect } from 'expo-router';
import React from 'react';

export default function Index() {
  console.log('app/index');
  return <Redirect href={'/(auth)/welcome'} />;
}
