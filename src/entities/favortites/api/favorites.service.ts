import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';

import { FavoritesState } from '../model';

@Injectable({ providedIn: 'root' })
export class FavoritesApiServive {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly store: Store
  ) {}

  public createFavoritesShareLink() {
    const favorites = this.store.selectSnapshot(FavoritesState.getFavorites);

    return this.httpClient.post('/api/favorites/share', { favorites });
  }

  public getFavoritesSet(setId: string) {
    return this.httpClient.get('/api/favorites/' + setId);
  }
}
