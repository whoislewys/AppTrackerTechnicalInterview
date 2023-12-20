import * as Location from 'expo-location';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useCurrentLocation} from './src/useCurrentLocation';

export type Screens = {
  Current: undefined;
  Previous: undefined;
};

// const Stack = createNativeStackNavigator<Screens>();

function App() {
  const [locationPermissionError, setLocationPermissionError] =
    React.useState('');
  const {latitude, longitude} = useCurrentLocation();

  React.useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationPermissionError('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  return (
    <View style={styles.sectionContainer}>
      <Text testID="latitude">Latitude: {latitude}</Text>
      <Text testID="longitude">Longitude: {longitude}</Text>

      {/* TODO: display error text if user rejects permission */}
      {locationPermissionError !== '' ? (
        <Text style={styles.errorText}>
          Error: Please allow Location permission to see your latitude &
          longitude!
        </Text>
      ) : null}

      {/* <Stack.Navigator> */}
      {/*   <Stack.Screen name="Current" component={Current} /> */}
      {/*   <Stack.Screen name="Previous" component={Previous} /> */}
      {/* </Stack.Navigator> */}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  errorText: {
    marginTop: 32,
    color: 'red',
  },
});

export default App;
