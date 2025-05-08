
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Wrench, Clock, AlertTriangle, Tool, Plus,
  CalendarDays, ClipboardList, FileText, CheckCircle,
  RepeatIcon, Image
} from "lucide-react";
import { MaintenanceTask } from "@/types/posTypes";
import { CreateTaskDialog } from "@/components/tasks/CreateTaskDialog";
import { TaskFilterDropdown } from "@/components/tasks/TaskFilterDropdown";

const TasksMaintenancePage = () => {
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  const maintenanceTasks: MaintenanceTask[] = [
    { 
      id: 1, 
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
      id: 2, 
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
    },
    { 
      id: 3, 
      title: "Replace light bulbs", 
      location: "Hallway Floor 3", 
      type: "maintenance", 
      priority: "medium", 
      status: "pending", 
      assignedTo: "David K.", 
      createdAt: "2025-05-08T09:15:00Z", 
      dueAt: "2025-05-08T15:00:00Z",
      issueType: "electrical",
      hazardLevel: "low",
      toolsRequired: ["Ladder", "Replacement bulbs", "Gloves"]
    },
    { 
      id: 4, 
      title: "Fire extinguisher check", 
      location: "All floors", 
      type: "maintenance", 
      priority: "high", 
      status: "pending", 
      assignedTo: "David K.", 
      createdAt: "2025-05-08T08:00:00Z", 
      dueAt: "2025-05-09T17:00:00Z",
      issueType: "safety",
      hazardLevel: "high",
      isRecurring: true,
      recurringFrequency: "monthly",
      toolsRequired: ["Checklist", "Pressure gauge"]
    },
    {
      id: 5,
      title: "Repair broken chair",
      location: "Room 401",
      type: "maintenance",
      priority: "low",
      status: "completed",
      assignedTo: "Robert M.",
      createdAt: "2025-05-08T07:30:00Z",
      dueAt: "2025-05-08T14:00:00Z",
      completedAt: "2025-05-08T13:30:00Z",
      issueType: "furniture",
      hazardLevel: "low",
      toolsRequired: ["Wood glue", "Clamps", "Screwdriver"]
    }
  ];

  const scheduledMaintenance: MaintenanceTask[] = [
    {
      id: 6,
      title: "AC Filter Cleaning",
      location: "Rooms 101-110",
      type: "maintenance",
      priority: "medium",
      status: "pending",
      assignedTo: "Robert M.",
      createdAt: "2025-05-01T08:00:00Z",
      dueAt: "2025-05-15T17:00:00Z",
      issueType: "appliance",
      hazardLevel: "low",
      isRecurring: true,
      recurringFrequency: "quarterly",
      toolsRequired: ["Filter cleaner", "Vacuum", "Gloves"]
    },
    {
      id: 7,
      title: "Pool Equipment Check",
      location: "Swimming Pool",
      type: "maintenance",
      priority: "medium",
      status: "pending",
      assignedTo: "David K.",
      createdAt: "2025-05-01T08:00:00Z",
      dueAt: "2025-05-10T17:00:00Z",
      issueType: "plumbing",
      hazardLevel: "medium",
      isRecurring: true,
      recurringFrequency: "weekly",
      toolsRequired: ["Water test kit", "Pressure gauge", "Chlorine"]
    },
    {
      id: 8,
      title: "Elevator Inspection",
      location: "Main Elevator",
      type: "maintenance",
      priority: "high",
      status: "pending",
      assignedTo: "External contractor",
      createdAt: "2025-05-01T08:00:00Z",
      dueAt: "2025-05-20T12:00:00Z",
      issueType: "safety",
      hazardLevel: "high",
      isRecurring: true,
      recurringFrequency: "quarterly",
      toolsRequired: []
    }
  ];

  const getHazardBadge = (hazardLevel: string) => {
    switch (hazardLevel) {
      case "high": return <Badge variant="destructive">High Hazard</Badge>;
      case "medium": return <Badge variant="default">Medium Hazard</Badge>;
      case "low": return <Badge variant="outline">Low Hazard</Badge>;
      default: return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high": return <Badge variant="destructive">High Priority</Badge>;
      case "medium": return <Badge variant="default">Medium Priority</Badge>;
      case "low": return <Badge variant="outline">Low Priority</Badge>;
      default: return <Badge variant="outline">Not Set</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const getTaskRecurrence = (task: MaintenanceTask) => {
    if (!task.isRecurring) return null;
    
    switch (task.recurringFrequency) {
      case "daily": return "Daily";
      case "weekly": return "Weekly";
      case "monthly": return "Monthly";
      case "quarterly": return "Every 3 months";
      case "annually": return "Yearly";
      default: return "Recurring";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Maintenance Tasks</h1>
            <p className="text-muted-foreground">
              Manage repairs, safety checks, and facility maintenance
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

        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active Jobs</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Maintenance</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {maintenanceTasks
                .filter(task => task.status !== "completed")
                .map((task) => (
                  <Card key={task.id} className="overflow-hidden">
                    <div className="h-2 w-full" style={{ 
                      backgroundColor: task.hazardLevel === "high" ? '#ef4444' : 
                                      task.hazardLevel === "medium" ? '#f59e0b' : 
                                      '#3b82f6' 
                    }}></div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            {getHazardBadge(task.hazardLevel)}
                            {task.isRecurring && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <RepeatIcon className="h-3 w-3" /> 
                                {getTaskRecurrence(task)}
                              </Badge>
                            )}
                          </div>
                          
                          <h3 className="text-lg font-medium mt-2">{task.title}</h3>
                          <p className="text-muted-foreground">{task.location}</p>
                          
                          {task.description && (
                            <p className="text-sm mt-2">{task.description}</p>
                          )}
                          
                          <div className="mt-3 flex items-center gap-2">
                            <Wrench className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{task.issueType}</span>
                          </div>
                          
                          {task.toolsRequired && task.toolsRequired.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {task.toolsRequired.map((tool, index) => (
                                <Badge key={index} variant="outline" className="bg-gray-800">
                                  <Tool className="h-3 w-3 mr-1" />
                                  {tool}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div>
                          {getPriorityBadge(task.priority)}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>{getInitials(task.assignedTo || "")}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <div>{task.assignedTo}</div>
                          <div className="text-muted-foreground text-xs">
                            Due {new Date(task.dueAt).toLocaleDateString()} at {new Date(task.dueAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Image className="h-4 w-4" />
                        </Button>
                        <Button size="sm">
                          Start Job
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="scheduled" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scheduledMaintenance.map((task) => (
                <Card key={task.id} className="overflow-hidden">
                  <div className="h-2 w-full" style={{ 
                    backgroundColor: task.hazardLevel === "high" ? '#ef4444' : 
                                    task.hazardLevel === "medium" ? '#f59e0b' : 
                                    '#3b82f6' 
                  }}></div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <RepeatIcon className="h-4 w-4 text-purple-500" />
                          <span className="text-sm font-medium text-purple-500">
                            {getTaskRecurrence(task)}
                          </span>
                          {getHazardBadge(task.hazardLevel)}
                        </div>
                        
                        <h3 className="text-lg font-medium mt-2">{task.title}</h3>
                        <p className="text-muted-foreground">{task.location}</p>
                        
                        {task.description && (
                          <p className="text-sm mt-2">{task.description}</p>
                        )}
                        
                        <div className="mt-3 flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Next due: {new Date(task.dueAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        {getPriorityBadge(task.priority)}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>{getInitials(task.assignedTo || "")}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{task.assignedTo}</span>
                    </div>
                    
                    <Button size="sm" variant="outline" className="ml-auto">
                      <ClipboardList className="h-4 w-4 mr-1" />
                      View Checklist
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              {maintenanceTasks
                .filter(task => task.status === "completed")
                .map((task) => (
                  <Card key={task.id} className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white">
                            <CheckCircle className="h-6 w-6" />
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{task.title}</h3>
                              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">Completed</Badge>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1 text-sm text-muted-foreground">
                              <span>{task.location}</span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {task.completedAt && `Completed: ${new Date(task.completedAt).toLocaleString()}`}
                              </span>
                              <span>By: {task.assignedTo}</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          View Report
                        </Button>
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

export default TasksMaintenancePage;
