import CheapRuler from 'cheap-ruler';
import {watchPositionAsync} from 'expo-location';
import {useEffect, useState} from 'react';

// Export for unit testing and easy updating
export const LOCATION_UPDATE_THRESHOLD_METERS = 15;

const hasTwoSecondsElapsed = (
  prevTimestamp: number,
  currentTimestamp: number,
): boolean => {
  return currentTimestamp - prevTimestamp >= 2000;
};

export const useCurrentLocation = () => {
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState<number>();

  useEffect(() => {
    const subscribeToLocation = async () => {
      const subscriptionPromise = watchPositionAsync({}, location => {
        const ruler = new CheapRuler(location.coords.latitude, 'meters');

        // Initialize state if it's undefined (e.g. if user just opened the app)
        if (
          lastUpdateTimestamp === undefined ||
          latitude === undefined ||
          longitude === undefined
        ) {
          setLastUpdateTimestamp(location.timestamp);
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
        } else {
          const distanceFromLastMeasurementM = ruler.distance(
            [longitude ?? 0, latitude ?? 0],
            [location.coords.longitude, location.coords.latitude],
          );

          if (
            hasTwoSecondsElapsed(
              lastUpdateTimestamp ?? 0,
              location.timestamp,
            ) ||
            distanceFromLastMeasurementM > LOCATION_UPDATE_THRESHOLD_METERS
          ) {
            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);
          }
        }
      });
      const subscription = await subscriptionPromise;
      return () => subscription.remove();
    };
    subscribeToLocation();
  });

  return {
    latitude,
    longitude,
  };
};
