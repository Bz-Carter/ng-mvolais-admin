import { Mvolaiserv } from './mvolaiserv';
import { Photo } from './photo';

export interface Portfolio {
  id: number;
  image: string;
  title: string;
  description: string;
  body: string;
  photos: Photo[];
  service: Mvolaiserv;
  created: Date;
}
