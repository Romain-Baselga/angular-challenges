import { TodoStore } from './todo.store';

describe('TodoStore', () => {
  const componentStore = new TodoStore();

  it('should be created', () => {
    expect(componentStore).toBeTruthy();
  });
});
