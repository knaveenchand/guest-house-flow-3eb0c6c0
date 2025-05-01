
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BedDouble, Wifi, Tv, DoorOpen, Plus, Calendar, List, Settings } from "lucide-react";
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

// Extended sample data to show more rooms
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
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-0">Available</Badge>;
    case "occupied":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-0">Occupied</Badge>;
    case "reserved":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-0">Reserved</Badge>;
    case "maintenance":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-0">Maintenance</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const RoomsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Room Module Navigation */}
        <div className="flex bg-gray-900 p-2 mb-6 space-x-4">
          <Link to="/rooms/calendar" className="flex items-center justify-center bg-gray-800 p-2 rounded">
            <Calendar className="h-6 w-6 text-gray-400" />
          </Link>
          <Link to="/rooms/list" className="flex items-center justify-center bg-gray-800 p-2 rounded">
            <List className="h-6 w-6 text-gray-400" />
          </Link>
          <Link to="/rooms/add" className="flex items-center justify-center bg-gray-800 p-2 rounded">
            <Plus className="h-6 w-6 text-gray-400" />
          </Link>
          <Link to="/rooms/setup" className="flex items-center justify-center bg-gray-800 ml-auto p-2 rounded">
            <Settings className="h-6 w-6 text-gray-400" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <div 
              key={room.id} 
              className="bg-white rounded-lg overflow-hidden shadow-sm border"
            >
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-lg font-semibold mr-3">Room {room.number}</span>
                    {getStatusBadge(room.status)}
                  </div>
                  <span className="font-bold">${room.pricePerNight}/night</span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg">{room.type}</h3>
                
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <BedDouble className="mr-1 h-4 w-4" />
                  <span>Capacity: {room.capacity} persons</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {room.features.map((feature) => (
                    <div key={feature} className="flex items-center text-xs px-2 py-1 bg-gray-100 rounded-full">
                      {feature === "Wi-Fi" && <Wifi className="mr-1 h-3 w-3" />}
                      {feature === "TV" && <Tv className="mr-1 h-3 w-3" />}
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex border-t p-3">
                <Button variant="outline" size="sm" className="flex-1 mr-2">
                  <DoorOpen className="mr-2 h-4 w-4" />
                  View Details
                </Button>
                <Button size="sm" className="flex-1">Book Now</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default RoomsPage;
