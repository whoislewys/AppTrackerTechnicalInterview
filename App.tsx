import * as Location from 'expo-location';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LATITUDE, LONGITUDE} from './src/testIds';
import {useCurrentLocation} from './src/useCurrentLocation';

export type Screens = {
  Current: undefined;
  Previous: undefined;
};

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
      <Text testID={LATITUDE}>Latitude: {latitude ?? 'Loading...'}</Text>
      <Text testID={LONGITUDE}>Longitude: {longitude ?? 'Loading...'}</Text>

      {/* TODO: display error text if user rejects permission */}
      {locationPermissionError !== '' ? (
        <Text style={styles.errorText}>
          Error: Please allow Location permission to see your latitude &
          longitude!
        </Text>
      ) : null}
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
