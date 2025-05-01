
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Check, CalendarDays } from "lucide-react";

const TasksPage = () => {
  const tasks = [
    { id: 1, room: "101", task: "Room cleaning", priority: "high", assignee: "Maria G.", dueTime: "12:00 PM" },
    { id: 2, room: "203", task: "Towel replacement", priority: "medium", assignee: "John D.", dueTime: "2:00 PM" },
    { id: 3, room: "305", task: "Maintenance - Fix AC", priority: "high", assignee: "Robert M.", dueTime: "11:00 AM" },
    { id: 4, room: "102", task: "Room cleaning", priority: "medium", assignee: "Maria G.", dueTime: "3:00 PM" },
    { id: 5, room: "204", task: "Minibar restock", priority: "low", assignee: "John D.", dueTime: "4:30 PM" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground">
              Manage housekeeping and maintenance tasks
            </p>
          </div>
          <Button>Create Task</Button>
        </div>

        <Tabs defaultValue="today">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="today" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              {tasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Room {task.room}</span>
                          <Badge variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "outline"}>
                            {task.priority}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-medium mt-1">{task.task}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>Assigned to: {task.assignee}</span>
                          <span className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" />
                            Due by {task.dueTime}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="icon">
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="upcoming" className="mt-4">
            <p>Upcoming tasks will be displayed here.</p>
          </TabsContent>
          <TabsContent value="completed" className="mt-4">
            <p>Completed tasks will be displayed here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TasksPage;
