import { Signal } from '@angular/core';
import { Photo } from '../photo.model';

export interface PhotoStateVue {
  photos: Photo[];
  search: string;
  page: number;
  pages: number;
  loading: boolean;
  error: unknown;
  endOfPage: boolean;
}

export interface StoreInterface {
  state: Signal<PhotoStateVue>;
  updateSearch(search: string): void;
  nextPage(): void;
  previousPage(): void;
}
