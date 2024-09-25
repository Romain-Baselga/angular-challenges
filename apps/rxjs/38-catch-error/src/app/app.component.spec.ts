import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  RenderResult,
  fireEvent,
  render,
  screen,
} from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let httpTesting: HttpTestingController;

  let fetchButton: HTMLElement;
  let inputBar: HTMLElement;
  let renderResult: RenderResult<AppComponent, AppComponent>;

  beforeEach(async () => {
    renderResult = await render(AppComponent, {
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    httpTesting = TestBed.inject(HttpTestingController);

    fetchButton = screen.getByRole('button', {
      name: /fetch/i,
    });
    inputBar = screen.getByRole('textbox');
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be defined', () => {
    expect(httpTesting).toBeDefined();
  });

  it('should show the result of a submit if the input is a possible value', async () => {
    await userEvent.type(inputBar, 'comments');
    fireEvent.click(fetchButton);

    const response = { body: 'body of the post' };
    httpTesting
      .expectOne('https://jsonplaceholder.typicode.com/comments/1')
      .flush(response);

    renderResult.detectChanges();

    expect(
      screen.getByText(/\{ "body": "body of the post" \}/i),
    ).toBeInTheDocument();
  });

  it('should show the results of multiple valid submit', async () => {
    // submit 1: comments
    await userEvent.type(inputBar, 'comments');
    fireEvent.click(fetchButton);
    let response = { body: 'body of the post' };
    httpTesting
      .expectOne('https://jsonplaceholder.typicode.com/comments/1')
      .flush(response);
    renderResult.detectChanges();
    expect(
      screen.getByText(/\{ "body": "body of the post" \}/i),
    ).toBeInTheDocument();

    await userEvent.clear(inputBar);

    // submit 2: posts
    await userEvent.type(inputBar, 'posts');
    fireEvent.click(fetchButton);
    response = { body: 'another body' };
    httpTesting
      .expectOne('https://jsonplaceholder.typicode.com/posts/1')
      .flush(response);
    renderResult.detectChanges();
    expect(
      screen.getByText(/\{ "body": "another body" \}/i),
    ).toBeInTheDocument();
  });

  it('should continue working effetively if the http request is in error', async () => {
    await userEvent.type(inputBar, 'xyz');
    fireEvent.click(fetchButton);

    httpTesting
      .expectOne('https://jsonplaceholder.typicode.com/xyz/1')
      .error(new ProgressEvent('xyz not supported'));
    renderResult.detectChanges();

    expect(screen.queryByText(/\{ "body": "body of the post" \}/i)).toBeNull();

    await userEvent.clear(inputBar);
    await userEvent.type(inputBar, 'comments');
    fireEvent.click(fetchButton);

    const response = { body: 'body of the post' };
    httpTesting
      .expectOne('https://jsonplaceholder.typicode.com/comments/1')
      .flush(response);
    renderResult.detectChanges();

    expect(
      screen.getByText(/\{ "body": "body of the post" \}/i),
    ).toBeInTheDocument();
  });
});
