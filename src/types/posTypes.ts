
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
  cost?: number; // New field
  margin?: number; // New field
  inventory?: number; // New field
  categoryId: number;
  description?: string;
  image?: string;
  visible?: boolean; // Making visibility explicit instead of just using the switch
}
