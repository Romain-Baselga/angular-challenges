import { Injectable, signal } from '@angular/core';

@Injectable()
export class HeavyCalculationService {
  loadingPercentage = signal(0);

  heavyCalculationStater = false;

  startLoading() {
    if (this.heavyCalculationStater) {
      throw new Error('Calculation already launcher !');
    }

    if (typeof Worker !== 'undefined') {
      const worker = new Worker(
        new URL('./heavy-calculation.worker', import.meta.url),
      );

      worker.onmessage = ({ data }) => {
        this.loadingPercentage.set(data);
      };
      worker.postMessage('Start Calculation');
      this.heavyCalculationStater = true;
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }
}
