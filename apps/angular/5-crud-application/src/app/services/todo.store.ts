import { Injectable } from '@angular/core';
import { ComponentStore, OnStateInit } from '@ngrx/component-store';
import { map } from 'rxjs';
import { Todo } from '../model/todo.model';
import { TodoApiService } from './todo-api.service';

export interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = { todos: [] };

@Injectable()
export class TodoStore
  extends ComponentStore<TodoState>
  implements OnStateInit
{
  readonly todos$ = this.select((state) => state.todos).pipe(
    map((todos) => todos.sort((a, b) => a.id - b.id)),
  );

  constructor(private todoApiService: TodoApiService) {
    super(initialState);
  }

  ngrxOnStateInit() {
    this.refresh();
  }

  refresh() {
    this.todoApiService.fetch().subscribe((todos) => {
      this.setState({ todos: todos });
    });
  }

  update(todo: Todo) {
    this._update(this.todoApiService.update(todo));
  }

  private _update = this.updater((state, todo: Todo) => ({
    todos: [...state.todos.filter((t) => t.id !== todo.id), todo],
  }));
}
