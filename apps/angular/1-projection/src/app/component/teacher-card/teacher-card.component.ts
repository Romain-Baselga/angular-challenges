import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardData } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="cardData$ | async"
      (add)="addTeacher()"
      (delete)="deleteTeacher($event)"
      backgroundColor="rgba(250, 0, 0, 0.1)">
      <img src="assets/img/teacher.png" width="200px" />
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, AsyncPipe],
})
export class TeacherCardComponent implements OnInit {
  cardData$: Observable<CardData[]> = this.store.teachers$.pipe(
    map((teachers) => teachers.map((t) => ({ id: t.id, name: t.lastName }))),
  );

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.fetchTeachers();
  }

  private fetchTeachers() {
    this.http.fetchTeachers$.subscribe((s) => this.store.addAll(s));
  }

  addTeacher() {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
