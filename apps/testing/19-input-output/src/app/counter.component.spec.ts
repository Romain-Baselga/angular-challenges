import { EventEmitter } from '@angular/core';
import { fireEvent, render, screen } from '@testing-library/angular';
import { firstValueFrom } from 'rxjs';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let incrementButton: HTMLElement;
  let decrementButton: HTMLElement;
  let sendButton: HTMLElement;
  let sendOuput: EventEmitter<number>;

  beforeEach(async () => {
    sendOuput = new EventEmitter<number>();
    await render(CounterComponent, {
      componentInputs: {
        initialValue: 10,
      },
      componentOutputs: { send: sendOuput },
    });

    incrementButton = screen.getByRole('button', {
      name: /increment/i,
    });

    decrementButton = screen.getByRole('button', {
      name: /decrement/i,
    });

    sendButton = screen.getByRole('button', {
      name: /send/i,
    });
  });

  describe('Given an initualValue of 10', () => {
    test('Then counterValue is 10', async () => {
      expect(screen.getByText(/counter: 10/i)).toBeInTheDocument();
    });

    describe('When clicking 5 times on increment button', () => {
      test('Then counterValue is 15', async () => {
        fireEvent.click(incrementButton);
        fireEvent.click(incrementButton);
        fireEvent.click(incrementButton);
        fireEvent.click(incrementButton);
        fireEvent.click(incrementButton);

        expect(screen.getByText(/counter: 15/i)).toBeInTheDocument();
      });
    });

    describe('When clicking 2 times on decrement button', () => {
      test('Then counterValue is 8', async () => {
        fireEvent.click(decrementButton);
        fireEvent.click(decrementButton);

        expect(screen.getByText(/counter: 8/i)).toBeInTheDocument();
      });
      describe('When clicking on Send ', () => {
        test('Then emitted value is 8', async () => {
          fireEvent.click(decrementButton);
          fireEvent.click(decrementButton);

          const sendOuputValue = firstValueFrom(sendOuput.asObservable());
          fireEvent.click(sendButton);

          expect(await sendOuputValue).toBe(8);
        });
      });
    });
  });
});
