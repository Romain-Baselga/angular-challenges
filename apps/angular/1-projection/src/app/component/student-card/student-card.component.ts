import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardData } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="cardData$ | async"
      (add)="addStudent()"
      (delete)="deleteStudent($event)"
      backgroundColor="rgba(0, 250, 0, 0.1)">
      <img src="assets/img/student.webp" width="200px" />
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, AsyncPipe],
})
export class StudentCardComponent implements OnInit {
  cardData$: Observable<CardData[]> = this.store.students$.pipe(
    map((students) => students.map((s) => ({ id: s.id, name: s.lastName }))),
  );

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  private fetchStudents() {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addStudent() {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
