
import Movie from "./movie";
import TVShow from "./tvShow";

import { Media } from "./userList";

export default interface ListItem {
    userId: string,
    mediaId: string,
    mediaType: string,
    mediaItem: Media
}