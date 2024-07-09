import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from './model/todo.model';
import { TodoApiService } from './services/todo-api.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos!: Todo[];

  constructor(private todoApiService: TodoApiService) {}

  ngOnInit(): void {
    this.todoApiService.fetch().subscribe((todos) => {
      this.todos = todos;
    });
  }

  update(todo: Todo) {
    todo.title = randText();

    this.todoApiService.update(todo).subscribe((todoUpdated: Todo) => {
      this.todos[todoUpdated.id - 1] = todoUpdated;
    });
  }
}
