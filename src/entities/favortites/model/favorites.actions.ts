export namespace FavoritesActions {
  const PREFIX = '[Favorites]';
  export class AddFavoriteItem {
    static readonly type = `${PREFIX} Add favorite item`;

    constructor(public content: string) {}
  }
}