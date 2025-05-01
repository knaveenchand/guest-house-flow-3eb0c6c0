
import { BedDouble, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  return (
    <Card key={room.name}>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BedDouble className={`h-5 w-5 text-${room.color}-500`} />
            <h3 className="font-medium">{room.name}</h3>
          </div>
          <Badge className={`bg-${room.color}-500`}>{room.totalRooms} rooms</Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{room.description}</p>
        
        {/* Room details */}
        <div className="mt-3">
          <div className="text-xs text-muted-foreground mt-1">
            <strong>Room numbers:</strong> {room.roomNumbers.slice(0, 5).join(", ")}
            {room.roomNumbers.length > 5 && ` +${room.roomNumbers.length - 5} more`}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            <strong>Amenities:</strong> {room.amenities.slice(0, 4).join(", ")}
            {room.amenities.length > 4 && ` +${room.amenities.length - 4} more`}
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
