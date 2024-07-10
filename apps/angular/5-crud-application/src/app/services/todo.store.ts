import { Injectable, signal } from '@angular/core';
import { Todo } from '../model/todo.model';
import { TodoApiService } from './todo-api.service';

@Injectable()
export class TodoStore {
  readonly todos = signal<Todo[]>([]);

  constructor(private todoApiService: TodoApiService) {}

  refresh() {
    this.todoApiService.fetch().subscribe((todos) => {
      this.todos.set(todos);
    });
  }

  update(todo: Todo) {
    this.todoApiService.update(todo).subscribe((updatedTodo) => {
      this.todos.update((oldTodos) => {
        return [
          ...oldTodos.filter((t) => t.id !== updatedTodo.id),
          updatedTodo,
        ];
      });
    });
  }
}
