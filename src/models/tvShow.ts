import Episode from "./episode";
import { Genre } from "./genre";

export default interface TVShow {
    id: string,
    title: string,
    description: string,
    genre: string[],
    episodes: Episode[]
}