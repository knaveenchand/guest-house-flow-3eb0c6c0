import { Calendar, List, PlaneLanding, PlaneTakeoff, Plus, Settings } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Reservation = {
  id: string;
  guest: string;
  room: string;
  checkIn: string;
  checkOut: string;
  payment: string;
  source: string;
  status: string;
  notes?: {
    airportPickup?: boolean;
    airportDropoff?: boolean;
    extraBed?: boolean;
    extraPillows?: boolean;
    lateCheckout?: boolean;
  };
};

// Sample data
const reservations: Reservation[] = [
  {
    id: "1",
    guest: "John Doe",
    room: "Room 1",
    checkIn: "15/04/2023",
    checkOut: "20/04/2023",
    payment: "cash",
    source: "Direct",
    status: "Confirmed",
    notes: {
      airportPickup: true
    }
  },
  {
    id: "2",
    guest: "xxxxxx",
    room: "Room 2",
    checkIn: "21/04/2025",
    checkOut: "22/04/2025",
    payment: "cash",
    source: "Direct",
    status: "Confirmed",
    notes: {
      airportDropoff: true
    }
  },
  {
    id: "3",
    guest: "15",
    room: "Room 2",
    checkIn: "13/04/2025",
    checkOut: "14/04/2025",
    payment: "card",
    source: "Direct",
    status: "Confirmed"
  },
  {
    id: "4",
    guest: "terweds",
    room: "Room 4",
    checkIn: "15/04/2025",
    checkOut: "24/04/2025",
    payment: "card",
    source: "Direct",
    status: "Confirmed",
    notes: {
      lateCheckout: true
    }
  }
];

const RoomsListPage = () => {
  return (
    <Layout>
      <div className="bg-black text-white min-h-screen">
        {/* Room Module Navigation */}
        <div className="flex bg-gray-900 p-2 mb-6 space-x-4">
          <Link to="/rooms/calendar" className="flex items-center justify-center bg-gray-800 p-2 rounded">
            <Calendar className="h-6 w-6 text-gray-400" />
          </Link>
          <Link to="/rooms/list" className="flex items-center justify-center bg-yellow-700 p-2 rounded">
            <List className="h-6 w-6 text-yellow-400" />
          </Link>
          <Link to="/rooms/add" className="flex items-center justify-center bg-gray-800 p-2 rounded">
            <Plus className="h-6 w-6 text-gray-400" />
          </Link>
          <Link to="/rooms/setup" className="flex items-center justify-center bg-gray-800 ml-auto p-2 rounded">
            <Settings className="h-6 w-6 text-gray-400" />
          </Link>
        </div>

        <div className="bg-gray-900 rounded-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-800">
              <TableRow>
                <TableHead className="text-white">GUEST</TableHead>
                <TableHead className="text-white">ROOM</TableHead>
                <TableHead className="text-white">CHECK-IN</TableHead>
                <TableHead className="text-white">CHECK-OUT</TableHead>
                <TableHead className="text-white">PAYMENT</TableHead>
                <TableHead className="text-white">SOURCE</TableHead>
                <TableHead className="text-white text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.id} className="border-t border-gray-800 hover:bg-gray-800/50">
                  <TableCell className="font-medium flex items-center gap-2">
                    {reservation.guest}
                    {reservation.notes?.airportPickup && (
                      <PlaneLanding className="h-4 w-4 text-blue-400" />
                    )}
                    {reservation.notes?.airportDropoff && (
                      <PlaneTakeoff className="h-4 w-4 text-blue-400" />
                    )}
                  </TableCell>
                  <TableCell>{reservation.room}</TableCell>
                  <TableCell>{reservation.checkIn}</TableCell>
                  <TableCell>{reservation.checkOut}</TableCell>
                  <TableCell>{reservation.payment}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-800 hover:bg-green-700">Direct</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="border-gray-700 bg-gray-800">
                      Registration
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default RoomsListPage;
