
import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { RoomOccupancyChart } from "@/components/dashboard/RoomOccupancyChart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { 
  PieChart, 
  Pie, 
  Cell, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import { 
  BedDouble, 
  CalendarDays, 
  Plane, 
  Clock, 
  Users, 
  ArrowDown,
  Timer,
  CheckSquare,
  User
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Weekly occupancy data for pie charts
const weeklyOccupancy = [
  {
    day: "Monday",
    data: [
      { name: "Occupied", value: 18, color: "#1E40AF" },
      { name: "Available", value: 7, color: "#60A5FA" },
      { name: "Maintenance", value: 2, color: "#E5E7EB" },
      { name: "Reserved", value: 3, color: "#F59E0B" },
    ]
  },
  {
    day: "Tuesday",
    data: [
      { name: "Occupied", value: 20, color: "#1E40AF" },
      { name: "Available", value: 5, color: "#60A5FA" },
      { name: "Maintenance", value: 2, color: "#E5E7EB" },
      { name: "Reserved", value: 3, color: "#F59E0B" },
    ]
  },
  {
    day: "Wednesday",
    data: [
      { name: "Occupied", value: 22, color: "#1E40AF" },
      { name: "Available", value: 3, color: "#60A5FA" },
      { name: "Maintenance", value: 1, color: "#E5E7EB" },
      { name: "Reserved", value: 4, color: "#F59E0B" },
    ]
  },
  {
    day: "Thursday",
    data: [
      { name: "Occupied", value: 21, color: "#1E40AF" },
      { name: "Available", value: 4, color: "#60A5FA" },
      { name: "Maintenance", value: 1, color: "#E5E7EB" },
      { name: "Reserved", value: 4, color: "#F59E0B" },
    ]
  },
  {
    day: "Friday",
    data: [
      { name: "Occupied", value: 24, color: "#1E40AF" },
      { name: "Available", value: 2, color: "#60A5FA" },
      { name: "Maintenance", value: 1, color: "#E5E7EB" },
      { name: "Reserved", value: 3, color: "#F59E0B" },
    ]
  },
  {
    day: "Saturday",
    data: [
      { name: "Occupied", value: 25, color: "#1E40AF" },
      { name: "Available", value: 2, color: "#60A5FA" },
      { name: "Maintenance", value: 0, color: "#E5E7EB" },
      { name: "Reserved", value: 3, color: "#F59E0B" },
    ]
  },
  {
    day: "Sunday",
    data: [
      { name: "Occupied", value: 22, color: "#1E40AF" },
      { name: "Available", value: 5, color: "#60A5FA" },
      { name: "Maintenance", value: 0, color: "#E5E7EB" },
      { name: "Reserved", value: 3, color: "#F59E0B" },
    ]
  },
];

// Check-in/out data for the week
const checkInOutData = [
  { name: "Monday", checkIns: 8, checkOuts: 5 },
  { name: "Tuesday", checkIns: 6, checkOuts: 4 },
  { name: "Wednesday", checkIns: 9, checkOuts: 7 },
  { name: "Thursday", checkIns: 5, checkOuts: 6 },
  { name: "Friday", checkIns: 10, checkOuts: 7 },
  { name: "Saturday", checkIns: 12, checkOuts: 10 },
  { name: "Sunday", checkIns: 7, checkOuts: 9 },
];

// Airport pickup data
const airportPickups = [
  { name: "Monday", pickups: 3 },
  { name: "Tuesday", pickups: 2 },
  { name: "Wednesday", pickups: 4 },
  { name: "Thursday", pickups: 1 },
  { name: "Friday", pickups: 6 },
  { name: "Saturday", pickups: 8 },
  { name: "Sunday", pickups: 3 },
];

// Next airport pickup
const nextPickup = {
  guestName: "John Smith",
  flightNumber: "BA205",
  arrivalTime: new Date(2025, 4, 3, 14, 30), // May 3rd, 2025, 2:30 PM
  room: "204"
};

// Rooms to be cleaned
const roomsToClean = [
  { id: 1, room: "101", type: "Standard", status: "checkout", assignedTo: "Maria Lopez" },
  { id: 2, room: "205", type: "Deluxe", status: "occupied", assignedTo: "Carlos Rodriguez" },
  { id: 3, room: "302", type: "Suite", status: "checkout", assignedTo: "Anna Johnson" },
  { id: 4, room: "104", type: "Standard", status: "occupied", assignedTo: "Maria Lopez" },
  { id: 5, room: "210", type: "Deluxe", status: "checkout", assignedTo: "Carlos Rodriguez" },
  { id: 6, room: "307", type: "Suite", status: "maintenance", assignedTo: "Juan Perez" },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const RoomsPage = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = nextPickup.arrivalTime.getTime() - now.getTime();
      
      if (difference <= 0) {
        setTimeRemaining({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      setTimeRemaining({ hours, minutes, seconds });
    };
    
    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Get the current day index (0 = Sunday, 1 = Monday, etc.)
  const today = new Date().getDay();
  // Convert to our array index (0 = Monday in our data)
  const todayIndex = today === 0 ? 6 : today - 1;
  
  // Data for today's stats
  const todayCheckIns = checkInOutData[todayIndex]?.checkIns || 0;
  const todayCheckOuts = checkInOutData[todayIndex]?.checkOuts || 0;
  const todayPickups = airportPickups[todayIndex]?.pickups || 0;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Rooms Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of room occupancy, arrivals, and housekeeping
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
                <Link to="/rooms/calendar">View Calendar</Link>
            </Button>
          </div>
        </div>

        {/* Today's Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard 
            title="Today's Check-ins" 
            value={todayCheckIns} 
            icon={ArrowDown} 
            className="bg-blue-50 dark:bg-blue-950"
          />
          <StatCard 
            title="Today's Check-outs" 
            value={todayCheckOuts} 
            icon={CalendarDays}
            className="bg-amber-50 dark:bg-amber-950"
          />
          <StatCard 
            title="Today's Airport Pickups" 
            value={todayPickups} 
            icon={Plane}
            className="bg-green-50 dark:bg-green-950"
          />
        </div>

        {/* Weekly Occupancy Charts */}
        <h2 className="text-2xl font-semibold mt-6 mb-2">Weekly Room Occupancy</h2>
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {weeklyOccupancy.map((day, index) => (
            <Card key={day.day} className={index === todayIndex ? "border-blue-500" : ""}>
              <CardHeader className="py-3">
                <CardTitle className="text-md font-medium text-center">
                  {day.day}
                  {index === todayIndex && <span className="ml-2 text-xs text-blue-500">(Today)</span>}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-4">
                <div className="h-28">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={day.data}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={40}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {day.data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend 
                        layout="horizontal" 
                        align="center" 
                        verticalAlign="bottom"
                        iconSize={8}
                        iconType="circle"
                        formatter={(value) => <span className="text-xs">{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Check-ins and Check-outs Graph */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                <span>Weekly Check-ins & Check-outs</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={checkInOutData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="checkIns" name="Check-ins" fill="#1E40AF" barSize={20} />
                    <Bar dataKey="checkOuts" name="Check-outs" fill="#F59E0B" barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plane className="mr-2 h-5 w-5" />
                <span>Airport Pickups</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={airportPickups}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pickups" name="Airport Pickups" fill="#10B981" barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Next Pickup Countdown */}
        <div className="grid grid-cols-1 gap-6 mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Timer className="mr-2 h-5 w-5" />
                <span>Next Airport Pickup</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">{nextPickup.guestName}</span>
                  </div>
                  <div className="flex items-center">
                    <Plane className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Flight {nextPickup.flightNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Arrival: {nextPickup.arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="flex items-center">
                    <BedDouble className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Room {nextPickup.room}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center md:justify-end">
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center flex items-center gap-4">
                    <div className="space-y-1">
                      <div className="text-3xl font-bold">{String(timeRemaining.hours).padStart(2, '0')}</div>
                      <div className="text-xs text-gray-500">Hours</div>
                    </div>
                    <div className="text-3xl font-bold">:</div>
                    <div className="space-y-1">
                      <div className="text-3xl font-bold">{String(timeRemaining.minutes).padStart(2, '0')}</div>
                      <div className="text-xs text-gray-500">Minutes</div>
                    </div>
                    <div className="text-3xl font-bold">:</div>
                    <div className="space-y-1">
                      <div className="text-3xl font-bold">{String(timeRemaining.seconds).padStart(2, '0')}</div>
                      <div className="text-xs text-gray-500">Seconds</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Rooms To Be Cleaned */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckSquare className="mr-2 h-5 w-5" />
                <span>Rooms To Be Cleaned</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Room</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roomsToClean.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell className="font-medium">{room.room}</TableCell>
                      <TableCell>{room.type}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            room.status === "checkout" ? "bg-amber-100 text-amber-800 hover:bg-amber-200 border-0" : 
                            room.status === "occupied" ? "bg-blue-100 text-blue-800 hover:bg-blue-200 border-0" : 
                            "bg-red-100 text-red-800 hover:bg-red-200 border-0"
                          }
                        >
                          {room.status === "checkout" ? "Check-out" : 
                           room.status === "occupied" ? "Occupied" : "Maintenance"}
                        </Badge>
                      </TableCell>
                      <TableCell>{room.assignedTo}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">Mark as Clean</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default RoomsPage;
