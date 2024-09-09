import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

describe('AppComponent', () => {
  let searchBar: HTMLElement;
  let borrowButton: HTMLElement;

  beforeEach(async () => {
    await render(AppComponent, {
      routes: appRoutes,
    });

    searchBar = screen.getByRole('textbox', {
      name: /search book by author or title/i,
    });
    borrowButton = screen.getByRole('button', { name: /borrow/i });
  });

  describe('Given no search criteria', () => {
    it('Then shows error message and disabled button', async () => {
      expect(
        await screen.findByText(/Search criteria is required!/i),
      ).toBeInTheDocument();
      expect(borrowButton).toBeDisabled();
    });
  });

  describe('Given a search criteria with no book match', () => {
    it('Then shows No book found', async () => {
      await userEvent.type(searchBar, 'uifupupjsyznhxoz');
      await userEvent.click(borrowButton);

      expect(
        await screen.findByText(/No book found for this search/i),
      ).toBeInTheDocument();
    });
  });

  describe('Given a search criteria with one book match', () => {
    it('Then shows One book and no error', async () => {
      await userEvent.type(searchBar, 'Hobbit');
      await userEvent.click(borrowButton);

      expect(await screen.findAllByRole('listitem')).toHaveLength(1);
      expect(await screen.findByText(/The Hobbit/i)).toBeInTheDocument();
    });
  });

  describe('Given a search criteria in Uppercase with one book match', () => {
    it('Then shows One book and no error', async () => {
      await userEvent.type(searchBar, 'HOBBIT');
      await userEvent.click(borrowButton);

      expect(await screen.findAllByRole('listitem')).toHaveLength(1);
      expect(await screen.findByText(/The Hobbit/i)).toBeInTheDocument();
    });
  });

  describe('Given a search criteria with multple books matches', () => {
    it('Then shows a list of books', async () => {
      await userEvent.type(searchBar, 'George Orwell');
      await userEvent.click(borrowButton);

      expect(await screen.findAllByRole('listitem')).toHaveLength(2);
      expect(await screen.findByText(/1984/i)).toBeInTheDocument();
      expect(await screen.findByText(/Animal Farm/i)).toBeInTheDocument();
    });
  });
});
