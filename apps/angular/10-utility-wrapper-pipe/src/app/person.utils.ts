import { Pipe, PipeTransform } from '@angular/core';

const showName = (name: string, index: number) => {
  // very heavy computation
  return `${name} - ${index}`;
};

const isAllowed = (age: number, isFirst: boolean, activityAge: number) => {
  if (isFirst) {
    return 'always allowed';
  } else {
    return age > activityAge ? 'allowed' : 'declined';
  }
};

export const PersonUtils = {
  showName,
  isAllowed,
};

@Pipe({
  pure: true,
  standalone: true,
  name: 'utilsPipe',
})
export class UtilsPipe implements PipeTransform {
  transform(fn: (...args: any[]) => unknown, ...args: any[]) {
    return fn(...args);
  }
}
