
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
  onEditItem?: (item: MenuItem) => void;
  onToggleVisibility?: (id: number, visible: boolean) => void;
}

const MenuItemsList: React.FC<MenuItemsListProps> = ({
  items,
  categories,
  onDeleteItem,
  onEditItem,
  onToggleVisibility
}) => {
  const getCategoryName = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : "Unknown";
  };

  // Calculate margin if it's not already provided
  const calculateMargin = (item: MenuItem) => {
    if (item.margin !== undefined) return item.margin;
    if (item.cost && item.price) {
      return ((item.price - item.cost) / item.price) * 100;
    }
    return null;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Cost</TableHead>
          <TableHead>Margin</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Inventory</TableHead>
          <TableHead>Visible</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{getCategoryName(item.categoryId)}</TableCell>
            <TableCell>${item.cost?.toFixed(2) || "-"}</TableCell>
            <TableCell>
              {calculateMargin(item) !== null ? `${calculateMargin(item)?.toFixed(1)}%` : "-"}
            </TableCell>
            <TableCell>${item.price.toFixed(2)}</TableCell>
            <TableCell>{item.inventory !== undefined ? item.inventory : "-"}</TableCell>
            <TableCell>
              <Switch 
                id={`visible-item-${item.id}`} 
                checked={item.visible !== false} 
                onCheckedChange={(checked) => onToggleVisibility && onToggleVisibility(item.id, checked)}
              />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => onEditItem && onEditItem(item)}
                >
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
