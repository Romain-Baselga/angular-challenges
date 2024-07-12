import { InjectionToken } from '@angular/core';
import { DEFAULT_TIMER } from './data';

export const TIMER_PERIOD = new InjectionToken<number>('TIMER_PERIOD', {
  providedIn: 'root',
  factory: () => DEFAULT_TIMER,
});
