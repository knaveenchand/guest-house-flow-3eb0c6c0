
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Check, Clock, UserCheck, Flag, Plus, CheckCircle,
  AlertCircle, Search, Filter
} from "lucide-react";
import { CreateTaskDialog } from "@/components/tasks/CreateTaskDialog";
import { TaskFilterDropdown } from "@/components/tasks/TaskFilterDropdown";
import { HousekeepingTask } from "@/types/posTypes";

const TasksHousekeepingPage = () => {
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [showGridView, setShowGridView] = useState(true);
  
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
      id: 3,
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
    { 
      id: 4, 
      title: "Bed linens", 
      location: "Room 304", 
      roomNumber: "304",
      type: "housekeeping", 
      priority: "low", 
      status: "completed", 
      assignedTo: "John D.", 
      createdAt: "2025-05-08T07:30:00Z", 
      dueAt: "2025-05-08T11:30:00Z",
      completedAt: "2025-05-08T11:15:00Z",
      cleaningStatus: "cleaned"
    },
    { 
      id: 5, 
      title: "Room cleaning", 
      location: "Room 401", 
      roomNumber: "401",
      type: "housekeeping", 
      priority: "high", 
      status: "needs-attention", 
      assignedTo: "Maria G.", 
      createdAt: "2025-05-08T07:00:00Z", 
      dueAt: "2025-05-08T13:00:00Z",
      checkInTime: "2:00 PM",
      cleaningStatus: "needs-attention",
      notes: "Stain on carpet needs special treatment",
      isVIP: true
    },
    { 
      id: 6, 
      title: "Suite cleaning", 
      location: "Room 501", 
      roomNumber: "501",
      type: "housekeeping", 
      priority: "high", 
      status: "pending", 
      assignedTo: "John D.", 
      createdAt: "2025-05-08T08:15:00Z", 
      dueAt: "2025-05-08T14:30:00Z",
      checkInTime: "4:00 PM",
      cleaningStatus: "not-started",
      isVIP: true
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "in-progress": return "bg-blue-500";
      case "completed": return "bg-green-500";
      case "needs-attention": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending": return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500">Pending</Badge>;
      case "in-progress": return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500">In Progress</Badge>;
      case "completed": return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">Completed</Badge>;
      case "needs-attention": return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500">Needs Attention</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Housekeeping Tasks</h1>
            <p className="text-muted-foreground">
              Manage room cleaning and housekeeping activities
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setShowGridView(!showGridView)} 
              className={!showGridView ? "bg-muted" : ""}
            >
              <Search className="h-4 w-4" />
            </Button>
            <TaskFilterDropdown activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
            <Button onClick={() => setShowCreateTask(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>
          </div>
        </div>

        <Tabs defaultValue="today">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="mt-4">
            {showGridView ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {housekeepingTasks
                  .filter(task => task.status !== "completed")
                  .map((task) => (
                    <Card key={task.id} className={`overflow-hidden ${task.isVIP ? 'border-amber-500' : ''}`}>
                      <div className="h-2 w-full" style={{ backgroundColor: getPriorityColor(task.priority) }}></div>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-bold">Room {task.roomNumber}</span>
                              {task.isUrgent && <Badge variant="destructive">Urgent</Badge>}
                              {task.isVIP && <Badge className="bg-amber-500">VIP</Badge>}
                            </div>
                            <h3 className="text-lg font-medium mt-1">{task.title}</h3>
                            
                            <div className="flex items-center gap-2 mt-2">
                              {getStatusBadge(task.status)}
                              <div className="text-sm text-muted-foreground">
                                Due by {new Date(task.dueAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                            
                            <div className="mt-4 flex items-center gap-1">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>{getInitials(task.assignedTo || "")}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{task.assignedTo}</span>
                            </div>
                          </div>
                          
                          <div>
                            {task.status !== "completed" ? (
                              <Button variant="outline" size="icon" className="rounded-full">
                                {task.status === "pending" ? (
                                  <UserCheck className="h-4 w-4" />
                                ) : task.status === "in-progress" ? (
                                  <Check className="h-4 w-4" />
                                ) : (
                                  <Flag className="h-4 w-4" />
                                )}
                              </Button>
                            ) : (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                          </div>
                        </div>
                        
                        {task.checkInTime && (
                          <div className="mt-3 text-sm">
                            <span className="text-muted-foreground">Next check-in: </span>
                            <span className="font-medium">{task.checkInTime}</span>
                          </div>
                        )}
                        
                        {task.notes && (
                          <div className="mt-2 text-sm text-yellow-500 flex items-start gap-1">
                            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>{task.notes}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {housekeepingTasks
                  .filter(task => task.status !== "completed")
                  .map((task) => (
                    <Card key={task.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold`} style={{ backgroundColor: getPriorityColor(task.priority) }}>
                              {task.roomNumber}
                            </div>
                            
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{task.title}</h3>
                                {task.isUrgent && <Badge variant="destructive">Urgent</Badge>}
                                {task.isVIP && <Badge className="bg-amber-500">VIP</Badge>}
                              </div>
                              
                              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  Due by {new Date(task.dueAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                <span>Assigned to: {task.assignedTo}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {getStatusBadge(task.status)}
                            
                            <Button variant="outline" size="sm">
                              <Check className="h-4 w-4 mr-1" />
                              {task.status === "pending" ? "Start" : "Complete"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-4">
            <p>Upcoming housekeeping tasks will be displayed here.</p>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              {housekeepingTasks
                .filter(task => task.status === "completed")
                .map((task) => (
                  <Card key={task.id} className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                            {task.roomNumber}
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{task.title}</h3>
                              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">Completed</Badge>
                            </div>
                            
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {task.completedAt && `Completed: ${new Date(task.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                              </span>
                              <span>By: {task.assignedTo}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <CreateTaskDialog open={showCreateTask} onOpenChange={setShowCreateTask} />
    </Layout>
  );
};

export default TasksHousekeepingPage;
