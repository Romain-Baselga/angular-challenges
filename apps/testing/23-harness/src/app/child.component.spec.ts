import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSliderHarness } from '@angular/material/slider/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });

    const fixture = TestBed.createComponent(ChildComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  describe('When init', () => {
    test('Then show 1 slider, 3 checkboxes, 4 inputs, 2 buttons', async () => {
      const [sliders, checkboxes, inputs, buttons] = await Promise.all([
        loader.getAllHarnesses(MatSliderHarness),
        loader.getAllHarnesses(MatCheckboxHarness),
        loader.getAllHarnesses(MatInputHarness),
        loader.getAllHarnesses(MatButtonHarness),
      ]);

      expect(sliders).toHaveLength(1);
      expect(checkboxes).toHaveLength(3);
      expect(inputs).toHaveLength(4);
      expect(buttons).toHaveLength(2);
    });

    test('Then initial value of slider thumb is 0', async () => {
      const slider = await loader.getHarness(MatSliderHarness);
      const sliderValue: number = await (await slider.getEndThumb()).getValue();

      expect(sliderValue).toEqual(0);
    });
  });

  describe('Given maxValue set to 109', () => {
    test('Then slider max value is 109', async () => {
      const maxValueInput = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-max' }),
      );
      maxValueInput.setValue('109');

      const slider = await loader.getHarness(MatSliderHarness);

      expect(await slider.getMaxValue()).toBe(109);
    });
  });

  describe('When disabled checkbox is toggled', () => {
    test('Then slider is disabled', async () => {
      const disableCheckbox = await loader.getHarness(
        MatCheckboxHarness.with({ selector: '#disable-checkbox' }),
      );
      await disableCheckbox.check();

      const slider = await loader.getHarness(MatSliderHarness);
      expect(await slider.isDisabled()).toBe(true);
    });
  });

  describe('Given step value set to 5, and When clicking on forward button two times', () => {
    test('Then thumb value is 10', async () => {
      const stepInput = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-step' }),
      );
      await stepInput.setValue('5');

      const forwardButton = await loader.getHarness(
        MatButtonHarness.with({ selector: '#slider-forward-button' }),
      );
      await forwardButton.click();
      await forwardButton.click();

      const slider = await loader.getHarness(MatSliderHarness);
      const sliderValue: number = await (await slider.getEndThumb()).getValue();

      expect(sliderValue).toEqual(10);
    });
  });

  describe('Given slider value set to 5, and step value to 6 and When clicking on back button', () => {
    test('Then slider value is still 5', async () => {
      const slider = await loader.getHarness(MatSliderHarness);
      await (await slider.getEndThumb()).setValue(5);

      const stepInput = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-step' }),
      );
      await stepInput.setValue('6');

      const sliderValue: number = await (await slider.getEndThumb()).getValue();
      expect(sliderValue).toEqual(5);
    });
  });
});
