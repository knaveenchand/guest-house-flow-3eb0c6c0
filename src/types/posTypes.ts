
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
  ingredients?: Ingredient[]; 
  modifiers?: MenuItemModifier[]; // Add modifiers to menu items
}

export interface Ingredient {
  id: number;
  name: string;
  unitOfMeasure: string;
  cost: number;
  quantity: number;
  unitsPerPackage?: number;
}

export interface Modifier {
  id: number;
  name: string;
  type: "addition" | "removal" | "substitution";
  priceAdjustment: number;
  isDefault?: boolean;
  description?: string;
}

export interface MenuItemModifier {
  id: number;
  modifierId: number;
  name: string;
  type: "addition" | "removal" | "substitution";
  priceAdjustment: number;
  isDefault?: boolean;
  description?: string;
}
