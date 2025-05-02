
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import AddRoomTypeDialog from "./AddRoomTypeDialog";
import RoomTypeCard from "./RoomTypeCard";

// Common amenities for selection
const availableAmenities = [
  "Wi-Fi", "TV", "Air conditioning", "Private bathroom", "Mini fridge", 
  "Safe", "Balcony", "Separate living area", "Jacuzzi", "King size bed", 
  "Queen size bed", "Twin beds", "Sea view", "Garden view", "Pool view",
  "Coffee maker", "Hair dryer", "Iron", "Room service", "Desk"
];

interface RoomType {
  name: string;
  totalRooms: number;
  description: string;
  color: string;
  roomNumbers: string[];
  amenities: string[];
  maxGuests: number;
}

interface RoomTypesProps {
  roomTypeList: RoomType[];
  setRoomTypeList: React.Dispatch<React.SetStateAction<RoomType[]>>;
  ratesData: Record<string, Record<string, string>>;
  setRatesData: React.Dispatch<React.SetStateAction<Record<string, Record<string, string>>>>;
  bookingChannels: string[];
}

const RoomTypesSection = ({ roomTypeList, setRoomTypeList, ratesData, setRatesData, bookingChannels }: RoomTypesProps) => {
  const [newRoomType, setNewRoomType] = useState({
    name: "",
    description: "",
    maxGuests: 2,
    color: "blue",
    amenities: ["Wi-Fi", "TV", "Air conditioning", "Private bathroom"],
  });
  
  const [roomNumbers, setRoomNumbers] = useState<string[]>([]);
  const [newRoomNumber, setNewRoomNumber] = useState("");
  const [isAddRoomTypeOpen, setIsAddRoomTypeOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRoomTypeIndex, setEditingRoomTypeIndex] = useState<number | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(["Wi-Fi", "TV", "Air conditioning", "Private bathroom"]);

  const resetRoomTypeForm = () => {
    setNewRoomType({
      name: "",
      description: "",
      maxGuests: 2,
      color: "blue",
      amenities: ["Wi-Fi", "TV", "Air conditioning", "Private bathroom"],
    });
    setRoomNumbers([]);
    setSelectedAmenities(["Wi-Fi", "TV", "Air conditioning", "Private bathroom"]);
    setIsEditMode(false);
    setEditingRoomTypeIndex(null);
  };

  const handleEditRoomType = (index: number) => {
    const roomType = roomTypeList[index];
    setNewRoomType({
      name: roomType.name,
      description: roomType.description,
      maxGuests: roomType.maxGuests || 2,
      color: roomType.color,
      amenities: roomType.amenities,
    });
    setRoomNumbers([...roomType.roomNumbers]);
    setSelectedAmenities([...roomType.amenities]);
    setIsEditMode(true);
    setEditingRoomTypeIndex(index);
    setIsAddRoomTypeOpen(true);
  };

  const handleAddRoomType = () => {
    if (!newRoomType.name) {
      toast.error("Please enter a room type name");
      return;
    }
    
    if (roomNumbers.length === 0) {
      toast.error("Please add at least one room number");
      return;
    }
    
    const roomTypeData = {
      name: newRoomType.name,
      totalRooms: roomNumbers.length,
      description: newRoomType.description || `${selectedAmenities.slice(0, 3).join(", ")}, ${newRoomType.maxGuests} guests max`,
      color: newRoomType.color,
      roomNumbers: [...roomNumbers],
      amenities: [...selectedAmenities],
      maxGuests: newRoomType.maxGuests
    };
    
    if (isEditMode && editingRoomTypeIndex !== null) {
      // Update existing room type
      const updatedList = [...roomTypeList];
      const oldName = updatedList[editingRoomTypeIndex].name;
      updatedList[editingRoomTypeIndex] = roomTypeData;
      setRoomTypeList(updatedList);
      
      // Update rates if the room name changed
      if (oldName !== roomTypeData.name) {
        const updatedRates = { ...ratesData };
        updatedRates[roomTypeData.name] = updatedRates[oldName];
        delete updatedRates[oldName];
        setRatesData(updatedRates);
      }
      
      toast.success(`${roomTypeData.name} updated successfully`);
    } else {
      // Check if room type with same name already exists
      if (roomTypeList.some(room => room.name === roomTypeData.name)) {
        toast.error(`Room type "${roomTypeData.name}" already exists`);
        return;
      }
      
      // Add new room type to the list
      setRoomTypeList([...roomTypeList, roomTypeData]);
      
      // Add empty rates for the new room type
      const newRates = { ...ratesData };
      newRates[newRoomType.name] = {};
      bookingChannels.forEach(channel => {
        // Default to the Walk-in rate or 100 if no rates exist yet
        const defaultRate = bookingChannels.includes("Walk-in") ? 
          (newRates["Standard Room"]?.["Walk-in"] || "100") : "100";
        newRates[newRoomType.name][channel] = defaultRate;
      });
      setRatesData(newRates);
      
      toast.success(`${roomTypeData.name} added successfully with ${roomTypeData.totalRooms} rooms`);
    }
    
    // Reset form and close dialog
    resetRoomTypeForm();
    setIsAddRoomTypeOpen(false);
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      resetRoomTypeForm();
    }
    setIsAddRoomTypeOpen(open);
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Room Types</h2>
        <Button onClick={() => setIsAddRoomTypeOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Room Type
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {roomTypeList.map((room, index) => (
          <RoomTypeCard 
            key={room.name}
            room={room}
            onEdit={handleEditRoomType}
            index={index}
          />
        ))}
      </div>

      <AddRoomTypeDialog
        isOpen={isAddRoomTypeOpen}
        onOpenChange={handleDialogOpenChange}
        onSave={handleAddRoomType}
        isEditMode={isEditMode}
        newRoomType={newRoomType}
        setNewRoomType={setNewRoomType}
        roomNumbers={roomNumbers}
        setRoomNumbers={setRoomNumbers}
        newRoomNumber={newRoomNumber}
        setNewRoomNumber={setNewRoomNumber}
        selectedAmenities={selectedAmenities}
        setSelectedAmenities={setSelectedAmenities}
        availableAmenities={availableAmenities}
        resetRoomTypeForm={resetRoomTypeForm}
      />
    </section>
  );
};

export default RoomTypesSection;
