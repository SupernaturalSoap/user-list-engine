import Movie from "./movie";
import TVShow from "./tvShow";

export type Media = Movie | TVShow;

export default interface UserList {
    userId: string,
    moviesAndShows: Media[]
}