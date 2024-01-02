import CheapRuler from 'cheap-ruler';
import {execSync} from 'child_process';
import {expect} from 'detox';
import {LATITUDE} from '../src/testIds';
import {LOCATION_UPDATE_THRESHOLD_METERS} from '../src/useCurrentLocation';

describe('Home screen', () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions: {
        location: 'always',
      },
    });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should render new latitude & Latitude when device moves > 15 meters', async () => {
    // Arrange
    const initialLatitude = 0;
    const initialLongitude = 0;
    // device.setLocation is currently broken, so use applesimutils' simctl command to set location on ios simulator
    execSync(
      `xcrun simctl location ${device.id} set ${initialLatitude},${initialLongitude}`,
    );

    const latitudeElementBefore = element(by.id(LATITUDE));
    await expect(latitudeElementBefore).toHaveText('Latitude: Loading...');

    const ruler = new CheapRuler(0, 'meters');
    const metersToMove = LOCATION_UPDATE_THRESHOLD_METERS + 0.1;
    const bearing = 0; // 0 degrees (as if moving straight ahead)
    const [newLongitude, newLatitude] = ruler.destination(
      [0, 0],
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
});
