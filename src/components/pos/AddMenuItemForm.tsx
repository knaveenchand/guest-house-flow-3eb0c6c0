
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormLabel } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Category } from '@/types/posTypes';

interface AddMenuItemFormProps {
  categories: Category[];
  onAddItem: (name: string, price: number, categoryId: number, description?: string) => void;
}

const AddMenuItemForm: React.FC<AddMenuItemFormProps> = ({
  categories,
  onAddItem,
}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState(categories.length > 0 ? categories[0].id.toString() : "");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && price && categoryId) {
      onAddItem(
        name,
        parseFloat(price),
        parseInt(categoryId),
        description.trim() || undefined
      );
      setName("");
      setPrice("");
      setCategoryId(categories.length > 0 ? categories[0].id.toString() : "");
      setDescription("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Item
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Menu Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <FormLabel htmlFor="itemName">Item Name</FormLabel>
            <Input 
              id="itemName" 
              placeholder="Enter item name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <FormLabel htmlFor="itemPrice">Price</FormLabel>
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
          <div className="space-y-2">
            <FormLabel htmlFor="itemCategory">Category</FormLabel>
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
            <FormLabel htmlFor="itemDescription">Description (Optional)</FormLabel>
            <Input 
              id="itemDescription" 
              placeholder="Enter item description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add Item
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMenuItemForm;
