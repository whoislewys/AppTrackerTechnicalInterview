import {expect} from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should say current on screen', async () => {
    await expect(element(by.text('Current'))).toBeVisible();
  });
});
