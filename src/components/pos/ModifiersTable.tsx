
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Modifier } from "@/types/posTypes";
import { toast } from "sonner";

interface ModifiersTableProps {
  modifiers: Modifier[];
  onDeleteModifier: (id: number) => void;
  onUpdateModifier: (modifier: Modifier) => void;
  onAddModifier: (name: string, type: "addition" | "removal" | "substitution", priceAdjustment: number, description?: string) => void;
}

const ModifiersTable: React.FC<ModifiersTableProps> = ({
  modifiers,
  onDeleteModifier,
  onUpdateModifier,
  onAddModifier
}) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingModifier, setEditingModifier] = useState<Modifier | null>(null);
  
  // New modifier state
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState<"addition" | "removal" | "substitution">("addition");
  const [newPriceAdjustment, setNewPriceAdjustment] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newName.trim() && newPriceAdjustment) {
      onAddModifier(
        newName.trim(),
        newType,
        parseFloat(newPriceAdjustment),
        newDescription.trim() || undefined
      );
      
      // Reset form fields
      setNewName("");
      setNewType("addition");
      setNewPriceAdjustment("");
      setNewDescription("");
      setIsAddDialogOpen(false);
      
      toast.success("Modifier added successfully");
    }
  };

  const handleEditClick = (modifier: Modifier) => {
    setEditingModifier(modifier);
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingModifier && editingModifier.name.trim()) {
      onUpdateModifier(editingModifier);
      setIsEditDialogOpen(false);
      toast.success("Modifier updated successfully");
    }
  };

  const modifierTypes = [
    { value: "addition", label: "Addition (Extra)" },
    { value: "removal", label: "Removal (No)" },
    { value: "substitution", label: "Substitution (Replace)" }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Modifiers List</h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">Add Modifier</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Modifier</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="modifierName">Name</Label>
                <Input 
                  id="modifierName" 
                  placeholder="e.g., Extra Cheese" 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modifierType">Type</Label>
                <Select value={newType} onValueChange={(value: "addition" | "removal" | "substitution") => setNewType(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {modifierTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priceAdjustment">Price Adjustment</Label>
                <Input 
                  id="priceAdjustment" 
                  type="text"
                  placeholder="0.00" 
                  value={newPriceAdjustment}
                  onChange={(e) => {
                    // Allow negative numbers, decimal point and digits
                    const value = e.target.value.replace(/[^\d.-]/g, '');
                    // Handle negative numbers properly
                    const formattedValue = value.replace(/(?!^)-/g, '');
                    setNewPriceAdjustment(formattedValue);
                  }}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Use positive values for additions (e.g., 1.50) and negative values for removals (e.g., -1.00)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input 
                  id="description" 
                  placeholder="Description" 
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Add Modifier
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
            <TableHead>Type</TableHead>
            <TableHead>Price Adjustment</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {modifiers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                No modifiers added yet
              </TableCell>
            </TableRow>
          ) : (
            modifiers.map((modifier) => (
              <TableRow key={modifier.id}>
                <TableCell className="font-medium">{modifier.name}</TableCell>
                <TableCell>
                  {modifier.type === "addition" && "Addition"}
                  {modifier.type === "removal" && "Removal"}
                  {modifier.type === "substitution" && "Substitution"}
                </TableCell>
                <TableCell className={modifier.priceAdjustment >= 0 ? "text-green-600" : "text-red-600"}>
                  {modifier.priceAdjustment >= 0 ? "+" : ""}{modifier.priceAdjustment.toFixed(2)}
                </TableCell>
                <TableCell>{modifier.description || "—"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleEditClick(modifier)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => onDeleteModifier(modifier.id)}
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

      {/* Edit Modifier Dialog */}
      {editingModifier && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Modifier</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="editModifierName">Name</Label>
                <Input 
                  id="editModifierName" 
                  placeholder="e.g., Extra Cheese" 
                  value={editingModifier.name}
                  onChange={(e) => setEditingModifier({...editingModifier, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editModifierType">Type</Label>
                <Select 
                  value={editingModifier.type} 
                  onValueChange={(value: "addition" | "removal" | "substitution") => 
                    setEditingModifier({...editingModifier, type: value})
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {modifierTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editPriceAdjustment">Price Adjustment</Label>
                <Input 
                  id="editPriceAdjustment" 
                  type="text"
                  placeholder="0.00" 
                  value={editingModifier.priceAdjustment.toString()}
                  onChange={(e) => {
                    // Allow negative numbers, decimal point and digits
                    const value = e.target.value.replace(/[^\d.-]/g, '');
                    // Handle negative numbers properly
                    const formattedValue = value.replace(/(?!^)-/g, '');
                    setEditingModifier({
                      ...editingModifier, 
                      priceAdjustment: formattedValue === '' ? 0 : parseFloat(formattedValue)
                    });
                  }}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editDescription">Description (Optional)</Label>
                <Input 
                  id="editDescription" 
                  placeholder="Description" 
                  value={editingModifier.description || ''}
                  onChange={(e) => setEditingModifier({...editingModifier, description: e.target.value})}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Update Modifier
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ModifiersTable;
