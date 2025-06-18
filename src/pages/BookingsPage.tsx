
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BedDouble,
  CalendarRange,
  CheckCircle2,
  Clock,
  Filter,
  Plus,
  XCircle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type BookingStatus = "confirmed" | "checked-in" | "checked-out" | "cancelled";

type Booking = {
  id: string;
  guestName: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  status: BookingStatus;
};

const bookings: Booking[] = [
  {
    id: "B1234",
    guestName: "Michael Johnson",
    roomNumber: "101",
    checkIn: "2025-05-05",
    checkOut: "2025-05-08",
    totalAmount: 297,
    status: "confirmed",
  },
  {
    id: "B1235",
    guestName: "Sarah Williams Venus",
    roomNumber: "203",
    checkIn: "2025-05-03",
    checkOut: "2025-05-10",
    totalAmount: 1043,
    status: "checked-in",
  },
  {
    id: "B1236",
    guestName: "Robert Brown",
    roomNumber: "305",
    checkIn: "2025-05-01",
    checkOut: "2025-05-02",
    totalAmount: 249,
    status: "checked-out",
  },
  {
    id: "B1237",
    guestName: "Emily Davis",
    roomNumber: "402",
    checkIn: "2025-05-07",
    checkOut: "2025-05-12",
    totalAmount: 745,
    status: "confirmed",
  },
  {
    id: "B1238",
    guestName: "David Wilson",
    roomNumber: "201",
    checkIn: "2025-05-02",
    checkOut: "2025-05-06",
    totalAmount: 596,
    status: "cancelled",
  },
];

const getStatusBadge = (status: BookingStatus) => {
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

const BookingsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
            <p className="text-muted-foreground">
              Manage all reservations and check-ins
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Booking
          </Button>
        </div>

        <Tabs defaultValue="list">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>
          <TabsContent value="list" className="space-y-4">
            <div className="flex justify-end">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Guest</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Check In</TableHead>
                      <TableHead>Check Out</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>{booking.guestName}</TableCell>
                        <TableCell>{booking.roomNumber}</TableCell>
                        <TableCell>{booking.checkIn}</TableCell>
                        <TableCell>{booking.checkOut}</TableCell>
                        <TableCell>${booking.totalAmount}</TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="icon" className="h-7 w-7">
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-7 w-7">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarRange className="mr-2 h-5 w-5" />
                  Booking Calendar
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center pb-6">
                <Calendar mode="range" className="rounded-md border" />
              </CardContent>
              <CardFooter className="border-t p-4 bg-muted/50">
                <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm text-muted-foreground">Confirmed</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-muted-foreground">Checked In</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                    <span className="text-sm text-muted-foreground">Checked Out</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-sm text-muted-foreground">Cancelled</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default BookingsPage;
