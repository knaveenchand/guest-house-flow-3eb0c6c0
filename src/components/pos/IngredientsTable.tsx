
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ingredient } from "@/types/posTypes";
import { toast } from "sonner";

interface IngredientsTableProps {
  ingredients: Ingredient[];
  onDeleteIngredient: (id: number) => void;
  onUpdateIngredient: (ingredient: Ingredient) => void;
  onAddIngredient: (name: string, unitOfMeasure: string, cost: number, unitsPerPackage?: number) => void;
}

const IngredientsTable: React.FC<IngredientsTableProps> = ({
  ingredients,
  onDeleteIngredient,
  onUpdateIngredient,
  onAddIngredient
}) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newUnitOfMeasure, setNewUnitOfMeasure] = useState("g");
  const [newCost, setNewCost] = useState("");
  const [newUnitsPerPackage, setNewUnitsPerPackage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim() && newUnitOfMeasure && newCost) {
      onAddIngredient(
        newName.trim(),
        newUnitOfMeasure,
        parseFloat(newCost),
        newUnitsPerPackage ? parseFloat(newUnitsPerPackage) : undefined
      );
      setNewName("");
      setNewUnitOfMeasure("g");
      setNewCost("");
      setNewUnitsPerPackage("");
      setIsAddDialogOpen(false);
      toast.success("Ingredient added successfully");
    }
  };

  // Common units of measure for kitchen ingredients
  const unitOptions = [
    { value: "g", label: "Grams (g)" },
    { value: "kg", label: "Kilograms (kg)" },
    { value: "oz", label: "Ounces (oz)" },
    { value: "lb", label: "Pounds (lb)" },
    { value: "ml", label: "Milliliters (ml)" },
    { value: "l", label: "Liters (L)" },
    { value: "tsp", label: "Teaspoon (tsp)" },
    { value: "tbsp", label: "Tablespoon (tbsp)" },
    { value: "cup", label: "Cup" },
    { value: "pc", label: "Piece" },
    { value: "ea", label: "Each" }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Ingredients List</h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">Add Ingredient</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Ingredient</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ingredientName">Name</Label>
                <Input 
                  id="ingredientName" 
                  placeholder="e.g., Flour" 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unitOfMeasure">Unit of Measure</Label>
                <Select value={newUnitOfMeasure} onValueChange={setNewUnitOfMeasure}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {unitOptions.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">Cost per Package</Label>
                <Input 
                  id="cost" 
                  type="price"
                  placeholder="0.00" 
                  value={newCost}
                  onChange={(e) => {
                    // Allow only numbers and decimal point
                    const value = e.target.value.replace(/[^\d.]/g, '');
                    // Ensure only one decimal point
                    const parts = value.split('.');
                    const formattedValue = parts.length > 2 
                      ? `${parts[0]}.${parts.slice(1).join('')}`
                      : value;
                    setNewCost(formattedValue);
                  }}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unitsPerPackage">Units per Package</Label>
                <Input 
                  id="unitsPerPackage" 
                  placeholder="e.g., 500 for a 500g bag" 
                  value={newUnitsPerPackage}
                  onChange={(e) => {
                    // Allow only numbers and decimal point
                    const value = e.target.value.replace(/[^\d.]/g, '');
                    // Ensure only one decimal point
                    const parts = value.split('.');
                    const formattedValue = parts.length > 2 
                      ? `${parts[0]}.${parts.slice(1).join('')}`
                      : value;
                    setNewUnitsPerPackage(formattedValue);
                  }}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Add Ingredient
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Cost per Package</TableHead>
            <TableHead>Units per Package</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ingredients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                No ingredients added yet
              </TableCell>
            </TableRow>
          ) : (
            ingredients.map((ingredient) => (
              <TableRow key={ingredient.id}>
                <TableCell className="font-medium">{ingredient.name}</TableCell>
                <TableCell>{ingredient.unitOfMeasure}</TableCell>
                <TableCell>${ingredient.cost.toFixed(2)}</TableCell>
                <TableCell>
                  {ingredient.unitsPerPackage ? 
                    `${ingredient.unitsPerPackage} ${ingredient.unitOfMeasure}` : 
                    "Not specified"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => {
                        // Edit functionality would go here
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => onDeleteIngredient(ingredient.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default IngredientsTable;
