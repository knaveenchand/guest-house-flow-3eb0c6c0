
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Category, MenuItem, Ingredient, Modifier, MenuItemModifier } from '@/types/posTypes';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Trash2, Plus, Check } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

interface EditMenuItemFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  item: MenuItem;
  categories: Category[];
  ingredients: Ingredient[];
  modifiers: Modifier[];
  onUpdateItem: (updatedItem: MenuItem) => void;
}

const EditMenuItemForm: React.FC<EditMenuItemFormProps> = ({
  open,
  setOpen,
  item,
  categories,
  ingredients,
  modifiers,
  onUpdateItem,
}) => {
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price.toString());
  const [categoryId, setCategoryId] = useState(item.categoryId.toString());
  const [description, setDescription] = useState(item.description || "");
  const [activeTab, setActiveTab] = useState("ingredients");
  
  // Ingredients state
  const [selectedIngredients, setSelectedIngredients] = useState<
    Array<{ id: number; ingredient: Ingredient; quantity: number }>
  >([]);
  const [selectedIngredientId, setSelectedIngredientId] = useState<string>("");
  const [selectedQuantity, setSelectedQuantity] = useState<string>("1");

  // Modifiers state
  const [selectedModifiers, setSelectedModifiers] = useState<MenuItemModifier[]>([]);

  // Calculate total cost based on ingredients
  const calculateTotalCost = () => {
    return selectedIngredients.reduce((total, item) => {
      const unitCost = item.ingredient.unitsPerPackage 
        ? item.ingredient.cost / item.ingredient.unitsPerPackage 
        : item.ingredient.cost;
      return total + (unitCost * item.quantity);
    }, 0);
  };

  // Calculate margin based on cost and price
  const calculateMargin = () => {
    const totalCost = calculateTotalCost();
    const currentPrice = parseFloat(price);
    if (totalCost > 0 && currentPrice > 0) {
      return ((currentPrice - totalCost) / currentPrice) * 100;
    }
    return 0;
  };

  // Initialize selected ingredients from item
  useEffect(() => {
    if (item.ingredients) {
      const initialIngredients = item.ingredients.map(ing => {
        const ingredient = ingredients.find(i => i.id === ing.id);
        return {
          id: ing.id,
          ingredient: ingredient!,
          quantity: ing.quantity
        };
      }).filter(ing => ing.ingredient); // Filter out any that couldn't be found
      
      setSelectedIngredients(initialIngredients);
    } else {
      setSelectedIngredients([]);
    }
    
    // Initialize selected modifiers
    if (item.modifiers) {
      setSelectedModifiers(item.modifiers);
    } else {
      setSelectedModifiers([]);
    }
  }, [item, ingredients]);

  const handleAddIngredient = () => {
    if (!selectedIngredientId) return;
    
    const ingredient = ingredients.find(i => i.id === parseInt(selectedIngredientId));
    if (!ingredient) return;
    
    const quantity = parseFloat(selectedQuantity) || 1;
    
    // Check if this ingredient is already in the list
    const existingIndex = selectedIngredients.findIndex(i => i.id === ingredient.id);
    
    if (existingIndex >= 0) {
      // Update existing ingredient quantity
      const updated = [...selectedIngredients];
      updated[existingIndex].quantity += quantity;
      setSelectedIngredients(updated);
    } else {
      // Add new ingredient
      setSelectedIngredients([
        ...selectedIngredients,
        { id: ingredient.id, ingredient, quantity }
      ]);
    }
    
    // Reset selection
    setSelectedIngredientId("");
    setSelectedQuantity("1");
  };

  const handleRemoveIngredient = (id: number) => {
    setSelectedIngredients(selectedIngredients.filter(item => item.id !== id));
  };

  const handleToggleModifier = (modifier: Modifier) => {
    // Check if the modifier is already selected
    const existing = selectedModifiers.find(m => m.modifierId === modifier.id);
    
    if (existing) {
      // Remove modifier
      setSelectedModifiers(selectedModifiers.filter(m => m.modifierId !== modifier.id));
    } else {
      // Add modifier
      setSelectedModifiers([
        ...selectedModifiers,
        {
          id: Date.now(), // Generate a temporary id
          modifierId: modifier.id,
          name: modifier.name,
          type: modifier.type,
          priceAdjustment: modifier.priceAdjustment,
          isDefault: false,
          description: modifier.description
        }
      ]);
    }
  };

  const handleSetModifierDefault = (modifierId: number, isDefault: boolean) => {
    setSelectedModifiers(
      selectedModifiers.map(m => 
        m.modifierId === modifierId ? { ...m, isDefault } : m
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim() && price && categoryId) {
      const totalCost = calculateTotalCost();
      const marginValue = calculateMargin();
      
      // Map selectedIngredients to the format expected in MenuItem
      const itemIngredients = selectedIngredients.map(sel => ({
        id: sel.id,
        name: sel.ingredient.name,
        unitOfMeasure: sel.ingredient.unitOfMeasure,
        cost: sel.ingredient.cost,
        quantity: sel.quantity,
        unitsPerPackage: sel.ingredient.unitsPerPackage
      }));
      
      onUpdateItem({
        ...item,
        name: name.trim(),
        price: parseFloat(price),
        categoryId: parseInt(categoryId),
        description: description.trim() || undefined,
        cost: totalCost,
        margin: marginValue,
        ingredients: itemIngredients,
        modifiers: selectedModifiers
      });
      
      setOpen(false);
      toast.success(`Menu item "${name}" updated successfully`);
    }
  };

  // Calculate cost per unit for display
  const getCostPerUnit = (ingredient: Ingredient) => {
    if (ingredient.unitsPerPackage && ingredient.unitsPerPackage > 0) {
      return ingredient.cost / ingredient.unitsPerPackage;
    }
    return ingredient.cost;
  };

  // Calculate ingredient cost for the recipe
  const calculateIngredientCost = (ingredient: Ingredient, quantity: number) => {
    const unitCost = getCostPerUnit(ingredient);
    return unitCost * quantity;
  };
  
  // Calculate total price adjustment from modifiers
  const calculateModifiersAdjustment = () => {
    return selectedModifiers.reduce((total, modifier) => {
      return total + (modifier.isDefault ? modifier.priceAdjustment : 0);
    }, 0);
  };

  // Calculate final price with default modifiers
  const calculateFinalPrice = () => {
    const basePrice = parseFloat(price) || 0;
    const modifiersAdjustment = calculateModifiersAdjustment();
    return basePrice + modifiersAdjustment;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit Menu Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="itemName">Item Name</Label>
            <Input 
              id="itemName" 
              placeholder="Enter item name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="itemCategory">Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="itemDescription">Description (Optional)</Label>
            <Input 
              id="itemDescription" 
              placeholder="Enter item description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="modifiers">Modifiers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ingredients" className="space-y-4 pt-4">
              <div className="border p-4 rounded-md space-y-4">
                <h3 className="font-medium">Ingredients</h3>
                
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Select value={selectedIngredientId} onValueChange={setSelectedIngredientId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ingredient" />
                      </SelectTrigger>
                      <SelectContent>
                        {ingredients.map((ingredient) => {
                          const costPerUnit = getCostPerUnit(ingredient);
                          return (
                            <SelectItem key={ingredient.id} value={ingredient.id.toString()}>
                              {ingredient.name} (${costPerUnit.toFixed(2)} per {ingredient.unitOfMeasure})
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-20">
                    <Input 
                      placeholder="Qty" 
                      value={selectedQuantity}
                      onChange={(e) => {
                        // Allow only numbers and decimal point
                        const value = e.target.value.replace(/[^\d.]/g, '');
                        // Ensure only one decimal point
                        const parts = value.split('.');
                        const formattedValue = parts.length > 2 
                          ? `${parts[0]}.${parts.slice(1).join('')}`
                          : value;
                        setSelectedQuantity(formattedValue);
                      }}
                    />
                  </div>
                  
                  <Button 
                    type="button" 
                    onClick={handleAddIngredient}
                    disabled={!selectedIngredientId}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {selectedIngredients.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ingredient</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedIngredients.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.ingredient.name}</TableCell>
                          <TableCell>{item.quantity} {item.ingredient.unitOfMeasure}</TableCell>
                          <TableCell>${calculateIngredientCost(item.ingredient, item.quantity).toFixed(2)}</TableCell>
                          <TableCell>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleRemoveIngredient(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center py-4 text-sm text-muted-foreground">No ingredients added</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="modifiers" className="space-y-4 pt-4">
              <div className="border p-4 rounded-md">
                <h3 className="font-medium mb-4">Available Modifiers</h3>
                
                {modifiers.length > 0 ? (
                  <div className="space-y-2">
                    {modifiers.map((modifier) => {
                      const isSelected = selectedModifiers.some(m => m.modifierId === modifier.id);
                      const currentMod = selectedModifiers.find(m => m.modifierId === modifier.id);
                      
                      return (
                        <div key={modifier.id} className="flex items-center justify-between border p-3 rounded-md">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              checked={isSelected}
                              onCheckedChange={() => handleToggleModifier(modifier)}
                              id={`modifier-${modifier.id}`}
                            />
                            <div>
                              <Label 
                                htmlFor={`modifier-${modifier.id}`}
                                className="font-medium cursor-pointer"
                              >
                                {modifier.name}
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                {modifier.type === "addition" && "Addition"} 
                                {modifier.type === "removal" && "Removal"} 
                                {modifier.type === "substitution" && "Substitution"} 
                                {" "}
                                <span className={modifier.priceAdjustment >= 0 ? "text-green-600" : "text-red-600"}>
                                  ({modifier.priceAdjustment >= 0 ? "+" : ""}{modifier.priceAdjustment.toFixed(2)})
                                </span>
                              </p>
                            </div>
                          </div>
                          
                          {isSelected && (
                            <div className="flex items-center">
                              <div className="mr-2">
                                <Label 
                                  htmlFor={`default-${modifier.id}`}
                                  className="text-sm mr-2"
                                >
                                  Default
                                </Label>
                                <Checkbox 
                                  id={`default-${modifier.id}`}
                                  checked={currentMod?.isDefault || false}
                                  onCheckedChange={(checked) => 
                                    handleSetModifierDefault(modifier.id, checked === true)
                                  }
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-center py-4 text-sm text-muted-foreground">
                    No modifiers available. Add modifiers in the Modifiers section.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted rounded-md">
            <div className="sm:w-1/4">
              <div className="text-sm text-muted-foreground">Cost</div>
              <div className="text-lg font-semibold">${calculateTotalCost().toFixed(2)}</div>
            </div>
            
            <div className="sm:w-1/4">
              <Label htmlFor="itemPrice">Base Price</Label>
              <Input 
                id="itemPrice" 
                type="price"
                placeholder="0.00" 
                value={price}
                onChange={(e) => {
                  // Allow only numbers and decimal point
                  const value = e.target.value.replace(/[^\d.]/g, '');
                  // Ensure only one decimal point
                  const parts = value.split('.');
                  const formattedValue = parts.length > 2 
                    ? `${parts[0]}.${parts.slice(1).join('')}`
                    : value;
                  setPrice(formattedValue);
                }}
                required
              />
            </div>
            
            <div className="sm:w-1/4">
              <div className="text-sm text-muted-foreground">Margin</div>
              <div className="text-lg font-semibold">{calculateMargin().toFixed(1)}%</div>
            </div>
            
            <div className="sm:w-1/4">
              <div className="text-sm text-muted-foreground">Price with Default Modifiers</div>
              <div className="text-lg font-semibold">${calculateFinalPrice().toFixed(2)}</div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Update Item
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMenuItemForm;
