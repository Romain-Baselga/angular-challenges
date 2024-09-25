import { EventEmitter } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { fireEvent, render, screen } from '@testing-library/angular';
import { HolderButtonComponent } from './holderButton.component';

describe('HolderButtonComponent', () => {
  let actionValidated: EventEmitter<void>;
  let actionValidatedEmitSpy: jest.SpyInstance;
  let actionProgress: EventEmitter<number>;
  let actionProgressEmitSpy: jest.SpyInstance;

  let button: HTMLElement;
  let duration: number;

  beforeEach(async () => {
    actionValidated = new EventEmitter<void>();
    actionValidatedEmitSpy = jest.spyOn(actionValidated, 'emit');

    actionProgress = new EventEmitter<number>();
    actionProgressEmitSpy = jest.spyOn(actionProgress, 'emit');

    // It's dificult to use a setup function (cannot use await in fakeAsync)
    // So random duration should test that the duration is taken into account
    duration = Math.random() * 10_000;

    await render(HolderButtonComponent, {
      componentInputs: { duration },
      componentOutputs: { actionValidated, actionProgress },
    });

    button = screen.getByRole('button');
  });

  describe('condition', () => {
    it('should emit if the button is hold down for long enought', fakeAsync(() => {
      fireEvent.mouseDown(button);
      tick(duration * 10);

      expect(actionValidatedEmitSpy).toHaveBeenCalledTimes(1);
    }));

    it('should not emit if the mouseUp', fakeAsync(() => {
      fireEvent.mouseDown(button);
      fireEvent.mouseUp(button);

      tick(duration * 10);

      expect(actionValidatedEmitSpy).not.toHaveBeenCalled();
    }));

    it('should not emit if the mouseLeave', fakeAsync(() => {
      fireEvent.mouseDown(button);
      fireEvent.mouseLeave(button);

      tick(duration * 10);

      expect(actionValidatedEmitSpy).not.toHaveBeenCalled();
    }));
  });

  describe('duration', () => {
    it('should not emit if the button was not hold long enought', fakeAsync(() => {
      fireEvent.mouseDown(button);
      tick(duration - 500);
      fireEvent.mouseUp(button);

      expect(actionValidatedEmitSpy).not.toBeCalled();
    }));

    it('should emit if the button was hold long enought', fakeAsync(() => {
      fireEvent.mouseDown(button);
      tick(duration * 10);
      fireEvent.mouseUp(button);

      expect(actionValidatedEmitSpy).toHaveBeenCalledTimes(1);
    }));
  });

  describe('progress', () => {
    it('should have a progress of 100 at the end', fakeAsync(() => {
      fireEvent.mouseDown(button);
      tick(duration + 500);
      expect(actionProgressEmitSpy).toHaveBeenCalledWith(100);
    }));

    it('should reset the progress bar to 0, On mouseleave or mouseup events', fakeAsync(() => {
      fireEvent.mouseDown(button);
      tick(duration + 500);
      expect(actionProgressEmitSpy).toHaveBeenCalledWith(100);

      fireEvent.mouseUp(button);
      expect(actionProgressEmitSpy).toHaveBeenCalledWith(0);
    }));

    it('should update the progress continiously', fakeAsync(() => {
      let actionProgressValue = 0;
      actionProgress
        .asObservable()
        .subscribe((value) => (actionProgressValue = value));

      expect(actionProgressValue).toBe(0);
      fireEvent.mouseDown(button);

      tick(duration / 4);
      expect(actionProgressValue).toBeGreaterThan(20);
      expect(actionProgressValue).toBeLessThan(30);

      tick(duration / 4);
      expect(actionProgressValue).toBeGreaterThan(40);
      expect(actionProgressValue).toBeLessThan(60);

      tick(duration / 4);
      expect(actionProgressValue).toBeGreaterThan(70);
      expect(actionProgressValue).toBeLessThan(80);

      tick(duration / 2);
      expect(actionProgressValue).toBe(100);

      expect(actionProgressEmitSpy).toHaveBeenCalledTimes(100);
    }));
  });
});
