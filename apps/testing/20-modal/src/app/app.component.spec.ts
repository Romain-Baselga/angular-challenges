import { fireEvent, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let inputBar: HTMLElement;
  let confirmButton: HTMLElement;

  beforeEach(async () => {
    await render(AppComponent);

    inputBar = screen.getByRole('textbox', {
      name: /name/i,
    });
    confirmButton = screen.getByRole('button', {
      name: /confirm/i,
    });
  });

  test('error modal is displayed if you click on "Confirm" without inputing a name', async () => {
    fireEvent.click(confirmButton);
    expect(screen.getByText(/you must enter a /i)).toBeInTheDocument();
  });

  test('error message is shown if you click "Cancel" in the confirmation modal after submitting a name', async () => {
    await userEvent.type(inputBar, 'Name');
    fireEvent.click(confirmButton);

    const modalCancelButton = screen.getByRole('button', {
      name: /cancel/i,
    });

    fireEvent.click(modalCancelButton);

    expect(screen.getByText(/Name is invalid !!/i)).toBeInTheDocument();
  });

  test('confirm message is shown if you click "Confirm" in the confirmation modal after submitting a name', async () => {
    await userEvent.type(inputBar, 'Name');
    fireEvent.click(confirmButton);

    const modalConfirmButton = screen.getByRole('button', {
      name: /confirmation/i,
    });

    fireEvent.click(modalConfirmButton);

    expect(screen.getByText(/Name has been submitted/i)).toBeInTheDocument();
  });
});
