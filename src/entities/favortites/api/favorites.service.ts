import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';

import { FavoritesState } from '../model';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3000/';

@Injectable({ providedIn: 'root' })
export class FavoritesApiServive {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly store: Store
  ) {}

  public createFavoritesShareLink() {
    const favorites = this.store.selectSnapshot(FavoritesState.getFavorites);

    return this.httpClient.post<{ id: string }>(`${BASE_URL}favorites/share`, {
      favorites,
    });
  }

  public getFavoritesSet(setId: string): Observable<{ favorites: string[] }> {
    return this.httpClient.get<{ favorites: string[] }>(
      `${BASE_URL}favorites/share/${setId}`
    );
  }
}
