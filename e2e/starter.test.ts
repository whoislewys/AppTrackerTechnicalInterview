import CheapRuler from 'cheap-ruler';
import {execSync} from 'child_process';
import {expect} from 'detox';
import {LATITUDE} from '../src/testIds';
import {LOCATION_UPDATE_THRESHOLD_METERS} from '../src/useCurrentLocation';

describe('Home screen', () => {
  const initialLatitude = 1;
  const initialLongitude = 1;

  beforeAll(async () => {
    await device.launchApp({
      permissions: {
        location: 'always',
      },
    });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    execSync(
      `xcrun simctl location ${device.id} set ${initialLatitude},${initialLongitude}`,
    );
  });

  it('should render new latitude & longitude when device moves > 15 meters', async () => {
    // Arrange
    const ruler = new CheapRuler(1, 'meters');
    const metersToMove = LOCATION_UPDATE_THRESHOLD_METERS + 0.1;
    const bearing = 0; // 0 degrees (as if moving straight ahead)
    const [newLongitude, newLatitude] = ruler.destination(
      [initialLongitude, initialLatitude],
      metersToMove,
      bearing,
    );

    // Act
    execSync(
      `xcrun simctl location ${device.id} set ${newLatitude},${newLongitude}`,
    );

    // Assert
    const latitudeElementAfter = element(by.id(LATITUDE));
    await expect(latitudeElementAfter).toHaveText(
      `Latitude: ${newLatitude.toString()}`,
    );
  });

  it('should render new latitude & longitude when > 2 seconds have passed', async () => {
    // Arrange
    // Create distance less than the distance threshold
    const ruler = new CheapRuler(initialLatitude, 'meters');
    const metersToMove = LOCATION_UPDATE_THRESHOLD_METERS / 2;
    const bearing = 0; // 0 degrees (as if moving straight ahead)
    const [newLongitude, newLatitude] = ruler.destination(
      [initialLongitude, initialLatitude],
      metersToMove,
      bearing,
    );

    // Act
    await new Promise(resolve => setTimeout(resolve, 3000));
    execSync(
      `xcrun simctl location ${device.id} set ${newLatitude},${newLongitude}`,
    );
    await device.reloadReactNative();

    // Assert
    await expect(element(by.id(LATITUDE))).toHaveText(
      `Latitude: ${newLatitude.toString()}`,
    );
  });

  it('should not render new latitude & longitude when device moves < 15 meters and < 2 seconds have passed', async () => {
    // Arrange
    const ruler = new CheapRuler(0, 'meters');
    const metersToMove = LOCATION_UPDATE_THRESHOLD_METERS / 2;
    const bearing = 0; // 0 degrees (as if moving straight ahead)
    // Point structure is [longitude, latitude] https://github.com/mapbox/cheap-ruler?tab=readme-ov-file#distancea-b
    const [newLongitude, newLatitude] = ruler.destination(
      [initialLongitude, initialLatitude],
      metersToMove,
      bearing,
    );

    // Act
    execSync(
      `xcrun simctl location ${device.id} set ${newLatitude},${newLongitude}`,
    );

    // Assert
    const latitudeElementAfter = element(by.id(LATITUDE));
    await expect(latitudeElementAfter).toHaveText(
      `Latitude: ${initialLatitude.toString()}`,
    );
  });
});
