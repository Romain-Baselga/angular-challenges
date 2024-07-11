import {
  Directive,
  DoCheck,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appNgForEmpty]',
  standalone: true,
})
export class NgForEmptyDirective<T> implements DoCheck {
  @Input({ required: true }) appNgForEmptyOf!: T[];
  @Input({ required: true }) appNgForEmptyEmpty!: TemplateRef<unknown>;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainerRef: ViewContainerRef,
  ) {}

  ngDoCheck(): void {
    this.viewContainerRef.clear();

    if (this.appNgForEmptyOf?.length === 0) {
      this.viewContainerRef.createEmbeddedView(this.appNgForEmptyEmpty);
    } else {
      this.appNgForEmptyOf.forEach((data) => {
        this.viewContainerRef.createEmbeddedView(this.templateRef, {
          $implicit: data,
        });
      });
    }
  }
}
