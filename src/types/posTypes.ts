
export interface Category {
  id: number;
  name: string;
  color: string;
  icon: string;
  items: number;
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  description?: string;
  image?: string;
}
