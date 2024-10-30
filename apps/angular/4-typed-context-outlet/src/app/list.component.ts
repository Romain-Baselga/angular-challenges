import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  Input,
  TemplateRef,
} from '@angular/core';

interface ListTemplateContext<T> {
  item: T;
  index: number;
}

@Directive({
  standalone: true,
  selector: '[templateDirective]',
})
export class ListTemplateDirective<T> {
  @Input({ required: true }) templateDirective!: T[];

  static ngTemplateContextGuard<T>(
    dir: ListTemplateDirective<T>,
    ctx: any,
  ): ctx is ListTemplateContext<T> {
    return true;
  }
}

@Component({
  selector: 'list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let item of list; index as i">
      <ng-container
        *ngTemplateOutlet="
          listTemplateRef || emptyRef;
          context: { item: item, index: i }
        "></ng-container>
    </div>

    <ng-template #emptyRef>No Template</ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<TItem> {
  @Input() list!: TItem[];

  @ContentChild(ListTemplateDirective, { read: TemplateRef })
  listTemplateRef!: TemplateRef<ListTemplateContext<TItem>>;
}
