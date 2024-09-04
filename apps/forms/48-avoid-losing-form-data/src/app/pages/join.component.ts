import { Dialog } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertDialogComponent } from '../ui/dialog.component';
import { FormComponent } from '../ui/form.component';
@Component({
  standalone: true,
  imports: [FormComponent, MatDialogModule],
  template: `
    <section class="mx-auto	max-w-screen-sm">
      <div class="rounded-lg bg-white p-8 shadow-lg lg:p-12">
        <app-form />
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinComponent {
  @ViewChild(FormComponent)
  formComponent!: FormComponent;

  constructor(private dialog: Dialog) {}

  canDeactivate() {
    const atLeastOneFieldIsNotEmpty: boolean = Object.values(
      this.formComponent.form.getRawValue(),
    ).some((value) => value.length > 0);

    if (atLeastOneFieldIsNotEmpty) {
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        role: 'alertdialog',
        disableClose: true,
      });

      return dialogRef.closed;
    } else {
      return true;
    }
  }
}
