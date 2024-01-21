export class SearchTypeConstants {

    public static TYPE_MOVIE = {
        label: "movie",
        value: 1
    };

    public static TYPE_ALBUM = {
        label: "album",
        value: 2
    };

    public static TYPE_MOVIE_ID: number = 1;
    public static TYPE_ALBUM_ID: number = 2;

    public SEARCH_TYPE_LIST: any[] = [SearchTypeConstants.TYPE_MOVIE, SearchTypeConstants.TYPE_ALBUM];
}