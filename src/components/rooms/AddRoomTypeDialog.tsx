
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface RoomType {
  name: string;
  description: string;
  maxGuests: number;
  color: string;
  amenities: string[];
}

interface AddRoomTypeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  isEditMode: boolean;
  newRoomType: RoomType;
  setNewRoomType: React.Dispatch<React.SetStateAction<RoomType>>;
  roomNumbers: string[];
  setRoomNumbers: React.Dispatch<React.SetStateAction<string[]>>;
  newRoomNumber: string;
  setNewRoomNumber: React.Dispatch<React.SetStateAction<string>>;
  selectedAmenities: string[];
  setSelectedAmenities: React.Dispatch<React.SetStateAction<string[]>>;
  availableAmenities: string[];
  resetRoomTypeForm: () => void;
}

const AddRoomTypeDialog = ({
  isOpen,
  onOpenChange,
  onSave,
  isEditMode,
  newRoomType,
  setNewRoomType,
  roomNumbers,
  setRoomNumbers,
  newRoomNumber,
  setNewRoomNumber,
  selectedAmenities,
  setSelectedAmenities,
  availableAmenities,
  resetRoomTypeForm,
}: AddRoomTypeDialogProps) => {
  const handleAddRoomNumber = () => {
    if (newRoomNumber && !roomNumbers.includes(newRoomNumber)) {
      setRoomNumbers([...roomNumbers, newRoomNumber]);
      setNewRoomNumber("");
    }
  };
  
  const handleRemoveRoomNumber = (roomNumber: string) => {
    setRoomNumbers(roomNumbers.filter(num => num !== roomNumber));
  };
  
  const handleToggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Room Type" : "Add New Room Type"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Room Type Name
            </Label>
            <Input
              id="name"
              value={newRoomType.name}
              onChange={(e) => setNewRoomType({ ...newRoomType, name: e.target.value })}
              placeholder="e.g. Standard Room"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="max-guests" className="text-right">
              Max Guests
            </Label>
            <Input
              id="max-guests"
              type="number"
              min="1"
              max="10"
              value={newRoomType.maxGuests}
              onChange={(e) => setNewRoomType({ ...newRoomType, maxGuests: parseInt(e.target.value) })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Description
            </Label>
            <Textarea
              id="description"
              value={newRoomType.description}
              onChange={(e) => setNewRoomType({ ...newRoomType, description: e.target.value })}
              placeholder="Brief description of room features"
              className="col-span-3"
            />
          </div>
          
          {/* Room Numbers */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">
              Room Numbers
            </Label>
            <div className="col-span-3 space-y-2">
              <div className="flex gap-2">
                <Input
                  type="room-number"
                  value={newRoomNumber}
                  onChange={(e) => setNewRoomNumber(e.target.value)}
                  placeholder="101"
                  className="flex-1"
                />
                <Button type="button" onClick={handleAddRoomNumber}>
                  Add
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {roomNumbers.map((num) => (
                  <Badge key={num} className="flex items-center gap-1 py-1 px-3">
                    {num}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveRoomNumber(num)}
                      className="ml-1 rounded-full hover:bg-muted/20 p-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {roomNumbers.length === 0 && (
                  <span className="text-sm text-muted-foreground">No rooms added yet</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Total rooms: {roomNumbers.length}
              </p>
            </div>
          </div>
          
          {/* Amenities */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">
              Amenities
            </Label>
            <div className="col-span-3">
              <div className="flex flex-wrap gap-2">
                {availableAmenities.map((amenity) => (
                  <Badge 
                    key={amenity} 
                    variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
                    className="cursor-pointer py-1 px-3"
                    onClick={() => handleToggleAmenity(amenity)}
                  >
                    {amenity}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Selected: {selectedAmenities.join(", ")}
              </p>
            </div>
          </div>

          {/* Color Selection */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">
              Color
            </Label>
            <div className="col-span-3">
              <div className="flex flex-wrap gap-2">
                {["blue", "indigo", "purple", "pink", "green", "yellow", "orange", "red", "gray"].map((color) => (
                  <div 
                    key={color} 
                    className={`w-8 h-8 rounded-full cursor-pointer border-2 ${newRoomType.color === color ? 'border-black' : 'border-transparent'} bg-${color}-500`}
                    onClick={() => setNewRoomType({ ...newRoomType, color })}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => {
            resetRoomTypeForm();
            onOpenChange(false);
          }}>
            Cancel
          </Button>
          <Button type="button" onClick={onSave}>
            {isEditMode ? "Update" : "Save"} Room Type
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoomTypeDialog;
