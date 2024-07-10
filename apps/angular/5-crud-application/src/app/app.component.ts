import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { randText } from '@ngneat/falso';
import { Todo } from './model/todo.model';
import { TodoStore } from './services/todo.store';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  providers: [TodoStore],
  selector: 'app-root',
  template: `
    @for (todo of todos(); track todo.id) {
      <div>
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
        <button (click)="delete(todo)">Delete</button>
      </div>
    }
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  todos = this.todoStore.todos;

  constructor(private todoStore: TodoStore) {}

  ngOnInit(): void {
    this.todoStore.refresh();
  }

  update(todo: Todo) {
    const newTodo: Todo = { ...todo, title: randText() };
    this.todoStore.update(newTodo);
  }

  delete(todo: Todo) {
    this.todoStore.delete(todo);
  }
}
