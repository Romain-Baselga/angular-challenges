import { inject, Injectable } from '@angular/core';
import { filter, map, mergeAll, Observable, toArray } from 'rxjs';
import { LocalDBService, TopicType } from './localDB.service';

@Injectable({ providedIn: 'root' })
export class AppService {
  private dbService = inject(LocalDBService);

  getAll$ = this.dbService.infos$;

  deleteOldTopics(type: TopicType): Observable<boolean> {
    return this.dbService.searchByType(type).pipe(
      mergeAll(),
      map((infoToDelete) => this.dbService.deleteOneTopic(infoToDelete.id)),
      filter((infoDeleteSuccess) => !infoDeleteSuccess),
      toArray(),
      map((infoNotDeleted) => infoNotDeleted.length == 0),
    );
  }
}
