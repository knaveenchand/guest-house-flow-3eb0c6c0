
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BedDouble, Plus, Wifi, DoorOpen, Settings } from "lucide-react";
import { Link } from "react-router-dom";

type RoomStatus = "available" | "occupied" | "reserved" | "maintenance";

type Room = {
  id: string;
  number: string;
  type: string;
  capacity: number;
  pricePerNight: number;
  status: RoomStatus;
  features: string[];
};

// Extended sample data to show more rooms (similar to having 34 rooms)
const rooms: Room[] = [
  {
    id: "1",
    number: "101",
    type: "Standard",
    capacity: 2,
    pricePerNight: 99,
    status: "available",
    features: ["Wi-Fi", "TV", "Bathroom"],
  },
  {
    id: "2",
    number: "102",
    type: "Standard",
    capacity: 2,
    pricePerNight: 99,
    status: "occupied",
    features: ["Wi-Fi", "TV", "Bathroom"],
  },
  {
    id: "3",
    number: "103",
    type: "Deluxe",
    capacity: 3,
    pricePerNight: 149,
    status: "reserved",
    features: ["Wi-Fi", "TV", "Bathroom", "Mini Bar"],
  },
  {
    id: "4",
    number: "201",
    type: "Suite",
    capacity: 4,
    pricePerNight: 249,
    status: "available",
    features: ["Wi-Fi", "TV", "Bathroom", "Mini Bar", "Living Room"],
  },
  {
    id: "5",
    number: "202",
    type: "Deluxe",
    capacity: 3,
    pricePerNight: 149,
    status: "maintenance",
    features: ["Wi-Fi", "TV", "Bathroom", "Mini Bar"],
  },
  {
    id: "6",
    number: "203",
    type: "Standard",
    capacity: 2,
    pricePerNight: 99,
    status: "occupied",
    features: ["Wi-Fi", "TV", "Bathroom"],
  },
  {
    id: "7",
    number: "301",
    type: "Suite",
    capacity: 4,
    pricePerNight: 249,
    status: "available",
    features: ["Wi-Fi", "TV", "Bathroom", "Mini Bar", "Living Room"],
  },
  {
    id: "8",
    number: "302",
    type: "Deluxe",
    capacity: 3,
    pricePerNight: 149,
    status: "occupied",
    features: ["Wi-Fi", "TV", "Bathroom", "Mini Bar"],
  },
  {
    id: "9",
    number: "303",
    type: "Standard",
    capacity: 2,
    pricePerNight: 99,
    status: "available",
    features: ["Wi-Fi", "TV", "Bathroom"],
  },
  {
    id: "10",
    number: "304",
    type: "Deluxe",
    capacity: 3,
    pricePerNight: 149,
    status: "reserved",
    features: ["Wi-Fi", "TV", "Bathroom", "Mini Bar"],
  },
  {
    id: "11",
    number: "401",
    type: "Suite",
    capacity: 4,
    pricePerNight: 249,
    status: "available",
    features: ["Wi-Fi", "TV", "Bathroom", "Mini Bar", "Living Room"],
  },
  {
    id: "12",
    number: "402",
    type: "Deluxe",
    capacity: 3,
    pricePerNight: 149,
    status: "maintenance",
    features: ["Wi-Fi", "TV", "Bathroom", "Mini Bar"],
  },
];

const getStatusBadge = (status: RoomStatus) => {
  switch (status) {
    case "available":
      return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">Available</Badge>;
    case "occupied":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">Occupied</Badge>;
    case "reserved":
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-yellow-200">Reserved</Badge>;
    case "maintenance":
      return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-100 border-red-200">Maintenance</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const RoomsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Rooms</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              Manage all rooms and their current status
              <span className="text-sm bg-yellow-950/40 text-yellow-400 px-2 py-1 rounded">
                Showing {rooms.length} of 34 rooms
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/rooms/setup">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Room Settings
              </Button>
            </Link>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Room
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {rooms.map((room) => (
            <Card key={room.id} className="overflow-hidden">
              <div className="bg-muted h-32 relative">
                <div className="absolute top-2 right-2">
                  {getStatusBadge(room.status)}
                </div>
                <div className="absolute bottom-2 left-2 bg-background/90 px-2 py-1 rounded text-sm font-medium">
                  Room {room.number}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">{room.type}</h3>
                  <p className="font-semibold">${room.pricePerNight}/night</p>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <BedDouble className="mr-1 h-4 w-4" />
                  <span>Capacity: {room.capacity} persons</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {room.features.map((feature) => (
                    <div key={feature} className="flex items-center text-xs bg-secondary px-2 py-1 rounded">
                      {feature === "Wi-Fi" && <Wifi className="mr-1 h-3 w-3" />}
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-4 pt-0 border-t">
                <Button variant="outline" size="sm">
                  <DoorOpen className="mr-2 h-4 w-4" />
                  View Details
                </Button>
                <Button size="sm">Book Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default RoomsPage;
