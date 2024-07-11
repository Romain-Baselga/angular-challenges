import { NgFor } from '@angular/common';
import {
  Directive,
  DoCheck,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[ngFor]',
  standalone: true,
  hostDirectives: [{ directive: NgFor, inputs: ['ngForOf'] }],
})
export class CustomNgForDirective<T, U> implements DoCheck {
  @Input() ngForOf: T[] | undefined;
  @Input() ngForEmpty: TemplateRef<U> | undefined;

  private view: EmbeddedViewRef<U> | undefined;

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngDoCheck(): void {
    this.view?.destroy();
    if (this.ngForOf?.length === 0 && this.ngForEmpty) {
      this.view = this.viewContainerRef.createEmbeddedView(this.ngForEmpty);
    }
  }
}
