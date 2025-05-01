import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar, List, PlaneLanding, PlaneTakeoff, BedDouble, Bed, Clock, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Enum for booking status
type BookingStatus = "available" | "occupied" | "reserved" | "maintenance";

// Types for the calendar
type Room = {
  id: number;
  name: string;
};

type Booking = {
  id: string;
  roomId: number;
  guestName: string;
  startDay: number;
  endDay: number;
  status: BookingStatus;
  notes?: {
    airportPickup?: boolean;
    airportDropoff?: boolean;
    extraBed?: boolean;
    extraPillows?: boolean;
    lateCheckout?: boolean;
  };
};

// Sample data
const rooms: Room[] = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  name: `${i + 1}`
}));

const getRandomStatus = (): BookingStatus => {
  const statuses: BookingStatus[] = ["available", "occupied", "reserved", "maintenance"];
  return statuses[Math.floor(Math.random() * 3)]; // Exclude maintenance for most cells
};

const generateBookings = (): Booking[] => {
  const bookings: Booking[] = [];
  
  // Room 1 bookings
  bookings.push({
    id: "1-1",
    roomId: 1,
    guestName: "John Smith",
    startDay: 8,
    endDay: 14,
    status: "occupied",
    notes: { airportPickup: true }
  });
  
  // Room 2 bookings
  bookings.push({
    id: "2-1",
    roomId: 2,
    guestName: "Sarah Johnson",
    startDay: 5,
    endDay: 22,
    status: "occupied"
  });
  
  // Room 3 bookings
  bookings.push({
    id: "3-1",
    roomId: 3,
    guestName: "Mike Brown",
    startDay: 1,
    endDay: 6,
    status: "occupied",
    notes: { airportDropoff: true }
  });
  
  // Room 4 bookings
  bookings.push({
    id: "4-1",
    roomId: 4,
    guestName: "Lisa Wang",
    startDay: 15,
    endDay: 20,
    status: "reserved",
    notes: { extraBed: true }
  });

  // Room 6 bookings
  bookings.push({
    id: "6-1",
    roomId: 6,
    guestName: "Alex Morgan",
    startDay: 8,
    endDay: 12,
    status: "occupied"
  });
  bookings.push({
    id: "6-2",
    roomId: 6,
    guestName: "Thomas Hill",
    startDay: 15,
    endDay: 21,
    status: "occupied",
    notes: { lateCheckout: true }
  });
  
  // Room 7 bookings
  bookings.push({
    id: "7-1",
    roomId: 7,
    guestName: "Emma Davis",
    startDay: 15,
    endDay: 20,
    status: "occupied",
    notes: { extraPillows: true }
  });

  // Room 9 bookings
  bookings.push({
    id: "9-1",
    roomId: 9,
    guestName: "Carlos Rodriguez",
    startDay: 8,
    endDay: 13,
    status: "occupied"
  });
  bookings.push({
    id: "9-2",
    roomId: 9,
    guestName: "Maria Garcia",
    startDay: 16,
    endDay: 22,
    status: "occupied"
  });
  
  // Room 10 bookings
  bookings.push({
    id: "10-1",
    roomId: 10,
    guestName: "David Lee",
    startDay: 8,
    endDay: 13,
    status: "occupied"
  });
  bookings.push({
    id: "10-2",
    roomId: 10,
    guestName: "Anna Kim",
    startDay: 16,
    endDay: 22,
    status: "occupied"
  });
  
  // Room 12 bookings
  bookings.push({
    id: "12-1",
    roomId: 12,
    guestName: "Robert Wilson",
    startDay: 17,
    endDay: 21,
    status: "occupied"
  });
  
  return bookings;
};

const bookings = generateBookings();

// Generate days of the month
const days = Array.from({ length: 31 }, (_, i) => i + 1);

// Function to get status color
const getStatusColor = (status: BookingStatus): string => {
  switch (status) {
    case "available":
      return "bg-gray-700";
    case "occupied":
      return "bg-lime-500";
    case "reserved":
      return "bg-red-500";
    case "maintenance":
      return "bg-orange-400";
    default:
      return "bg-gray-700";
  }
};

// Function to get booking for a specific room and day
const getBookingForDay = (roomId: number, day: number): Booking | undefined => {
  return bookings.find(booking => 
    booking.roomId === roomId && 
    day >= booking.startDay && 
    day <= booking.endDay
  );
};

const BookingDetails = ({ booking }: { booking: Booking }) => {
  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="font-medium">Guest</h3>
        <p>{booking.guestName}</p>
      </div>
      
      <div className="flex gap-4">
        <div>
          <h3 className="font-medium">Check-in</h3>
          <p>Day {booking.startDay}, 2024</p>
        </div>
        <div>
          <h3 className="font-medium">Check-out</h3>
          <p>Day {booking.endDay}, 2024</p>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium">Status</h3>
        <Badge className={
          booking.status === "occupied" ? "bg-lime-500" :
          booking.status === "reserved" ? "bg-red-500" :
          booking.status === "maintenance" ? "bg-orange-400" : "bg-gray-700"
        }>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </Badge>
      </div>
      
      {booking.notes && (
        <div>
          <h3 className="font-medium">Special Requests</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {booking.notes.airportPickup && (
              <div className="flex items-center bg-blue-900/50 text-blue-400 px-2 py-1 rounded text-xs">
                <PlaneLanding className="h-3 w-3 mr-1" /> Airport pickup
              </div>
            )}
            {booking.notes.airportDropoff && (
              <div className="flex items-center bg-blue-900/50 text-blue-400 px-2 py-1 rounded text-xs">
                <PlaneTakeoff className="h-3 w-3 mr-1" /> Airport dropoff
              </div>
            )}
            {booking.notes.extraBed && (
              <div className="flex items-center bg-yellow-900/50 text-yellow-400 px-2 py-1 rounded text-xs">
                <Bed className="h-3 w-3 mr-1" /> Extra bed
              </div>
            )}
            {booking.notes.extraPillows && (
              <div className="flex items-center bg-yellow-900/50 text-yellow-400 px-2 py-1 rounded text-xs">
                <BedDouble className="h-3 w-3 mr-1" /> Extra pillows
              </div>
            )}
            {booking.notes.lateCheckout && (
              <div className="flex items-center bg-purple-900/50 text-purple-400 px-2 py-1 rounded text-xs">
                <Clock className="h-3 w-3 mr-1" /> Late checkout
              </div>
            )}
          </div>
        </div>
      )}
      
      <DialogFooter>
        <Button variant="outline" className="border-gray-700">Invoice</Button>
        <Button>Modify Booking</Button>
      </DialogFooter>
    </div>
  );
};

const RoomsCalendarPage = () => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  return (
    <Layout>
      <div className="bg-black text-white min-h-screen">
        {/* Room Module Navigation */}
        <div className="flex bg-gray-900 p-2 mb-6 space-x-4">
          <Link to="/rooms/calendar" className="flex items-center justify-center bg-yellow-700 p-2 rounded">
            <Calendar className="h-6 w-6 text-yellow-400" />
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

        <div className="overflow-x-auto pb-4">
          <div className="min-w-[1400px]">
            {/* Days header */}
            <div className="grid grid-cols-[80px_repeat(31,_minmax(30px,_1fr))] bg-gray-900">
              <div className="flex items-center justify-center font-bold p-2 border-r border-b border-gray-800">
                Room
              </div>
              {days.map(day => (
                <div key={day} className="flex items-center justify-center p-2 border-r border-b border-gray-800 text-sm">
                  {day}
                </div>
              ))}
            </div>

            {/* Room rows */}
            {rooms.map(room => (
              <div key={room.id} className="grid grid-cols-[80px_repeat(31,_minmax(30px,_1fr))]">
                <div className="flex items-center justify-center p-2 border-r border-b border-gray-800 bg-gray-900">
                  {room.name}
                </div>

                {/* Days cells */}
                {days.map(day => {
                  const booking = getBookingForDay(room.id, day);
                  const cellColor = booking ? getStatusColor(booking.status) : "bg-gray-700";

                  return (
                    <Dialog key={day}>
                      <DialogTrigger asChild>
                        <div 
                          className={`${cellColor} border-r border-b border-gray-800 cursor-pointer flex items-center justify-center relative`}
                          onClick={() => setSelectedBooking(booking || null)}
                        >
                          {booking && booking.notes && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              {booking.notes.airportPickup && <PlaneLanding className="h-3 w-3 text-white absolute top-1 left-1" />}
                              {booking.notes.airportDropoff && <PlaneTakeoff className="h-3 w-3 text-white absolute top-1 left-1" />}
                              {booking.notes.extraBed && <Bed className="h-3 w-3 text-white absolute top-1 right-1" />}
                              {booking.notes.extraPillows && <BedDouble className="h-3 w-3 text-white absolute bottom-1 left-1" />}
                              {booking.notes.lateCheckout && <Clock className="h-3 w-3 text-white absolute bottom-1 right-1" />}
                            </div>
                          )}
                        </div>
                      </DialogTrigger>
                      {booking && (
                        <DialogContent className="bg-gray-900 text-white border-gray-800">
                          <DialogHeader>
                            <DialogTitle className="text-xl">
                              Room {room.name} - Booking Details
                            </DialogTitle>
                            <DialogDescription className="text-gray-400">
                              View and manage booking information.
                            </DialogDescription>
                          </DialogHeader>
                          <BookingDetails booking={booking} />
                        </DialogContent>
                      )}
                    </Dialog>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-lime-500"></div>
            <span className="text-sm">Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500"></div>
            <span className="text-sm">Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-400"></div>
            <span className="text-sm">Maintenance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-700"></div>
            <span className="text-sm">Available</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RoomsCalendarPage;
