import { fireEvent, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  let inputBar: HTMLElement;
  let validateButton: HTMLElement;

  beforeEach(async () => {
    await render(ChildComponent);

    validateButton = screen.getByRole('button', {
      name: /validate/i,
    });

    inputBar = screen.getByRole('textbox');
  });

  describe('When typing nothing and clicking on Validate', () => {
    test('Then show "Title is required" error message', async () => {
      fireEvent.click(validateButton);
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    });
  });

  describe('When typing "Good" and clicking on Validate', () => {
    test('Then show "Title is Good" message, no error message', async () => {
      await userEvent.type(inputBar, 'Good');
      fireEvent.click(validateButton);
      expect(screen.getByText(/Title is Good/i)).toBeInTheDocument();
    });
  });
});
