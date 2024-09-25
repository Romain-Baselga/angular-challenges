import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { MySliderHarness } from './slider.harness';

describe('AppComponent', () => {
  let slider1: MySliderHarness;
  let slider2: MySliderHarness;
  let loader: HarnessLoader;

  beforeEach(async () => {
    const result = await render(AppComponent);
    loader = TestbedHarnessEnvironment.loader(result.fixture);
    [slider1, slider2] = await loader.getAllHarnesses(MySliderHarness);
  });

  describe('When clicking 2 times on plus button of first slider', () => {
    test('Then value is 16', async () => {
      await slider1.clickPlus();
      await slider1.clickPlus();
      expect(await slider1.getValue()).toEqual(16);
    });
  });

  describe('When clicking 1 time on plus button and two times on minus button of first slider', () => {
    test('Then value is still 10', async () => {
      await slider1.clickPlus();
      await slider1.clickMinus();
      expect(await slider1.getValue()).toEqual(10);
    });
  });

  describe('When clicking 4 times on plus button of slider 1', () => {
    test('Then slider 2 is enabled', async () => {
      await slider1.clickPlus();
      await slider1.clickPlus();
      await slider1.clickPlus();
      await slider1.clickPlus();

      expect(await slider1.getValue()).toBeGreaterThan(20);
      expect(await slider2.isEnabled()).toBe(true);
    });
  });
});
