import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { FavoritesStateModel } from './favorites.model';
import { FavoritesActions } from './favorites.actions';

@State<FavoritesStateModel>({
  name: 'favorites',
  defaults: [],
})
@Injectable({ providedIn: 'root' })
export class FavoritesState {
  @Selector()
  public static getFavorites(state: FavoritesStateModel): string[] {
    return state;
  }

  @Action(FavoritesActions.AddFavoriteItem)
  public addFavoriteItem(
    ctx: StateContext<FavoritesStateModel>,
    action: FavoritesActions.AddFavoriteItem
  ) {
    const state = ctx.getState();
    ctx.setState([...state, action.content]);
  }
}
