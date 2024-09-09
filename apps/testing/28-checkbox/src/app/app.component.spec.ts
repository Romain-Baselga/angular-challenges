import { fireEvent, render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let checkbox: HTMLElement;
  let button: HTMLElement;

  beforeEach(async () => {
    await render(AppComponent);
    checkbox = screen.getByRole('checkbox');
    button = screen.getByRole('button');
  });

  describe('checkbox', () => {
    it('should be not checked by default', () => {
      expect(checkbox.attributes.getNamedItem('value')?.value).toBe('false');
    });

    it('should change value when clicked', async () => {
      expect(checkbox.attributes.getNamedItem('value')?.value).toBe('false');
      fireEvent.click(checkbox);
      expect(checkbox.attributes.getNamedItem('value')?.value).toBe('true');
    });
  });

  describe('Submit button', () => {
    it('should be enable if checkbox is checked', async () => {
      fireEvent.click(checkbox);
      expect(button).toBeEnabled();
    });

    it('should be disabled if checkbox is not checked', () => {
      expect(button).toBeDisabled();
    });
  });
});
