import CheapRuler from 'cheap-ruler';
import {watchPositionAsync} from 'expo-location';
import {useState} from 'react';

export const useCurrentLocation = () => {
  const [latitude, setLatitude] = useState(-1);
  const [longitude, setLongitude] = useState(-1);
  const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState(-1);

  const hasTwoSecondsElapsed = (
    prevTimestamp: number,
    currentTimestamp: number,
  ): boolean => {
    return currentTimestamp - prevTimestamp >= 2000;
  };

  watchPositionAsync({}, location => {
    const ruler = new CheapRuler(location.coords.latitude);

    // set state if we haven't gotten location yet
    if (lastUpdateTimestamp === -1) {
      setLastUpdateTimestamp(location.timestamp);
    }

    if (latitude === -1) {
      setLatitude(location.coords.latitude);
    }

    if (longitude === -1) {
      setLongitude(location.coords.longitude);
    }

    const distanceFromLastMeasurementM = ruler.distance(
      [longitude, latitude],
      [location.coords.longitude, location.coords.latitude],
    );

    if (
      hasTwoSecondsElapsed(lastUpdateTimestamp, location.timestamp) ||
      distanceFromLastMeasurementM > 15
    ) {
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    }
  });

  return {
    latitude,
    longitude,
  };
};
