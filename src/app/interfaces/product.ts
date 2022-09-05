import { Category } from './category';
import { Photo } from './photo';
export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  photos: Photo[];
  category: Category[];
}
