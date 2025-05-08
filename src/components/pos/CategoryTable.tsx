
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Circle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category } from "@/types/posTypes";

interface CategoryTableProps {
  categories: Category[];
  colorOptions: { value: string; label: string }[];
  iconOptions: { value: string; label: string }[];
  onDeleteCategory: (id: number) => void;
  onUpdateCategory: (category: Category) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  colorOptions,
  iconOptions,
  onDeleteCategory,
  onUpdateCategory,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Color</TableHead>
          <TableHead>Icon</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Visible</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium">{category.name}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Circle className="h-4 w-4" fill={category.color} color={category.color} />
                <Select 
                  defaultValue={category.color}
                  onValueChange={(value) => onUpdateCategory({ ...category, color: value })}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center gap-2">
                          <Circle className="h-3 w-3" fill={color.value} color={color.value} />
                          <span>{color.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TableCell>
            <TableCell>
              <Select 
                defaultValue={category.icon}
                onValueChange={(value) => onUpdateCategory({ ...category, icon: value })}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Icon" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((icon) => (
                    <SelectItem key={icon.value} value={icon.value}>
                      {icon.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>{category.items}</TableCell>
            <TableCell>
              <Switch 
                id={`visible-${category.id}`} 
                defaultChecked 
              />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => onDeleteCategory(category.id)}
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

export default CategoryTable;
