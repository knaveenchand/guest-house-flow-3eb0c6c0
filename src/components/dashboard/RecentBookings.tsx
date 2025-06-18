
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Booking = {
  id: string;
  guestName: string;
  guestInitials: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  status: "confirmed" | "checked-in" | "checked-out" | "cancelled";
};

const bookings: Booking[] = [
  {
    id: "B1234",
    guestName: "Michael Johnson",
    guestInitials: "MJ",
    roomNumber: "101",
    checkIn: "2025-05-05",
    checkOut: "2025-05-08",
    status: "confirmed",
  },
  {
    id: "B1235",
    guestName: "Sarah Williams Venus",
    guestInitials: "SW",
    roomNumber: "203",
    checkIn: "2025-05-03",
    checkOut: "2025-05-10",
    status: "checked-in",
  },
  {
    id: "B1236",
    guestName: "Robert Brown",
    guestInitials: "RB",
    roomNumber: "305",
    checkIn: "2025-05-01",
    checkOut: "2025-05-02",
    status: "checked-out",
  },
  {
    id: "B1237",
    guestName: "Emily Davis",
    guestInitials: "ED",
    roomNumber: "402",
    checkIn: "2025-05-07",
    checkOut: "2025-05-12",
    status: "confirmed",
  },
];

const getStatusBadge = (status: Booking["status"]) => {
  switch (status) {
    case "confirmed":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">Confirmed</Badge>;
    case "checked-in":
      return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">Checked In</Badge>;
    case "checked-out":
      return <Badge variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300">Checked Out</Badge>;
    case "cancelled":
      return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-100 border-red-200">Cancelled</Badge>;
  }
};

export function RecentBookings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Guest</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {booking.guestInitials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{booking.guestName}</span>
                  </div>
                </TableCell>
                <TableCell>{booking.roomNumber}</TableCell>
                <TableCell>{booking.checkIn}</TableCell>
                <TableCell>{booking.checkOut}</TableCell>
                <TableCell>{getStatusBadge(booking.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
