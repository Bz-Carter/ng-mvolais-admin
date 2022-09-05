import { Category } from './category';
import { Tag } from './tag';
import { User } from './user';

export interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
  body: string;
  category: Category;
  tags: Tag[];
  owner: User;
  created: Date;
}
