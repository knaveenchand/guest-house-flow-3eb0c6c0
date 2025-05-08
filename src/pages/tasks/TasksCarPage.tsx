
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Car, MapPin, Calendar, Clock, User, Phone, 
  ShoppingBag, CheckCircle, AlertCircle, PlaneLanding, 
  PlaneTakeoff, Plus, Filter, DollarSign
} from "lucide-react";
import { CarTask } from "@/types/posTypes";
import { CreateTaskDialog } from "@/components/tasks/CreateTaskDialog";
import { TaskFilterDropdown } from "@/components/tasks/TaskFilterDropdown";
import { CarTaskCard } from "@/components/tasks/CarTaskCard";

const TasksCarPage = () => {
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  const carTasks: CarTask[] = [
    { 
      id: 1, 
      title: "Airport pickup", 
      location: "Airport Terminal 2", 
      type: "car", 
      priority: "high", 
      status: "pending", 
      assignedTo: "David K.", 
      createdAt: "2025-05-08T06:00:00Z", 
      dueAt: "2025-05-08T16:30:00Z",
      requestType: "airport-pickup",
      guestName: "James Wilson",
      contactInfo: "+1-555-0123",
      flightDetails: "AA1234",
      pickupLocation: "Airport Terminal 2",
      dropoffLocation: "Hotel Esplanada"
    },
    { 
      id: 2, 
      title: "Minibar restock shopping", 
      location: "Local market", 
      type: "car", 
      priority: "low", 
      status: "pending", 
      assignedTo: "John D.", 
      createdAt: "2025-05-08T09:30:00Z", 
      dueAt: "2025-05-08T16:30:00Z",
      requestType: "shopping",
      pickupLocation: "Local market",
      dropoffLocation: "Hotel Esplanada",
      items: ["Water bottles", "Snacks", "Wine", "Soft drinks"],
      budget: 250,
      vehicleAssigned: "Van 2"
    },
    { 
      id: 3, 
      title: "Guest airport dropoff", 
      location: "Hotel Esplanada", 
      type: "car", 
      priority: "high", 
      status: "pending", 
      assignedTo: "David K.", 
      createdAt: "2025-05-08T07:00:00Z", 
      dueAt: "2025-05-08T18:00:00Z",
      requestType: "airport-dropoff",
      guestName: "Sarah Johnson",
      contactInfo: "+1-555-4567",
      flightDetails: "DL789",
      pickupLocation: "Hotel Esplanada",
      dropoffLocation: "Airport Terminal 1"
    },
    { 
      id: 4, 
      title: "Kitchen supplies errand", 
      location: "Restaurant supply store", 
      type: "car", 
      priority: "medium", 
      status: "in-progress", 
      assignedTo: "John D.", 
      createdAt: "2025-05-08T08:15:00Z", 
      dueAt: "2025-05-08T14:00:00Z",
      requestType: "errand",
      pickupLocation: "Restaurant supply store",
      dropoffLocation: "Hotel Esplanada",
      items: ["Cooking oil", "Spices", "Cleaning supplies"],
      budget: 350,
      vehicleAssigned: "Truck"
    },
    { 
      id: 5, 
      title: "VIP guest pickup", 
      location: "Private airfield", 
      type: "car", 
      priority: "high", 
      status: "pending", 
      assignedTo: "David K.", 
      createdAt: "2025-05-08T10:00:00Z", 
      dueAt: "2025-05-09T11:30:00Z",
      requestType: "airport-pickup",
      guestName: "Robert Smith - VIP",
      contactInfo: "+1-555-7890",
      flightDetails: "Private jet - N628TS",
      pickupLocation: "Private airfield",
      dropoffLocation: "Hotel Esplanada",
      isVIP: true
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Car Tasks</h1>
            <p className="text-muted-foreground">
              Manage airport transfers, shopping trips, and errands
            </p>
          </div>
          <div className="flex items-center gap-2">
            <TaskFilterDropdown activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
            <Button onClick={() => setShowCreateTask(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>
          </div>
        </div>

        <Tabs defaultValue="transport">
          <TabsList>
            <TabsTrigger value="transport">Airport Transfers</TabsTrigger>
            <TabsTrigger value="shopping">Shopping & Errands</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="logbook">Logbook</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transport" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              {carTasks
                .filter(task => task.requestType === "airport-pickup" || task.requestType === "airport-dropoff")
                .map((task) => (
                  <CarTaskCard key={task.id} task={task} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="shopping" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              {carTasks
                .filter(task => task.requestType === "shopping" || task.requestType === "errand")
                .map((task) => (
                  <CarTaskCard key={task.id} task={task} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="schedule" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center h-40 space-y-3">
                  <Calendar className="h-10 w-10 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Driver Schedule View</h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    View and manage the daily schedule for all drivers, including pickup times and locations.
                  </p>
                  <Button>Open Calendar View</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="logbook" className="mt-4">
            <Card className="mb-4">
              <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
                <h3 className="text-lg font-medium">Driver Trip Logbook</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Track driver activity, vehicle usage, mileage, and fuel consumption.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline">View All Logs</Button>
                  <Button>Add New Log Entry</Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Recent Completed Trips</h3>
              <div className="space-y-4">
                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white">
                          <Car className="h-5 w-5" />
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">Airport Pickup - Michael Brown</h3>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">Completed</Badge>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1 text-sm text-muted-foreground">
                            <span>May 7, 2025</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              3:15 PM - 4:45 PM
                            </span>
                            <span>By: David K.</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right text-sm">
                        <div>Distance: 34 miles</div>
                        <div>Fuel: 2.1 gallons</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white">
                          <ShoppingBag className="h-5 w-5" />
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">Weekly Grocery Run</h3>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">Completed</Badge>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1 text-sm text-muted-foreground">
                            <span>May 7, 2025</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              10:00 AM - 12:30 PM
                            </span>
                            <span>By: John D.</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right text-sm">
                        <div>Distance: 12 miles</div>
                        <div>Budget: $450</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <CreateTaskDialog open={showCreateTask} onOpenChange={setShowCreateTask} />
    </Layout>
  );
};

export default TasksCarPage;
