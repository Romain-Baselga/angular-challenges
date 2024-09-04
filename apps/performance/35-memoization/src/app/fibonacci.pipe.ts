import { Pipe, PipeTransform } from '@angular/core';

const fibonacciMemory: { [num: number]: number } = {
  1: 1,
  2: 1,
};

const fibonacci = (num: number): number => {
  if (!fibonacciMemory[num]) {
    fibonacciMemory[num] = fibonacci(num - 1) + fibonacci(num - 2);
  }
  return fibonacciMemory[num];
};

@Pipe({
  name: 'fibonacci',
  pure: true,
  standalone: true,
})
export class FibonacciPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    return fibonacci(value);
  }
}
