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
type PersonUtilsType = typeof PersonUtils;

@Pipe({
  pure: true,
  standalone: true,
  name: 'utilsPipe',
})
export class UtilsPipe implements PipeTransform {
  transform<
    FunctionName extends keyof PersonUtilsType,
    SelectedFunction extends PersonUtilsType[FunctionName],
  >(
    functionName: FunctionName,
    ...args: Parameters<SelectedFunction>
  ): ReturnType<SelectedFunction> {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return (PersonUtils[functionName] as Function)(...args);
  }
}
