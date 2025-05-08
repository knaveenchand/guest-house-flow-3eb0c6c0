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
  modifiers?: MenuItemModifier[];
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

// Task management types
export interface Task {
  id: number;
  title: string;
  description?: string;
  location: string;
  type: TaskType;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed" | "needs-attention";
  assignedTo?: string;
  assigneePhoto?: string;
  createdAt: string;
  dueAt: string;
  completedAt?: string;
  notes?: string;
  photos?: string[];
  isUrgent?: boolean;
  isVIP?: boolean;
}

export type TaskType = "housekeeping" | "maintenance" | "car";

export interface HousekeepingTask extends Task {
  roomNumber: string;
  checkoutTime?: string;
  checkInTime?: string;
  cleaningStatus?: "not-started" | "in-progress" | "cleaned" | "inspected" | "needs-attention";
}

export interface MaintenanceTask extends Task {
  issueType: string;
  hazardLevel: "low" | "medium" | "high";
  toolsRequired?: string[];
  safetyChecklist?: { item: string; checked: boolean }[];
  isRecurring?: boolean;
  recurringFrequency?: "daily" | "weekly" | "monthly" | "quarterly" | "annually";
}

export interface CarTask extends Task {
  requestType: "airport-pickup" | "airport-dropoff" | "shopping" | "errand";
  guestName?: string;
  contactInfo?: string;
  flightDetails?: string;
  pickupLocation: string;
  dropoffLocation: string;
  items?: string[];
  budget?: number;
  vehicleAssigned?: string;
}
