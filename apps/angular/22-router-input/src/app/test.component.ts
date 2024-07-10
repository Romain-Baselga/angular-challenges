import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div>TestId: {{ testId$ | async }}</div>
    <div>Permission: {{ permission$ | async }}</div>
    <div>User: {{ user$ | async }}</div>
  `,
})
export default class TestComponent {
  constructor(private activatedRoute: ActivatedRoute) {}

  testId$ = this.activatedRoute.params.pipe(map((p) => p['testId']));
  permission$ = this.activatedRoute.data.pipe(map((d) => d['permission']));
  user$ = this.activatedRoute.queryParams.pipe(map((q) => q['user']));
}
