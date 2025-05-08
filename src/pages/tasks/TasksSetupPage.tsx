import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, TableBody, TableCaption, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Users, Settings, ClipboardCheck, BookOpen, Wrench, 
  Bed, Car, Plus, Trash2, Edit, CheckCircle, Clock
} from "lucide-react";
import { toast } from "sonner";

const TasksSetupPage = () => {
  const [showAddTaskTemplate, setShowAddTaskTemplate] = useState(false);
  const [showAddStaffMember, setShowAddStaffMember] = useState(false);
  
  // Task templates sample data
  const taskTemplates = [
    { 
      id: 1, 
      name: "Standard Room Cleaning", 
      category: "housekeeping", 
      duration: 30, 
      priority: "medium", 
      steps: 8 
    },
    { 
      id: 2, 
      name: "VIP Suite Cleaning", 
      category: "housekeeping", 
      duration: 60, 
      priority: "high", 
      steps: 15 
    },
    { 
      id: 3, 
      name: "AC Maintenance", 
      category: "maintenance", 
      duration: 45, 
      priority: "medium", 
      steps: 6 
    },
    { 
      id: 4, 
      name: "Airport Pickup", 
      category: "car", 
      duration: 90, 
      priority: "high", 
      steps: 5 
    },
    { 
      id: 5, 
      name: "Monthly Fire Extinguisher Check", 
      category: "maintenance", 
      duration: 120, 
      priority: "high", 
      steps: 10 
    }
  ];
  
  // Staff members sample data
  const staffMembers = [
    { 
      id: 1, 
      name: "Maria Garcia", 
      role: "Housekeeper", 
      category: "housekeeping", 
      status: "active", 
      tasksCompleted: 125, 
      efficiency: "95%" 
    },
    { 
      id: 2, 
      name: "John Davis", 
      role: "Housekeeper", 
      category: "housekeeping", 
      status: "active", 
      tasksCompleted: 98, 
      efficiency: "87%" 
    },
    { 
      id: 3, 
      name: "Robert Miller", 
      role: "Maintenance Technician", 
      category: "maintenance", 
      status: "active", 
      tasksCompleted: 64, 
      efficiency: "92%" 
    },
    { 
      id: 4, 
      name: "David Kim", 
      role: "Driver", 
      category: "car", 
      status: "active", 
      tasksCompleted: 42, 
      efficiency: "88%" 
    }
  ];
  
  // Notification rules sample data
  const notificationRules = [
    { 
      id: 1, 
      name: "Task Overdue", 
      description: "Send notification if task is not completed by due time", 
      status: "active" 
    },
    { 
      id: 2, 
      name: "High Priority Task Assigned", 
      description: "Notify staff when assigned a high priority task", 
      status: "active" 
    },
    { 
      id: 3, 
      name: "VIP Guest Check-in", 
      description: "Alert housekeeping about VIP guest arrivals", 
      status: "active" 
    },
    { 
      id: 4, 
      name: "Maintenance Hazard", 
      description: "Alert all staff about high hazard maintenance tasks", 
      status: "inactive" 
    }
  ];
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "housekeeping": return <Bed className="h-4 w-4" />;
      case "maintenance": return <Wrench className="h-4 w-4" />;
      case "car": return <Car className="h-4 w-4" />;
      default: return <ClipboardCheck className="h-4 w-4" />;
    }
  };
  
  const getCategoryClass = (category: string) => {
    switch (category) {
      case "housekeeping": return "text-blue-500";
      case "maintenance": return "text-amber-500";
      case "car": return "text-green-500";
      default: return "text-gray-500";
    }
  };
  
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-500";
      case "medium": return "text-amber-500";
      case "low": return "text-blue-500";
      default: return "text-gray-500";
    }
  };

  const addTaskTemplate = () => {
    toast.success("Task template added successfully");
    setShowAddTaskTemplate(false);
  };

  const addStaffMember = () => {
    toast.success("Staff member added successfully");
    setShowAddStaffMember(false);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Tasks Setup</h1>
          <p className="text-muted-foreground">
            Configure tasks, templates, staff assignments, and notification rules
          </p>
        </div>

        <Tabs defaultValue="templates" className="space-y-4">
          <TabsList>
            <TabsTrigger value="templates">Task Templates</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Task Templates</h2>
              <Dialog open={showAddTaskTemplate} onOpenChange={setShowAddTaskTemplate}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Template
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Task Template</DialogTitle>
                    <DialogDescription>
                      Create a new task template for common recurring tasks.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="templateName">Template Name</Label>
                      <Input id="templateName" placeholder="Enter template name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="housekeeping">Housekeeping</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="car">Car</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration (minutes)</Label>
                        <Input id="duration" type="number" min="5" step="5" defaultValue="30" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input id="description" placeholder="Enter description" />
                    </div>
                  </form>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddTaskTemplate(false)}>
                      Cancel
                    </Button>
                    <Button onClick={addTaskTemplate}>
                      Save Template
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Template Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Steps</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {taskTemplates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">{template.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={getCategoryClass(template.category)}>
                              {getCategoryIcon(template.category)}
                            </span>
                            <span className="capitalize">
                              {template.category}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{template.duration} min</TableCell>
                        <TableCell className={getPriorityClass(template.priority)}>
                          {template.priority.charAt(0).toUpperCase() + template.priority.slice(1)}
                        </TableCell>
                        <TableCell>{template.steps} steps</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500">
                              <Trash2 className="h-4 w-4" />
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
          
          <TabsContent value="staff" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Staff Management</h2>
              <Dialog open={showAddStaffMember} onOpenChange={setShowAddStaffMember}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Staff
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Staff Member</DialogTitle>
                    <DialogDescription>
                      Add a new staff member to assign tasks to.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="staffName">Full Name</Label>
                      <Input id="staffName" placeholder="Enter staff name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="staffRole">Role</Label>
                      <Input id="staffRole" placeholder="Enter staff role" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="staffCategory">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="housekeeping">Housekeeping</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="car">Car</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="Enter phone number" />
                    </div>
                  </form>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddStaffMember(false)}>
                      Cancel
                    </Button>
                    <Button onClick={addStaffMember}>
                      Save Staff
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tasks Completed</TableHead>
                      <TableHead>Efficiency</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staffMembers.map((staff) => (
                      <TableRow key={staff.id}>
                        <TableCell className="font-medium">{staff.name}</TableCell>
                        <TableCell>{staff.role}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={getCategoryClass(staff.category)}>
                              {getCategoryIcon(staff.category)}
                            </span>
                            <span className="capitalize">
                              {staff.category}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell>{staff.tasksCompleted}</TableCell>
                        <TableCell>{staff.efficiency}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Users className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
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
          
          <TabsContent value="notifications" className="space-y-4">
            <h2 className="text-xl font-semibold">Notification Rules</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notificationRules.map((rule) => (
                <Card key={rule.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{rule.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <div className={`h-3 w-3 rounded-full ${rule.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <span className="text-sm text-muted-foreground capitalize">{rule.status}</span>
                      </div>
                    </div>
                    <CardDescription>
                      {rule.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="ml-auto">
                      <Settings className="h-4 w-4 mr-1" />
                      Configure
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              <Card className="border-dashed">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[150px]">
                  <Button variant="ghost" className="h-auto p-4 flex flex-col items-center gap-2">
                    <Plus className="h-6 w-6" />
                    <span className="font-medium">Add New Notification Rule</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            <h2 className="text-xl font-semibold">Reports</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Task Completion
                  </CardTitle>
                  <CardDescription>
                    Task completion rates by department and staff
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Report
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-amber-500" />
                    Response Time
                  </CardTitle>
                  <CardDescription>
                    Average time to complete tasks by priority
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Report
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    Staff Performance
                  </CardTitle>
                  <CardDescription>
                    Individual staff performance metrics
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Report
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TasksSetupPage;
