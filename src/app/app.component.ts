import { Component, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Store } from '@ngxs/store';

import {
  FavoritesStateModel,
  FavoritesState,
  FavoritesActions,
  FavoritesApiServive,
} from '@/entities/favortites';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public favorites: Signal<FavoritesStateModel>;

  public newFavoriteContent?: string;

  constructor(
    private readonly store: Store,
    private readonly favoritesApi: FavoritesApiServive
  ) {
    this.favorites = this.store.selectSignal(FavoritesState.getFavorites);
  }

  public addFavoriteItem() {
    if (!this.newFavoriteContent) {
      return;
    }

    this.store.dispatch(
      new FavoritesActions.AddFavoriteItem(this.newFavoriteContent)
    );

    this.newFavoriteContent = '';
  }

  public share() {
    this.favoritesApi.createFavoritesShareLink().subscribe();
  }
}
