import { icons } from '@/constants';
import { mockDrivers } from '@/constants/mockData';
import { calculateRegion, generateMarkersFromData } from '@/lib/map';
import { useDriverStore, useLocationStore } from '@/store';
import { MarkerData } from '@/types/type';
import React, { useEffect, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';

export default function Map() {
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const region = calculateRegion({
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  });

  const { selectedDriver, setDrivers } = useDriverStore();

  const [markerPointer, setMarkerPointer] = useState<MarkerData[]>([]);

  //
  useEffect(() => {
    if (Array.isArray(mockDrivers)) {
      if (!userLatitude || !userLongitude) {
        return;
      }

      const markers = generateMarkersFromData({
        data: mockDrivers,
        userLatitude,
        userLongitude,
      });

      setMarkerPointer(markers);
    }
  }, [mockDrivers]);

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
