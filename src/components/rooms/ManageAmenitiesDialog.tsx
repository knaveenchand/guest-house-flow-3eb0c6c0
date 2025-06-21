
import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Amenity } from "@/api/amenities";
import { toast } from "sonner";

interface ManageAmenitiesDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  amenities: Amenity[];
  onAddAmenity: (name: string) => Promise<void>;
  onDeleteAmenity: (id: string) => Promise<void>;
}

const ManageAmenitiesDialog = ({
  isOpen,
  onOpenChange,
  amenities,
  onAddAmenity,
  onDeleteAmenity,
}: ManageAmenitiesDialogProps) => {
  const [newAmenityName, setNewAmenityName] = useState("");

  const handleAdd = async () => {
    if (!newAmenityName.trim()) {
      toast.error("Amenity name cannot be empty.");
      return;
    }
    await onAddAmenity(newAmenityName);
    setNewAmenityName(""); // Clear input on success
  };

  const sortedAmenities = [...amenities].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Manage Amenities</DialogTitle>
          <DialogDescription>
            Add or remove amenities available for room types.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="flex gap-2">
            <Input
              value={newAmenityName}
              onChange={(e) => setNewAmenityName(e.target.value)}
              placeholder="e.g. Ocean View"
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
            <Button type="button" onClick={handleAdd}>
              Add
            </Button>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Available Amenities</h4>
            <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto p-1">
              {sortedAmenities.length > 0 ? (
                sortedAmenities.map((amenity) => (
                  <Badge key={amenity.id} variant="outline" className="flex items-center gap-2 py-1 px-3">
                    {amenity.name}
                    <button
                      type="button"
                      onClick={() => onDeleteAmenity(amenity.id!)}
                      className="rounded-full hover:bg-muted/50 p-0.5"
                      aria-label={`Delete ${amenity.name}`}
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground w-full text-center">No amenities found.</p>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageAmenitiesDialog;
