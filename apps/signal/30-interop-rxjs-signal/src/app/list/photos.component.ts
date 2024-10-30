import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLinkWithHref } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Photo } from '../photo.model';
import { PhotoSignalStore } from './photo.signal-store';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    NgIf,
    NgFor,
    MatInputModule,
    LetDirective,
    RouterLinkWithHref,
  ],
  template: `
    <h2 class="mb-2 text-xl">Photos</h2>

    <mat-form-field appearance="fill">
      <mat-label>Search</mat-label>
      <input
        type="text"
        matInput
        [formControl]="searchForm"
        placeholder="find a photo" />
    </mat-form-field>

    <section class="flex flex-col">
      <section class="flex items-center gap-3">
        <button
          [disabled]="state.page() === 1"
          [class.bg-gray-400]="state.page() === 1"
          class="rounded-md border p-3 text-xl"
          (click)="store.previousPage()">
          <
        </button>
        <button
          [disabled]="state.endOfPage()"
          [class.bg-gray-400]="state.endOfPage()"
          class="rounded-md border p-3 text-xl"
          (click)="store.nextPage()">
          >
        </button>
        Page :{{ state.page() }} / {{ state.pages() }}
      </section>

      @if (state.loading()) {
        <mat-progress-bar mode="query" class="mt-5"></mat-progress-bar>
      }

      @if (state.photos() && state.photos().length > 0) {
        <ul class="flex flex-wrap gap-4">
          @for (photo of state.photos(); track photo.id) {
            <li>
              <a routerLink="detail" [queryParams]="{ photo: encode(photo) }">
                <img [src]="photo.url_q" [alt]="photo.title" class="image" />
              </a>
            </li>
          }
        </ul>
      } @else {
        <div>No Photos found. Type a search word.</div>
      }

      <footer class="text-red-500">
        {{ state.error() }}
      </footer>
    </section>
  `,
  providers: [PhotoSignalStore],
  host: {
    class: 'p-5 block',
  },
})
export default class PhotosComponent {
  readonly state = this.store.state;

  searchForm = new FormControl(this.state.search());

  constructor(public store: PhotoSignalStore) {
    this.searchForm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((valueChanges) => {
        if (valueChanges) {
          this.store.updateSearch(valueChanges);
        }
      });
  }

  encode(photo: Photo) {
    return encodeURIComponent(JSON.stringify(photo));
  }
}
