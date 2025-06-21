
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { RoomType, addRoomType, updateRoomType } from "@/api/roomTypes";
import { Amenity, getAmenities, addAmenity, deleteAmenity } from "@/api/amenities";
import { BookingChannel } from "@/api/bookingChannels";

import AddRoomTypeDialog from "./AddRoomTypeDialog";
import RoomTypeCard from "./RoomTypeCard";
import ManageAmenitiesDialog from "./ManageAmenitiesDialog";

type RoomTypeCoreData = Omit<RoomType, 'id' | 'rates' | 'roomNumbers' | 'amenities'>;
interface RoomTypesProps {
  roomTypeList: RoomType[];
  setRoomTypeList: React.Dispatch<React.SetStateAction<RoomType[]>>;
  bookingChannels: BookingChannel[];
}

const RoomTypesSection = ({ roomTypeList, setRoomTypeList, bookingChannels }: RoomTypesProps) => {
  const [availableAmenities, setAvailableAmenities] = useState<Amenity[]>([]);
  const [isAddRoomTypeOpen, setIsAddRoomTypeOpen] = useState(false);
  const [isManageAmenitiesOpen, setIsManageAmenitiesOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRoomType, setEditingRoomType] = useState<RoomType | null>(null);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const amenities = await getAmenities();
        setAvailableAmenities(amenities);
      } catch (error) {
        console.error("Error fetching amenities:", error);
        toast.error("Failed to load amenities.");
      }
    };

    fetchAmenities();
  }, []);

  const handleAddAmenity = async (name: string) => {
    try {
      const newAmenity: Omit<Amenity, 'id'> = { name };
      const docRef = await addAmenity(newAmenity);
      const addedAmenity = { ...newAmenity, id: docRef.id };
      setAvailableAmenities(prev => [...prev, addedAmenity]);
      toast.success(`Amenity "${name}" added.`);
    } catch (error) {
      console.error("Error adding amenity:", error);
      toast.error(`Failed to add amenity "${name}".`);
    }
  };

  const handleDeleteAmenity = async (id: string) => {
    // Optimistically remove from state
    const originalAmenities = [...availableAmenities];
    setAvailableAmenities(prev => prev.filter(a => a.id !== id));
    
    try {
      await deleteAmenity(id);
      toast.success("Amenity deleted.");
    } catch (error) {
      // Revert if there's an error
      setAvailableAmenities(originalAmenities);
      console.error("Error deleting amenity:", error);
      toast.error("Failed to delete amenity.");
    }
  };
  
  const handleOpenAddDialog = () => {
    setIsEditMode(false);
    setEditingRoomType(null);
    setIsAddRoomTypeOpen(true);
  };

  const handleOpenEditDialog = (roomType: RoomType) => {
    setIsEditMode(true);
    setEditingRoomType(roomType);
    setIsAddRoomTypeOpen(true);
  };
  
  const handleSaveRoomType = async (roomTypeData: RoomTypeCoreData, roomNumbers: string[], amenities: Amenity[]) => {
    if (!roomTypeData.name) {
      toast.error("Please enter a room type name");
      return;
    }
    
    if (roomNumbers.length === 0) {
      toast.error("Please add at least one room number");
      return;
    }

    const newRoomTypeData: Omit<RoomType, 'id'> = {
      ...roomTypeData,
      roomNumbers,
      amenities,
      rates: {},
    };

    try {
      if (isEditMode && editingRoomType) {
        // Update existing room type
        const updatedRoomType = { ...editingRoomType, ...newRoomTypeData };
        await updateRoomType(editingRoomType.id!, updatedRoomType);
        setRoomTypeList(prevList => prevList.map(rt => rt.id === editingRoomType.id ? updatedRoomType : rt));
        toast.success(`${updatedRoomType.name} updated successfully`);
      } else {
        // Add new room type
        const docRef = await addRoomType(newRoomTypeData);
        const addedRoomType = { ...newRoomTypeData, id: docRef.id };
        setRoomTypeList(prevList => [...prevList, addedRoomType]);
        toast.success(`${addedRoomType.name} added successfully`);
      }
      setIsAddRoomTypeOpen(false);
    } catch (error) {
      console.error("Error saving room type:", error);
      toast.error("Failed to save room type.");
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Room Types</h2>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setIsManageAmenitiesOpen(true)}>
            Manage Amenities
          </Button>
          <Button onClick={handleOpenAddDialog}>
            <Plus className="h-4 w-4 mr-2" />
            Add Room Type
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 grid-cols-1">
        {roomTypeList.map((room) => (
          <RoomTypeCard 
            key={room.id}
            room={room}
            onEdit={() => handleOpenEditDialog(room)}
          />
        ))}
        {roomTypeList.length === 0 && (
          <div className="text-center py-10 border border-dashed rounded-md">
            <p className="text-muted-foreground">No room types yet. Add your first room type to get started.</p>
          </div>
        )}
      </div>

      <AddRoomTypeDialog
        isOpen={isAddRoomTypeOpen}
        onOpenChange={setIsAddRoomTypeOpen}
        onSave={handleSaveRoomType}
        isEditMode={isEditMode}
        roomType={editingRoomType}
        availableAmenities={availableAmenities}
        bookingChannels={bookingChannels}
      />
      
      <ManageAmenitiesDialog
        isOpen={isManageAmenitiesOpen}
        onOpenChange={setIsManageAmenitiesOpen}
        amenities={availableAmenities}
        onAddAmenity={handleAddAmenity}
        onDeleteAmenity={handleDeleteAmenity}
      />
    </section>
  );
};

export default RoomTypesSection;
