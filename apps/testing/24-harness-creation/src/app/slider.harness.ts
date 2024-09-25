import { ComponentHarness } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatSliderThumbHarness } from '@angular/material/slider/testing';

export class MySliderHarness extends ComponentHarness {
  static hostSelector = 'app-slider';

  private getPlusButton = this.locatorFor(
    MatButtonHarness.with({ selector: '#plusButton' }),
  );
  private getMinusButton = this.locatorFor(
    MatButtonHarness.with({ selector: '#minusButton' }),
  );

  private getSliderThumb = this.locatorFor(MatSliderThumbHarness);

  async clickPlus(): Promise<void> {
    return (await this.getPlusButton()).click();
  }

  async clickMinus(): Promise<void> {
    return (await this.getMinusButton()).click();
  }

  async setValue(value: number): Promise<void> {
    return (await this.getSliderThumb()).setValue(value);
  }
  async getValue(): Promise<number> {
    return (await this.getSliderThumb()).getValue();
  }

  async isDisabled(): Promise<boolean> {
    return (await this.getSliderThumb()).isDisabled();
  }

  async isEnabled(): Promise<boolean> {
    return !(await this.getSliderThumb()).isDisabled();
  }
}
