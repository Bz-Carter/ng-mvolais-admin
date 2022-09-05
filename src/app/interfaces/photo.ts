import { User } from './user';

export interface Photo {
  id: number;
  name: string;
  image: string;
  alt: string;
  owner: User;
  created: Date;
}
