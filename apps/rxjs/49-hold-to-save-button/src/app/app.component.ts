import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HolderButtonComponent } from './holderButton.component';

@Component({
  standalone: true,
  imports: [HolderButtonComponent],
  selector: 'app-root',
  template: `
    <main class="flex h-screen items-center justify-center">
      <div
        class="flex w-full max-w-screen-sm flex-col items-center gap-y-8 p-4">
        <app-holder-button></app-holder-button>

        <progress [value]="20" [max]="100"></progress>
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  onSend() {
    console.log('Save it!');
  }
}
