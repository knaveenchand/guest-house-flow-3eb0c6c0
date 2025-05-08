
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { MenuItem } from "@/types/posTypes";

interface MenuItemsListProps {
  items: MenuItem[];
  categories: { id: number; name: string }[];
  onDeleteItem: (id: number) => void;
}

const MenuItemsList: React.FC<MenuItemsListProps> = ({
  items,
  categories,
  onDeleteItem
}) => {
  const getCategoryName = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : "Unknown";
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Visible</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>${item.price.toFixed(2)}</TableCell>
            <TableCell>{getCategoryName(item.categoryId)}</TableCell>
            <TableCell>
              <Switch id={`visible-item-${item.id}`} defaultChecked />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => onDeleteItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MenuItemsList;
