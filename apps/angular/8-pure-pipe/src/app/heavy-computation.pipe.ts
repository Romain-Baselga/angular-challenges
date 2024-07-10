import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heavyComputation',
  standalone: true,
})
export class HeavyComputationPipe implements PipeTransform {
  transform(name: string, index: number): string {
    console.log('pipe called ounce more !');
    return `${name} - ${index}`;
  }
}
