
import { BedDouble, Edit } from "lucide-react";
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
        
        {/* Room details as rows */}
        <div className="grid grid-cols-1 gap-2">
          {/* Room numbers row */}
          <div className="flex">
            <div className="w-1/3 text-xs font-medium">Room numbers:</div>
            <div className="w-2/3 text-xs text-muted-foreground">
              {room.roomNumbers?.slice(0, 5).join(", ") || "None"}
              {room.roomNumbers?.length > 5 && ` +${room.roomNumbers.length - 5} more`}
            </div>
          </div>
          
          {/* Amenities row */}
          <div className="flex">
            <div className="w-1/3 text-xs font-medium">Amenities:</div>
            <div className="w-2/3 text-xs text-muted-foreground">
              <div className="flex flex-col">
                {room.amenities?.length > 0 ? (
                  room.amenities.map((amenity, i) => (
                    <span key={i} className="mb-1">
                      {amenity}
                    </span>
                  ))
                ) : (
                  <span>None</span>
                )}
              </div>
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
