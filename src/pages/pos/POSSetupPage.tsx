
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Menu, Clock, DollarSign, Printer, FileText, SlidersHorizontal, Wheat, Percent, ArrowLeft, Eye, Edit, Trash2, PlusCircle, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category, MenuItem, Ingredient } from "@/types/posTypes";
import CategoryTable from "@/components/pos/CategoryTable";
import AddCategoryForm from "@/components/pos/AddCategoryForm";
import MenuItemsList from "@/components/pos/MenuItemsList";
import AddMenuItemForm from "@/components/pos/AddMenuItemForm";
import IngredientsTable from "@/components/pos/IngredientsTable";
import { toast } from "sonner";

const POSSetupPage = () => {
  const [activeTab, setActiveTab] = useState("tables");
  const [activeMenuSection, setActiveMenuSection] = useState("categories");
  
  // Sample category data with colors and icons
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Breakfast", color: "#22c55e", icon: "Coffee", items: 2 },
    { id: 2, name: "Lunch", color: "#f97316", icon: "Pizza", items: 3 },
    { id: 3, name: "Drinks", color: "#0ea5e9", icon: "Beer", items: 1 }
  ]);
  
  // Sample menu items
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: 1, name: "Eggs Benedict", price: 12.99, categoryId: 1, description: "Poached eggs on English muffin" },
    { id: 2, name: "Pancakes", price: 9.99, categoryId: 1 },
    { id: 3, name: "Burger", price: 15.99, categoryId: 2 },
    { id: 4, name: "Caesar Salad", price: 10.99, categoryId: 2 },
    { id: 5, name: "Pizza Margherita", price: 14.99, categoryId: 2 },
    { id: 6, name: "Cold Brew", price: 4.99, categoryId: 3 }
  ]);
  
  // Sample ingredients data
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: 1, name: "Flour", unitOfMeasure: "kg", cost: 1.20, quantity: 0, inStock: 5.0 },
    { id: 2, name: "Eggs", unitOfMeasure: "pc", cost: 0.25, quantity: 0, inStock: 24 },
    { id: 3, name: "Milk", unitOfMeasure: "l", cost: 2.50, quantity: 0, inStock: 3.5 }
  ]);
  
  // Available colors for selector
  const colorOptions = [
    { value: "#22c55e", label: "Green" },
    { value: "#f97316", label: "Orange" },
    { value: "#0ea5e9", label: "Blue" },
    { value: "#8b5cf6", label: "Purple" },
    { value: "#ec4899", label: "Pink" },
    { value: "#ef4444", label: "Red" }
  ];
  
  // Available icons for selector
  const iconOptions = [
    { value: "Coffee", label: "Coffee" },
    { value: "Pizza", label: "Pizza" },
    { value: "Beer", label: "Beer" },
    { value: "Wheat", label: "Wheat" },
    { value: "Clock", label: "Clock" }
  ];

  // Function to add a new category
  const handleAddCategory = (name: string, color: string, icon: string) => {
    const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    const newCategory = {
      id: newId,
      name,
      color,
      icon,
      items: 0
    };
    setCategories([...categories, newCategory]);
    toast.success(`Category "${name}" added successfully`);
  };

  // Function to delete a category
  const handleDeleteCategory = (id: number) => {
    const categoryToDelete = categories.find(c => c.id === id);
    // Check if category has items
    const itemsInCategory = menuItems.filter(item => item.categoryId === id);
    
    if (itemsInCategory.length > 0) {
      toast.error(`Cannot delete category "${categoryToDelete?.name}". It contains ${itemsInCategory.length} items.`);
      return;
    }
    
    setCategories(categories.filter(c => c.id !== id));
    toast.success(`Category "${categoryToDelete?.name}" deleted`);
  };

  // Function to update a category
  const handleUpdateCategory = (updatedCategory: Category) => {
    setCategories(categories.map(c => 
      c.id === updatedCategory.id ? updatedCategory : c
    ));
  };

  // Function to add a new menu item
  const handleAddMenuItem = (name: string, price: number, categoryId: number, description?: string) => {
    const newId = menuItems.length > 0 ? Math.max(...menuItems.map(item => item.id)) + 1 : 1;
    const newItem = {
      id: newId,
      name,
      price,
      categoryId,
      description
    };
    setMenuItems([...menuItems, newItem]);
    
    // Update the item count for the category
    setCategories(categories.map(cat => 
      cat.id === categoryId ? { ...cat, items: cat.items + 1 } : cat
    ));
    
    toast.success(`Menu item "${name}" added successfully`);
  };

  // Function to delete a menu item
  const handleDeleteMenuItem = (id: number) => {
    const itemToDelete = menuItems.find(item => item.id === id);
    if (itemToDelete) {
      setMenuItems(menuItems.filter(item => item.id !== id));
      
      // Update the item count for the category
      setCategories(categories.map(cat => 
        cat.id === itemToDelete.categoryId ? { ...cat, items: cat.items - 1 } : cat
      ));
      
      toast.success(`Menu item "${itemToDelete.name}" deleted`);
    }
  };
  
  // Function to toggle item visibility
  const handleToggleItemVisibility = (id: number, visible: boolean) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, visible } : item
    ));
    
    const itemName = menuItems.find(item => item.id === id)?.name;
    toast.success(`${itemName} is now ${visible ? 'visible' : 'hidden'}`);
  };

  // Function to add a new ingredient
  const handleAddIngredient = (name: string, unitOfMeasure: string, cost: number, inStock: number) => {
    const newId = ingredients.length > 0 ? Math.max(...ingredients.map(ing => ing.id)) + 1 : 1;
    const newIngredient = {
      id: newId,
      name,
      unitOfMeasure,
      cost,
      quantity: 0,
      inStock
    };
    setIngredients([...ingredients, newIngredient]);
  };

  // Function to delete an ingredient
  const handleDeleteIngredient = (id: number) => {
    const ingredientToDelete = ingredients.find(ing => ing.id === id);
    if (ingredientToDelete) {
      setIngredients(ingredients.filter(ing => ing.id !== id));
      toast.success(`Ingredient "${ingredientToDelete.name}" deleted`);
    }
  };

  // Function to update an ingredient
  const handleUpdateIngredient = (updatedIngredient: Ingredient) => {
    setIngredients(ingredients.map(ing => 
      ing.id === updatedIngredient.id ? updatedIngredient : ing
    ));
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="tables">Tables</TabsTrigger>
            <TabsTrigger value="menu">Menu Items</TabsTrigger>
            <TabsTrigger value="general-settings">General Settings</TabsTrigger>
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tables" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  {/* Floor plan editor would go here */}
                  <div className="aspect-video bg-gray-100 rounded-md border border-dashed border-gray-300 mb-4 flex items-center justify-center">
                    <p className="text-gray-500">Table Layout Editor</p>
                  </div>
                  <Link to="/pos/tables">
                    <Button className="w-full">
                      Edit Table Layout
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="menu" className="space-y-4 mt-4">
            <Card>
              <CardContent className="pt-6">
                {/* Horizontal Toggle Group for Menu Sections */}
                <div className="mb-6 overflow-x-auto pb-2">
                  <ToggleGroup 
                    type="single"
                    value={activeMenuSection}
                    onValueChange={(value) => value && setActiveMenuSection(value)} 
                    className="flex flex-wrap gap-2"
                    variant="outline"
                  >
                    <ToggleGroupItem 
                      value="categories" 
                      className={`flex items-center gap-2 ${activeMenuSection === "categories" ? "bg-green-500 text-white hover:bg-green-600" : ""}`}
                    >
                      <Menu className="h-4 w-4" />
                      <span>Categories</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="items" 
                      className={`flex items-center gap-2 ${activeMenuSection === "items" ? "bg-green-500 text-white hover:bg-green-600" : ""}`}
                    >
                      <FileText className="h-4 w-4" />
                      <span>Items</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="modifiers" 
                      className={`flex items-center gap-2 ${activeMenuSection === "modifiers" ? "bg-green-500 text-white hover:bg-green-600" : ""}`}
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                      <span>Modifiers</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="ingredients" 
                      className={`flex items-center gap-2 ${activeMenuSection === "ingredients" ? "bg-green-500 text-white hover:bg-green-600" : ""}`}
                    >
                      <Wheat className="h-4 w-4" />
                      <span>Ingredients</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="discounts" 
                      className={`flex items-center gap-2 ${activeMenuSection === "discounts" ? "bg-green-500 text-white hover:bg-green-600" : ""}`}
                    >
                      <Percent className="h-4 w-4" />
                      <span>Discounts</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="refunds" 
                      className={`flex items-center gap-2 ${activeMenuSection === "refunds" ? "bg-green-500 text-white hover:bg-green-600" : ""}`}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Refunds</span>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                {/* Content based on selected section */}
                {activeMenuSection === "categories" && (
                  <div className="p-4 border rounded-md bg-green-50">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Categories</h3>
                    </div>
                    
                    <CategoryTable 
                      categories={categories}
                      colorOptions={colorOptions}
                      iconOptions={iconOptions}
                      onDeleteCategory={handleDeleteCategory}
                      onUpdateCategory={handleUpdateCategory}
                    />
                    
                    <div className="mt-4">
                      <AddCategoryForm 
                        colorOptions={colorOptions}
                        iconOptions={iconOptions}
                        onAddCategory={handleAddCategory}
                      />
                    </div>
                  </div>
                )}

                {activeMenuSection === "items" && (
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Items</h3>
                    </div>
                    
                    <MenuItemsList 
                      items={menuItems}
                      categories={categories.map(c => ({ id: c.id, name: c.name }))}
                      onDeleteItem={handleDeleteMenuItem}
                      onToggleVisibility={handleToggleItemVisibility}
                    />
                    
                    <div className="mt-4">
                      <AddMenuItemForm 
                        categories={categories}
                        onAddItem={handleAddMenuItem}
                      />
                    </div>
                  </div>
                )}

                {activeMenuSection === "modifiers" && (
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Modifiers</h3>
                      <Button size="sm" variant="outline">Add Modifier</Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Add options that modify menu items</p>
                  </div>
                )}

                {activeMenuSection === "ingredients" && (
                  <div className="p-4 border rounded-md">
                    <IngredientsTable 
                      ingredients={ingredients}
                      onAddIngredient={handleAddIngredient}
                      onDeleteIngredient={handleDeleteIngredient}
                      onUpdateIngredient={handleUpdateIngredient}
                    />
                  </div>
                )}

                {activeMenuSection === "discounts" && (
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Discounts</h3>
                      <Button size="sm" variant="outline">Add Discount</Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Configure promotional discounts</p>
                  </div>
                )}

                {activeMenuSection === "refunds" && (
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Refunds</h3>
                      <Button size="sm" variant="outline">Refund Settings</Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Manage refund policies and procedures</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="general-settings" className="space-y-4 mt-4">
            <h2 className="text-xl font-semibold">General Settings</h2>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-lg mb-4">Shifts & Time Clock</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Shifts</h4>
                        <p className="text-sm text-muted-foreground">Track cash that goes in and out of your drawer</p>
                      </div>
                      <Switch id="shifts" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Time clock</h4>
                        <p className="text-sm text-muted-foreground">Track employees' clock in/out time</p>
                      </div>
                      <Switch id="timeclock" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-lg mb-4">Orders & Tickets</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Open tickets</h4>
                        <p className="text-sm text-muted-foreground">Allow to save and edit orders before payment</p>
                      </div>
                      <Switch id="open-tickets" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Kitchen printers & Cash Drawers</h4>
                        <p className="text-sm text-muted-foreground">Send orders to kitchen printer or display</p>
                      </div>
                      <Switch id="kitchen-printers" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Customer displays</h4>
                        <p className="text-sm text-muted-foreground">Display order information to customers</p>
                      </div>
                      <Switch id="customer-displays" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Dining options</h4>
                        <p className="text-sm text-muted-foreground">Mark orders as dine in, takeout or delivery</p>
                      </div>
                      <Switch id="dining-options" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-lg mb-4">Inventory</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Low stock notifications</h4>
                        <p className="text-sm text-muted-foreground">Get daily email on items that are low or out of stock</p>
                      </div>
                      <Switch id="low-stock" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Negative stock alerts</h4>
                        <p className="text-sm text-muted-foreground">Warn cashiers when selling more than available stock</p>
                      </div>
                      <Switch id="negative-stock" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Weight embedded barcodes</h4>
                        <p className="text-sm text-muted-foreground">Scan barcodes with embedded weight</p>
                      </div>
                      <Switch id="weight-barcodes" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="payment-methods" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Payment Methods</h2>
              <Button>
                <span className="mr-2">+</span>
                Add Payment Method
              </Button>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Cash</h3>
                      <p className="text-sm text-muted-foreground">Default payment method</p>
                    </div>
                    <Switch id="cash" defaultChecked />
                  </div>
                  
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Credit Card</h3>
                      <p className="text-sm text-muted-foreground">Visa, Mastercard, etc.</p>
                    </div>
                    <Switch id="card" defaultChecked />
                  </div>
                  
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Mobile Payment</h3>
                      <p className="text-sm text-muted-foreground">Apple Pay, Google Pay, etc.</p>
                    </div>
                    <Switch id="mobile" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default POSSetupPage;
