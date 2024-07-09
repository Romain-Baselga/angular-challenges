import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardData } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      style="background-color: {{ backgroundColor }};">
      <ng-content></ng-content>

      <section>
        @for (item of list; track $index) {
          <app-list-item
            [name]="item.name"
            [id]="item.id"
            (delete)="deleteOne($event)"></app-list-item>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [ListItemComponent],
})
export class CardComponent {
  @Input() list: CardData[] | null = null;
  @Input() backgroundColor = '';

  @Output() add = new EventEmitter<void>();
  @Output() delete = new EventEmitter<number>();

  addNewItem() {
    this.add.emit();
  }

  deleteOne(id: number) {
    this.delete.emit(id);
  }
}
