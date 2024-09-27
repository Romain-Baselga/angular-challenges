import {
  ChangeDetectionStrategy,
  Component,
  effect,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-root',
  template: `
    <section class="flex gap-5">
      <p>MacBook</p>
      <p>1999,99 €</p>
    </section>

    <section>
      <p>Extras:</p>

      <div>
        <input type="checkbox" [(ngModel)]="drive" />
        +500 GB drive-space
      </div>
      <div>
        <input type="checkbox" [(ngModel)]="ram" />
        +4 GB RAM
      </div>
      <div>
        <input type="checkbox" [(ngModel)]="gpu" />
        Better GPU
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  drive = model(false);
  ram = model(false);
  gpu = model(false);

  constructor() {
    /**
     * I don't work because: "effects keep track of their dependencies dynamically, and only track signals which were read in the most recent execution."
     * if drive is selected, then it will not track ram and gpu (so we can check without alert)
     */
    // effect(() => {
    //   if (this.drive() || this.ram() || this.gpu()) {
    //     alert('Price increased!');
    //   }
    // });

    effect(() => {
      if (this.drive()) {
        alert('Price increased!');
      }
    });

    effect(() => {
      if (this.ram()) {
        alert('Price increased!');
      }
    });

    effect(() => {
      if (this.gpu()) {
        alert('Price increased!');
      }
    });
  }
}
