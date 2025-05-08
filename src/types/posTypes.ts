
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
  cost?: number;
  margin?: number;
  inventory?: number;
  categoryId: number;
  description?: string;
  image?: string;
  visible?: boolean;
  ingredients?: Ingredient[]; // Add this new field for ingredients
}

export interface Ingredient {
  id: number;
  name: string;
  unitOfMeasure: string;
  cost: number;
  quantity: number;
  inStock: number;
}
