
import { HousekeepingTask } from "@/types/posTypes";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Check, Clock, CalendarDays, AlertCircle, 
  UserCheck, Flag, ArrowRight, CheckCircle
} from "lucide-react";

interface HousekeepingTaskCardProps {
  task: HousekeepingTask;
}

export function HousekeepingTaskCard({ task }: HousekeepingTaskCardProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
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

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high": return <Badge variant="destructive">High Priority</Badge>;
      case "medium": return <Badge variant="default">Medium Priority</Badge>;
      case "low": return <Badge variant="outline">Low Priority</Badge>;
      default: return <Badge variant="outline">Not Set</Badge>;
    }
  };

  return (
    <Card className="overflow-hidden border-l-4" style={{ borderLeftColor: task.isVIP ? '#f59e0b' : task.isUrgent ? '#ef4444' : '#d1d5db' }}>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-lg">Room {task.roomNumber}</span>
              {task.isUrgent && <Badge variant="destructive">Urgent</Badge>}
              {task.isVIP && <Badge className="bg-amber-500">VIP</Badge>}
              {getPriorityBadge(task.priority)}
            </div>
            
            <h3 className="text-lg font-medium">{task.title}</h3>
            
            {task.description && (
              <p className="text-muted-foreground mt-1">{task.description}</p>
            )}
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm">
              {task.checkoutTime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Checkout: {task.checkoutTime}</span>
                </div>
              )}
              
              {task.checkInTime && (
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span>Next check-in: {task.checkInTime}</span>
                </div>
              )}
              
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Due by: {new Date(task.dueAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Assigned to:</span>
              <div className="flex items-center gap-1">
                <Avatar className="h-6 w-6">
                  {task.assigneePhoto ? (
                    <AvatarFallback>{getInitials(task.assignedTo || "")}</AvatarFallback>
                  ) : (
                    <AvatarFallback>{getInitials(task.assignedTo || "")}</AvatarFallback>
                  )}
                </Avatar>
                <span className="font-medium">{task.assignedTo}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              {task.status !== "completed" ? (
                <>
                  {task.status === "pending" && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700" variant="default">
                      Start Task
                    </Button>
                  )}
                  
                  {task.status === "in-progress" && (
                    <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700">
                      <Check className="h-4 w-4 mr-1" />
                      Complete
                    </Button>
                  )}
                  
                  <Button size="sm" variant="outline">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Flag Issue
                  </Button>
                </>
              ) : (
                <div className="flex items-center text-green-500">
                  <CheckCircle className="h-5 w-5 mr-1" /> 
                  Completed
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Status indicator */}
        <div className="absolute top-0 right-0 h-2 w-16" style={{ backgroundColor: getStatusColor(task.status) }}></div>
      </CardContent>
    </Card>
  );
}
