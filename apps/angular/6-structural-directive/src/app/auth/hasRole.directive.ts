import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Role } from '../user.model';
import { UserStore } from '../user.store';

@Directive({
  selector: '[appHasRole]',
  standalone: true,
})
export class HasRoleDirective<T> implements OnInit {
  @Input({ required: true }) appHasRole!: Role | Role[];

  constructor(
    private templateRef: TemplateRef<T>,
    private viewContainerRef: ViewContainerRef,
    private userStore: UserStore,
  ) {}

  ngOnInit(): void {
    this.userStore.user$.subscribe((user) => {
      this.viewContainerRef.clear();

      const roles = Array.isArray(this.appHasRole)
        ? this.appHasRole
        : [this.appHasRole];

      if (roles.some((r) => user?.roles.includes(r))) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }
}
