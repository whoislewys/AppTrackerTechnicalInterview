import CheapRuler from 'cheap-ruler';
import {
  LocationAccuracy,
  LocationObject,
  watchPositionAsync,
} from 'expo-location';
import {useEffect, useReducer} from 'react';

// Export for unit testing and easy updating
export const LOCATION_UPDATE_THRESHOLD_METERS = 15;

export const useCurrentLocation = () => {
  const initialState: Record<string, number | undefined> = {
    latitude: undefined,
    longitude: undefined,
    lastUpdateTimestamp: undefined,
  };

  const locationReducer = (
    state: typeof initialState,
    action: {
      type: string;
      latitude: number;
      longitude: number;
      timestamp: number;
    },
  ) => {
    switch (action.type) {
      case 'UPDATE_LOCATION':
        return {
          latitude: action.latitude,
          longitude: action.longitude,
          lastUpdateTimestamp: action.timestamp,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(locationReducer, initialState);

  useEffect(() => {
    const subscribeToLocation = async () => {
      const subscriptionPromise = watchPositionAsync(
        {accuracy: LocationAccuracy.High},
        (location: LocationObject) => {
          const ruler = new CheapRuler(location.coords.latitude, 'meters');

          // Initialize state if it's undefined (e.g. if the user just opened the app)
          if (
            state.lastUpdateTimestamp === undefined ||
            state.latitude === undefined ||
            state.longitude === undefined
          ) {
            dispatch({
              type: 'UPDATE_LOCATION',
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              timestamp: location.timestamp,
            });
          } else {
            const distanceFromLastMeasurementM = ruler.distance(
              [location.coords.longitude, location.coords.latitude],
              [state.longitude ?? 0, state.latitude ?? 0],
            );

            if (
              location.timestamp - state.lastUpdateTimestamp >= 2000 ||
              distanceFromLastMeasurementM > LOCATION_UPDATE_THRESHOLD_METERS
            ) {
              dispatch({
                type: 'UPDATE_LOCATION',
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                timestamp: location.timestamp,
              });
            }
          }
        },
      );

      const subscription = await subscriptionPromise;
      return () => {
        subscription.remove();
      };
    };

    subscribeToLocation();
  }, [state.lastUpdateTimestamp, state.latitude, state.longitude]);

  return {
    latitude: state.latitude,
    longitude: state.longitude,
  };
};
