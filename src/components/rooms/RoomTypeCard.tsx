
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
    <Card key={room.name}>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BedDouble className={`h-5 w-5 text-${room.color}-500`} />
            <h3 className="font-medium">{room.name}</h3>
          </div>
          <Badge className={cn(colorMap[room.color] || "bg-blue-500")}>
            {room.totalRooms || room.roomNumbers?.length || 0} rooms
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{room.description}</p>
        
        {/* Room details */}
        <div className="mt-3">
          <div className="text-xs text-muted-foreground mt-1">
            <strong>Room numbers:</strong> {room.roomNumbers?.slice(0, 5).join(", ") || "None"}
            {room.roomNumbers?.length > 5 && ` +${room.roomNumbers.length - 5} more`}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            <strong>Amenities:</strong> {room.amenities?.slice(0, 4).join(", ") || "None"}
            {room.amenities?.length > 4 && ` +${room.amenities.length - 4} more`}
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
