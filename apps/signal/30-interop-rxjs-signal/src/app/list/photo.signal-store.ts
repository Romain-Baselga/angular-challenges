import { computed, effect, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { catchError, combineLatest, finalize, switchMap, tap } from 'rxjs';
import { Photo } from '../photo.model';
import { PhotoService } from '../photos.service';

const PHOTO_STATE_KEY = 'photo_search';

@Injectable()
export class PhotoSignalStore {
  private _page = signal(1);
  private _pages = signal(1);
  private _endOfPages = computed(() => {
    return this._pages() - this._page() == 0;
  });

  public state = {
    photos: signal<Photo[]>([]),
    search: signal(''),
    page: this._page,
    pages: this._pages,
    loading: signal(false),
    error: signal(''),
    endOfPage: this._endOfPages,
  };

  constructor(private photoService: PhotoService) {
    this.reloadDataFromCache();

    effect(() => {
      localStorage.setItem(
        PHOTO_STATE_KEY,
        JSON.stringify({
          search: this.state.search(),
          page: this.state.page(),
        }),
      );
    });

    combineLatest([
      toObservable(this.state.search),
      toObservable(this.state.page),
    ])
      .pipe(
        takeUntilDestroyed(),
        switchMap(([search, page]) => this.searchPhoto(search, page)),
      )
      .subscribe();
  }

  updateSearch(search: string): void {
    this.state.search.set(search);
    this.state.page.set(1);
  }

  nextPage(): void {
    this.state.page.set(this.state.page() + 1);
  }

  previousPage(): void {
    this.state.page.set(this.state.page() - 1);
  }

  private searchPhoto(search: string, page: number) {
    return this.photoService.searchPublicPhotos(search, page).pipe(
      catchError((error, caught) => {
        this.state.error.set(error);
        return caught;
      }),
      finalize(() => {
        this.state.loading.set(false);
      }),
      tap((result) => {
        this.state.photos.set(result.photos.photo);
        this.state.page.set(result.photos.page);
        this.state.pages.set(result.photos.pages);
        this.state.error.set('');
      }),
    );
  }

  private reloadDataFromCache() {
    const data_saved = localStorage.getItem(PHOTO_STATE_KEY);
    if (data_saved) {
      const { search, page } = JSON.parse(data_saved);
      this.state.search.set(search);
      this.state.page.set(page);
    }
  }
}
