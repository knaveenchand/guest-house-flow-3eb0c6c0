
import { BedDouble, Edit, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RoomTypeCardProps {
  room: {
    name: string;
    totalRooms: number;
    description: string;
    color: string;
    roomNumbers: string[];
    amenities: string[];
    maxGuests: number;
  };
  onEdit: (index: number) => void;
  index: number;
}

const RoomTypeCard = ({ room, onEdit, index }: RoomTypeCardProps) => {
  // Map colors to Tailwind classes
  const colorMap: Record<string, string> = {
    blue: "bg-blue-500",
    indigo: "bg-indigo-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    orange: "bg-orange-500",
    red: "bg-red-500",
    gray: "bg-gray-500",
    cyan: "bg-cyan-500",
    teal: "bg-teal-500",
    lime: "bg-lime-500",
    emerald: "bg-emerald-500",
    sky: "bg-sky-500",
    rose: "bg-rose-500",
    amber: "bg-amber-500",
    violet: "bg-violet-500",
    fuchsia: "bg-fuchsia-500",
  };

  // Sort amenities alphabetically
  const sortedAmenities = [...room.amenities].sort();

  return (
    <Card key={room.name} className="w-full">
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BedDouble className={`h-5 w-5 text-${room.color}-500`} />
            <h3 className="font-medium">{room.name}</h3>
          </div>
          <Badge className={cn(colorMap[room.color] || "bg-blue-500")}>
            {room.totalRooms || room.roomNumbers?.length || 0} rooms
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{room.description}</p>
        
        {/* Three column layout */}
        <div className="grid grid-cols-3 gap-4">
          {/* Column A: Room Type & Number of Rooms */}
          <div className="space-y-2">
            <div className="text-xs font-medium">Room Type</div>
            <div className="text-xs text-muted-foreground">{room.name}</div>
            
            <div className="text-xs font-medium mt-2">Room Numbers</div>
            <div className="text-xs text-muted-foreground">
              {room.roomNumbers?.slice(0, 3).join(", ") || "None"}
              {room.roomNumbers?.length > 3 && ` +${room.roomNumbers.length - 3} more`}
            </div>
          </div>
          
          {/* Column B: Number of Guests */}
          <div className="space-y-2">
            <div className="text-xs font-medium flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              <span>Guests</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Max {room.maxGuests || 2} per room
            </div>
          </div>
          
          {/* Column C: Amenities (alphabetical) */}
          <div className="space-y-2">
            <div className="text-xs font-medium">Amenities</div>
            <div className="space-y-1">
              {sortedAmenities.length > 0 ? (
                sortedAmenities.map((amenity, i) => (
                  <div key={i} className="text-xs text-muted-foreground">
                    {amenity}
                  </div>
                ))
              ) : (
                <div className="text-xs text-muted-foreground">None</div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-3 flex justify-end space-x-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(index)}>
            <Edit className="h-4 w-4 mr-1" /> Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomTypeCard;
