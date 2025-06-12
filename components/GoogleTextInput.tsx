import React from 'react';
import { View } from 'react-native';

export default function GoogleTextInput() {
  //todo USE OLA MAPS INSTEAD 3:35 IN VID
  const google_api_key = process.env.EXPO_PUBLIC_GOOGLE_KEY;
  return (
    <View>
      {/* <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        debounce={300}
        query={{
          key: google_api_key,
        }}
      /> */}
    </View>
  );
}
