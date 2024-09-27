import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserStore } from './user.service';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="flex flex-col gap-4">
      <div>
        Name:
        <input
          class="rounded-md border border-gray-400"
          formControlName="name" />
      </div>
      <div>
        Address:
        <div>
          street:
          <input
            class="rounded-md border border-gray-400"
            formControlName="street" />
        </div>
        <div>
          zipCode:
          <input
            class="rounded-md border border-gray-400"
            formControlName="zipCode" />
        </div>
        <div>
          city:
          <input
            class="rounded-md border border-gray-400"
            formControlName="city" />
        </div>
      </div>
      <div>
        note:
        <input
          class="rounded-md border border-gray-400"
          formControlName="note" />
      </div>
      <div>
        title:
        <input
          class="rounded-md border border-gray-400"
          formControlName="title" />
      </div>
      <div>
        salary:
        <input
          class="rounded-md border border-gray-400"
          formControlName="salary" />
      </div>
      <button class="w-fit border p-2">Submit</button>
    </form>
  `,
  host: {
    class: 'block border border-gray-500 p-4 pt-10 m-4',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  userStore = inject(UserStore);

  form = new FormGroup({
    name: new FormControl(this.userStore.user.name(), { nonNullable: true }),
    street: new FormControl(this.userStore.user.address.street(), {
      nonNullable: true,
    }),
    zipCode: new FormControl(this.userStore.user.address.zipCode(), {
      nonNullable: true,
    }),
    city: new FormControl(this.userStore.user.address.city(), {
      nonNullable: true,
    }),
    note: new FormControl(this.userStore.user.note(), { nonNullable: true }),
    title: new FormControl(this.userStore.user.title(), { nonNullable: true }),
    salary: new FormControl(this.userStore.user.salary(), {
      nonNullable: true,
    }),
  });

  submit() {
    this.userStore.user.name.update(() => this.form.getRawValue().name);
    this.userStore.user.address.street.update(
      () => this.form.getRawValue().street,
    );
    this.userStore.user.address.zipCode.update(
      () => this.form.getRawValue().zipCode,
    );
    this.userStore.user.address.city.update(() => this.form.getRawValue().city);
    this.userStore.user.note.update(() => this.form.getRawValue().note);
    this.userStore.user.title.update(() => this.form.getRawValue().title);
    this.userStore.user.salary.update(() => this.form.getRawValue().salary);
  }
}
