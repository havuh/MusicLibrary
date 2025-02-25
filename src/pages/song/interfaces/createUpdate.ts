import { ISong } from "./list";

export type ISchemaCreateUpdate = 'title' | 'artist' | 'year' | 'genre' | 'coverImages';

export type ISongCreateUpdate = Omit<ISong, 'id'>

