import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, MatListModule, CDFlashingDirective],
  template: `
    <mat-list class="flex w-full">
      @for (name of names; track name) {
        <mat-list-item cd-flash class="text-orange-500">
          <div MatListItemLine class="flex justify-between">
            <h3 title="Name">
              {{ name }}
            </h3>
          </div>
        </mat-list-item>
      } @empty {
        <div class="empty-list-label">Empty list</div>
      }
      <mat-divider *ngIf="names?.length !== 0"></mat-divider>
    </mat-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  @Input() names: string[] = [];
}
