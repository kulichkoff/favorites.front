import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FavoritesApiServive } from '@/entities/favortites';

@Component({
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIcon,
    MatProgressSpinnerModule,
  ],
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
  public shareLink = '';

  public isCopyDosabled = false;

  public loading = true;

  constructor(
    private readonly clipboard: Clipboard,
    private readonly favoritesApi: FavoritesApiServive
  ) {}

  public ngOnInit(): void {
    this.favoritesApi.createFavoritesShareLink().subscribe((favoritesSet) => {
      this.shareLink = `http://localhost:4200/?setId=${favoritesSet.id}`;
      this.loading = false;
    });
  }

  public copy() {
    this.clipboard.copy(this.shareLink);
    this.isCopyDosabled = true;
  }

  public close() {}
}
