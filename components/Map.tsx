import { icons } from '@/constants';
import { useFetch } from '@/lib/fetch';
import { calculateRegion, generateMarkersFromData } from '@/lib/map';
import { useDriverStore, useLocationStore } from '@/store';
import { Driver, MarkerData } from '@/types/type';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

export default function Map() {
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const {
    data: drivers,
    loading,
    error,
  } = useFetch<Driver[]>('/(api)/drivers');

  const { selectedDriver, setDrivers } = useDriverStore();

  const [markerPointer, setMarkerPointer] = useState<MarkerData[]>([]);

  // console.log('map: drivers', drivers);
  //
  useEffect(() => {
    //
    // setDrivers(drivers!);
    if (Array.isArray(drivers)) {
      if (!userLatitude || !userLongitude) {
        return;
      }

      const markers = generateMarkersFromData({
        data: drivers,
        userLatitude,
        userLongitude,
      });

      setMarkerPointer(markers);
    }
  }, [drivers, userLatitude, userLongitude]);

  useEffect(() => {
    if (
      markerPointer.length > 0 &&
      destinationLatitude !== undefined &&
      destinationLongitude !== undefined
    ) {
      // calculateDriverTimes({
      //   markers: markerPointer,
      //   userLatitude,
      //   userLongitude,
      //   destinationLatitude,
      //   destinationLongitude,
      // }).then(drivers => {
      //   setDrivers(drivers as MarkerData[]);
      // });
    }
    // setDrivers(drivers! as MarkerData[]);
    setDrivers(drivers!);
  }, [markerPointer, destinationLatitude, destinationLongitude]);

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  if (loading || (!userLatitude && !userLongitude))
    return (
      <View className="flex justify-between items-center w-full">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );

  if (error)
    return (
      <View className="flex justify-between items-center w-full">
        <Text>Error: {error}</Text>
      </View>
    );

  //
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    return (
      <MapView
        provider={PROVIDER_DEFAULT}
        className="w-full h-full rounded-2xl"
        style={{ width: '100%', height: '100%' }}
        tintColor="black"
        // mapType="mutedStandard"
        showsPointsOfInterest={false}
        region={region}
        showsUserLocation={true}
        userInterfaceStyle="light">
        {markerPointer.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            image={
              selectedDriver === marker.id ? icons.selectedMarker : icons.marker
            }
          />
        ))}
        {destinationLatitude && destinationLongitude && (
          <Marker
            coordinate={{
              latitude: destinationLatitude!,
              longitude: destinationLongitude!,
            }}
            title="Destination"
            image={icons.pin}
          />
        )}

        {/* the direction api is not working maybe because of google api not enabled with credit card */}
        <MapViewDirections
          origin={{
            latitude: userLatitude!,
            longitude: userLongitude!,
          }}
          destination={{
            latitude: destinationLongitude!,
            longitude: destinationLatitude!,
          }}
          strokeColor="#0286ff"
          strokeWidth={3}
          apikey={process.env.EXPO_PUBLIC_GOOGLE_KEY!}
        />
      </MapView>
    );
  } else {
    return (
      <View>
        <Text>Map component is not available on web.</Text>
      </View>
    );
  }
}
