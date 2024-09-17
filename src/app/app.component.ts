import { Component, OnInit, signal, Signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
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
import { catchError, EMPTY, filter, map, switchMap } from 'rxjs';
import { DialogComponent } from '@/widgets/dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

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
    MatDialogModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public favorites: Signal<FavoritesStateModel>;

  public newFavoriteContent?: string;

  constructor(
    private readonly store: Store,
    private readonly favoritesApi: FavoritesApiServive,
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog
  ) {
    this.favorites = this.store.selectSignal(FavoritesState.getFavorites);
  }

  public ngOnInit(): void {
    this.route.queryParams
      .pipe(
        map((params) => params['setId'] as string),
        filter((setId) => !!setId),
        switchMap((setId) => this.favoritesApi.getFavoritesSet(setId)),
        catchError((err) => {
          alert('Not found');
          return EMPTY;
        })
      )
      .subscribe((favoritesSet) => {
        /**
         * Если переопределить сигнал this.favorites, то мы не сломаем те фавориты, что хранятся в сторе
         */

        this.favorites = signal<FavoritesStateModel>(favoritesSet.favorites);
      });
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
    this.dialog.open(DialogComponent);
  }

  public clearList() {
    this.store.dispatch(new FavoritesActions.ClearFavorites());
  }
}
