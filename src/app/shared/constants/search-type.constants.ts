export class SearchTypeConstants {

    public static TYPE_MOVIE = {
        label: "movie",
        value: 1
    };

    public static TYPE_ALBUM = {
        label: "album",
        value: 2
    };

    public SEARCH_TYPE_LIST: any[] = [SearchTypeConstants.TYPE_MOVIE, SearchTypeConstants.TYPE_ALBUM];

    public static getByLabel(label: string) {
        switch (label) {

            case this.TYPE_MOVIE.label:
                return this.TYPE_MOVIE.value;

            case this.TYPE_ALBUM.label:
                return this.TYPE_ALBUM.value;

            default:
                return this.TYPE_MOVIE.value;
        }
    }
}