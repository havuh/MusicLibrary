export interface ISong {
  id: number;
  title: string;
  artist: string;
  year: number;
  genre: string;
  coverImages: string[];
} 

export type ISongFilter = Omit<ISong, 'id' | 'coverImages'>

export type ISchemaList = 'name' | 'state';
