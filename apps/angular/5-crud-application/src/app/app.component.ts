import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { randText } from '@ngneat/falso';
import { provideComponentStore } from '@ngrx/component-store';
import { Todo } from './model/todo.model';
import { TodoStore } from './services/todo.store';

@Component({
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  providers: [provideComponentStore(TodoStore)],
  selector: 'app-root',
  template: `
    @for (todo of todos$ | async; track todo.id) {
      <div>
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
      </div>
    }
  `,
  styles: [],
})
export class AppComponent {
  todos$ = this.todoStore.todos$;

  constructor(private todoStore: TodoStore) {}

  update(todo: Todo) {
    todo.title = randText();
    this.todoStore.update(todo);
  }
}
