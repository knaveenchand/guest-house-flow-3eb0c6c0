
import { CarTask } from "@/types/posTypes";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Check, Clock, Car, MapPin, ShoppingBag, 
  User, PlaneLanding, PlaneTakeoff, DollarSign, CheckCircle
} from "lucide-react";

interface CarTaskCardProps {
  task: CarTask;
}

export function CarTaskCard({ task }: CarTaskCardProps) {
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

  const getRequestTypeIcon = (requestType: string) => {
    switch (requestType) {
      case "airport-pickup": return <PlaneLanding className="h-5 w-5 text-blue-500" />;
      case "airport-dropoff": return <PlaneTakeoff className="h-5 w-5 text-blue-500" />;
      case "shopping": return <ShoppingBag className="h-5 w-5 text-green-500" />;
      case "errand": return <Car className="h-5 w-5 text-orange-500" />;
      default: return <Car className="h-5 w-5" />;
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

  const formatRequestType = (type: string) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <Card className="overflow-hidden border-l-4" style={{ borderLeftColor: task.priority === "high" ? '#ef4444' : task.priority === "medium" ? '#f59e0b' : '#d1d5db' }}>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="flex items-center gap-1 font-medium">
                {getRequestTypeIcon(task.requestType)}
                {formatRequestType(task.requestType)}
              </span>
              {getPriorityBadge(task.priority)}
            </div>
            
            <h3 className="text-lg font-medium">{task.title}</h3>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm">
              {task.guestName && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Guest: {task.guestName}</span>
                </div>
              )}
              
              {task.flightDetails && (
                <div className="flex items-center gap-1">
                  <PlaneLanding className="h-4 w-4 text-muted-foreground" />
                  <span>Flight: {task.flightDetails}</span>
                </div>
              )}
              
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>From: {task.pickupLocation}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>To: {task.dropoffLocation}</span>
              </div>
              
              {task.budget && (
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>Budget: ${task.budget}</span>
                </div>
              )}
              
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Due by: {new Date(task.dueAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
            
            {task.items && task.items.length > 0 && (
              <div className="mt-2">
                <span className="text-sm font-medium">Items:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {task.items.map((item, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-800">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Assigned to:</span>
              <div className="flex items-center gap-1">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>{getInitials(task.assignedTo || "")}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{task.assignedTo}</span>
              </div>
            </div>
            
            {task.vehicleAssigned && (
              <div className="flex items-center gap-1 text-sm">
                <Car className="h-4 w-4" />
                <span>{task.vehicleAssigned}</span>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-2">
              {task.status !== "completed" ? (
                <>
                  {task.status === "pending" && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700" variant="default">
                      Start Trip
                    </Button>
                  )}
                  
                  {task.status === "in-progress" && (
                    <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700">
                      <Check className="h-4 w-4 mr-1" />
                      Complete
                    </Button>
                  )}
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
