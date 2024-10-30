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
  name: 'showNamePipe',
})
export class ShowNamePipe implements PipeTransform {
  transform(name: string, index: number): string {
    return showName(name, index);
  }
}

@Pipe({
  pure: true,
  standalone: true,
  name: 'isAllowedPipe',
})
export class IsAllowedPipe implements PipeTransform {
  transform(age: number, isFirst: boolean, activityAge: number): string {
    return isAllowed(age, isFirst, activityAge);
  }
}
