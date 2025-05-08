
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ClipboardList, Check, CalendarDays, Filter, Plus, 
  CheckCircle, XCircle, AlertTriangle, Clock
} from "lucide-react";
import { useState } from "react";
import { HousekeepingTaskCard } from "@/components/tasks/HousekeepingTaskCard";
import { MaintenanceTaskCard } from "@/components/tasks/MaintenanceTaskCard";
import { CarTaskCard } from "@/components/tasks/CarTaskCard";
import { TaskFilterDropdown } from "@/components/tasks/TaskFilterDropdown";
import { CreateTaskDialog } from "@/components/tasks/CreateTaskDialog";
import { HousekeepingTask, MaintenanceTask, CarTask } from "@/types/posTypes";

const TasksPage = () => {
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const housekeepingTasks: HousekeepingTask[] = [
    { 
      id: 1, 
      title: "Room cleaning", 
      location: "Room 101", 
      roomNumber: "101",
      type: "housekeeping", 
      priority: "high", 
      status: "pending", 
      assignedTo: "Maria G.", 
      createdAt: "2025-05-08T08:00:00Z", 
      dueAt: "2025-05-08T12:00:00Z",
      checkoutTime: "11:00 AM",
      checkInTime: "3:00 PM",
      cleaningStatus: "not-started",
      isUrgent: true
    },
    { 
      id: 2, 
      title: "Towel replacement", 
      location: "Room 203", 
      roomNumber: "203",
      type: "housekeeping", 
      priority: "medium", 
      status: "in-progress", 
      assignedTo: "John D.", 
      createdAt: "2025-05-08T08:30:00Z", 
      dueAt: "2025-05-08T14:00:00Z",
      cleaningStatus: "in-progress"
    },
    { 
      id: 4, 
      title: "Room cleaning", 
      location: "Room 102", 
      roomNumber: "102",
      type: "housekeeping", 
      priority: "medium", 
      status: "pending", 
      assignedTo: "Maria G.", 
      createdAt: "2025-05-08T09:00:00Z", 
      dueAt: "2025-05-08T15:00:00Z",
      checkoutTime: "12:00 PM",
      cleaningStatus: "not-started"
    },
  ];

  const maintenanceTasks: MaintenanceTask[] = [
    { 
      id: 3, 
      title: "Fix AC", 
      description: "AC not cooling properly",
      location: "Room 305", 
      type: "maintenance", 
      priority: "high", 
      status: "in-progress", 
      assignedTo: "Robert M.", 
      createdAt: "2025-05-08T07:45:00Z", 
      dueAt: "2025-05-08T11:00:00Z",
      issueType: "appliance",
      hazardLevel: "medium",
      toolsRequired: ["Screwdriver", "Multimeter", "Cleaning solution"]
    },
    { 
      id: 6, 
      title: "Leaking faucet", 
      location: "Room 202", 
      type: "maintenance", 
      priority: "low", 
      status: "pending", 
      assignedTo: "Robert M.", 
      createdAt: "2025-05-08T10:00:00Z", 
      dueAt: "2025-05-09T10:00:00Z",
      issueType: "plumbing",
      hazardLevel: "low",
      toolsRequired: ["Wrench", "Plumber's tape"]
    }
  ];

  const carTasks: CarTask[] = [
    { 
      id: 7, 
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
      id: 5, 
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
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground">
              Manage housekeeping, maintenance, and car tasks
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

        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="housekeeping">Housekeeping</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="car">Car</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              <h2 className="text-lg font-semibold">Housekeeping Tasks</h2>
              {housekeepingTasks.map((task) => (
                <HousekeepingTaskCard key={task.id} task={task} />
              ))}
              
              <h2 className="text-lg font-semibold mt-6">Maintenance Tasks</h2>
              {maintenanceTasks.map((task) => (
                <MaintenanceTaskCard key={task.id} task={task} />
              ))}
              
              <h2 className="text-lg font-semibold mt-6">Car Tasks</h2>
              {carTasks.map((task) => (
                <CarTaskCard key={task.id} task={task} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="housekeeping" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              {housekeepingTasks.map((task) => (
                <HousekeepingTaskCard key={task.id} task={task} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="maintenance" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              {maintenanceTasks.map((task) => (
                <MaintenanceTaskCard key={task.id} task={task} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="car" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              {carTasks.map((task) => (
                <CarTaskCard key={task.id} task={task} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <CreateTaskDialog open={showCreateTask} onOpenChange={setShowCreateTask} />
    </Layout>
  );
};

export default TasksPage;
