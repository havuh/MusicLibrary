import { ISong } from "./list";

export type ISchemaCreateUpdate = 'title' | 'description' | 'state';

export type ISongCreateUpdate = Omit<ISong, 'id'>

