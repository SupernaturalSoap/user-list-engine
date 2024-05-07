import { Genre } from "./genre";

export default interface Movie {
    id: string,
    title: string,
    description: string,
    genre: Genre[],
    releaseDate: string,
    director: string,
    actors: string[]
}