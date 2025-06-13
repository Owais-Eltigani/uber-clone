import { useLocationStore } from '@/store';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function GoogleTextInput({
  editable,
  initialLocation,
}: {
  editable?: boolean;
  initialLocation?: string;
}) {
  const [input, setInput] = useState('');
  const [distination, setDestination] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const OLA_KEY = process.env.EXPO_PUBLIC_OLA_API_KEY;
  const { setDestinationLocation } = useLocationStore();

  useEffect(() => {
    if (!OLA_KEY) {
      console.warn('OLA Maps API key is not defined in .env file');
      return;
    }

    // Debounce the API call
    const getAutocompleteSuggestions = setTimeout(async () => {
      if (input.trim() && input.length >= 3 && !distination) {
        try {
          const data = await fetch(
            `https://api.olamaps.io/places/v1/autocomplete?input=${input}&api_key=${OLA_KEY}`
          );

          const res = await data.json();
          if (res) {
            // console.log('googletextinput:prediction:res: ', res.predictions);
            setSuggestions(res.predictions || []); // Assuming the API returns a "results" array
          } else {
            console.warn('OLA Maps API request failed:');
          }
        } catch (error) {
          console.error('OLA Maps API request error:', error);
        }
      } else {
        setSuggestions([]); // Clear suggestions when input is too short
      }
    }, 500);

    return () => {
      clearTimeout(getAutocompleteSuggestions);
    };
  }, [input, OLA_KEY]);

  const handleSuggestionPress = (suggestion: any) => {
    setInput(suggestion.description);
    setDestination(true);
    setSuggestions([]); // Clear suggestions after selection

    //
    setDestinationLocation({
      latitude: suggestion.geometry.location.lat,
      longitude: suggestion.geometry.location.lon,
      address: suggestion.description,
    });

    // push to find ride screen.
    router.push('/(root)/findRide');
  };
  // TODO: add search logo to left of component and X to right of component
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search your location"
        value={initialLocation ?? input}
        editable={editable}
        onChangeText={text => {
          setDestination(false);
          setInput(text);
        }}
        // style={styles.input}
        className="border px-4 py-5 text-sm rounded-2xl font-JakartaMedium "
      />
      <ScrollView
        style={styles.suggestionList}
        scrollEnabled
        nestedScrollEnabled>
        {suggestions.map((suggestion: any) => (
          <TouchableOpacity
            key={suggestion.place_id}
            onPress={() => handleSuggestionPress(suggestion)}
            style={styles.suggestionItem}>
            <Text>{suggestion.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  suggestionList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopWidth: 0,
    borderRadius: 5,
    zIndex: 1,
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});
