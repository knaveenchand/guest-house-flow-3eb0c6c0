import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskType } from "@/types/posTypes";
import { toast } from "sonner";

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTaskDialog({ open, onOpenChange }: CreateTaskDialogProps) {
  const [taskType, setTaskType] = useState<TaskType>("housekeeping");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("medium");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");

  // Housekeeping specific fields
  const [roomNumber, setRoomNumber] = useState("");
  const [checkoutTime, setCheckoutTime] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [isVIP, setIsVIP] = useState(false);

  // Maintenance specific fields
  const [issueType, setIssueType] = useState("");
  const [hazardLevel, setHazardLevel] = useState("low");
  const [toolsRequired, setToolsRequired] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);

  // Car specific fields
  const [requestType, setRequestType] = useState("airport-pickup");
  const [guestName, setGuestName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [flightDetails, setFlightDetails] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [items, setItems] = useState("");
  const [budget, setBudget] = useState("");
  const [vehicleAssigned, setVehicleAssigned] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title || !location || (taskType === "housekeeping" && !roomNumber)) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    // Here you would normally send the data to your backend
    toast.success(`${taskType} task "${title}" created successfully!`);
    
    // Reset form and close dialog
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLocation("");
    setPriority("medium");
    setAssignee("");
    setDueDate("");
    setDueTime("");
    setRoomNumber("");
    setCheckoutTime("");
    setCheckInTime("");
    setIsUrgent(false);
    setIsVIP(false);
    setIssueType("");
    setHazardLevel("low");
    setToolsRequired("");
    setIsRecurring(false);
    setRequestType("airport-pickup");
    setGuestName("");
    setContactInfo("");
    setFlightDetails("");
    setPickupLocation("");
    setDropoffLocation("");
    setItems("");
    setBudget("");
    setVehicleAssigned("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Create a new task for assignment to staff members.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="housekeeping" className="mt-2" onValueChange={(value) => setTaskType(value as TaskType)}>
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="housekeeping">Housekeeping</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="car">Car</TabsTrigger>
            </TabsList>
            
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input 
                  id="title" 
                  placeholder="Enter task title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea 
                  id="description" 
                  placeholder="Enter task details" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    placeholder="Enter location" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger id="priority">
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assignee">Assign To</Label>
                  <Select value={assignee} onValueChange={setAssignee}>
                    <SelectTrigger id="assignee">
                      <SelectValue placeholder="Select staff member" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maria">Maria G.</SelectItem>
                      <SelectItem value="john">John D.</SelectItem>
                      <SelectItem value="robert">Robert M.</SelectItem>
                      <SelectItem value="david">David K.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input 
                      id="dueDate" 
                      type="date" 
                      value={dueDate} 
                      onChange={(e) => setDueDate(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dueTime">Due Time</Label>
                    <Input 
                      id="dueTime" 
                      type="time" 
                      value={dueTime} 
                      onChange={(e) => setDueTime(e.target.value)} 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <TabsContent value="housekeeping" className="space-y-4 py-2 pb-4 mt-2 border-t">
              <h3 className="font-medium text-lg">Housekeeping Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roomNumber">Room Number</Label>
                  <Input 
                    id="roomNumber" 
                    type="room-number" 
                    placeholder="101" 
                    value={roomNumber} 
                    onChange={(e) => setRoomNumber(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="checkoutTime">Checkout Time</Label>
                  <Input 
                    id="checkoutTime" 
                    type="time" 
                    value={checkoutTime} 
                    onChange={(e) => setCheckoutTime(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="checkInTime">Next Check-in Time</Label>
                  <Input 
                    id="checkInTime" 
                    type="time" 
                    value={checkInTime} 
                    onChange={(e) => setCheckInTime(e.target.value)} 
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="isUrgent" 
                    checked={isUrgent} 
                    onChange={(e) => setIsUrgent(e.target.checked)} 
                    className="rounded border-gray-400" 
                  />
                  <Label htmlFor="isUrgent">Urgent</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="isVIP" 
                    checked={isVIP} 
                    onChange={(e) => setIsVIP(e.target.checked)} 
                    className="rounded border-gray-400" 
                  />
                  <Label htmlFor="isVIP">VIP Guest</Label>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="maintenance" className="space-y-4 py-2 pb-4 mt-2 border-t">
              <h3 className="font-medium text-lg">Maintenance Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="issueType">Issue Type</Label>
                  <Select value={issueType} onValueChange={setIssueType}>
                    <SelectTrigger id="issueType">
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Common Issues</SelectLabel>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="appliance">Appliance</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="aircon">Air Conditioning</SelectItem>
                        <SelectItem value="structural">Structural</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hazardLevel">Hazard Level</Label>
                  <Select value={hazardLevel} onValueChange={setHazardLevel}>
                    <SelectTrigger id="hazardLevel">
                      <SelectValue placeholder="Select hazard level" />
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
                <Label htmlFor="toolsRequired">Tools Required</Label>
                <Input 
                  id="toolsRequired" 
                  placeholder="Enter tools required (comma separated)" 
                  value={toolsRequired} 
                  onChange={(e) => setToolsRequired(e.target.value)} 
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="isRecurring" 
                  checked={isRecurring} 
                  onChange={(e) => setIsRecurring(e.target.checked)} 
                  className="rounded border-gray-400" 
                />
                <Label htmlFor="isRecurring">Recurring Maintenance</Label>
              </div>
            </TabsContent>
            
            <TabsContent value="car" className="space-y-4 py-2 pb-4 mt-2 border-t">
              <h3 className="font-medium text-lg">Car Task Details</h3>
              
              <div className="space-y-2">
                <Label htmlFor="requestType">Request Type</Label>
                <Select value={requestType} onValueChange={setRequestType}>
                  <SelectTrigger id="requestType">
                    <SelectValue placeholder="Select request type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="airport-pickup">Airport Pickup</SelectItem>
                    <SelectItem value="airport-dropoff">Airport Dropoff</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="errand">Errand</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {(requestType === "airport-pickup" || requestType === "airport-dropoff") && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guestName">Guest Name</Label>
                      <Input 
                        id="guestName" 
                        placeholder="Enter guest name" 
                        value={guestName} 
                        onChange={(e) => setGuestName(e.target.value)} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contactInfo">Contact Info</Label>
                      <Input 
                        id="contactInfo" 
                        placeholder="Enter contact information" 
                        value={contactInfo} 
                        onChange={(e) => setContactInfo(e.target.value)} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="flightDetails">Flight Details</Label>
                    <Input 
                      id="flightDetails" 
                      placeholder="Enter flight number" 
                      value={flightDetails} 
                      onChange={(e) => setFlightDetails(e.target.value)} 
                    />
                  </div>
                </div>
              )}
              
              {requestType === "shopping" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="items">Items to Purchase (comma separated)</Label>
                    <Textarea 
                      id="items" 
                      placeholder="Enter items to purchase" 
                      value={items} 
                      onChange={(e) => setItems(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget</Label>
                    <Input 
                      id="budget" 
                      type="price" 
                      placeholder="0.00" 
                      value={budget} 
                      onChange={(e) => setBudget(e.target.value)} 
                    />
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickupLocation">Pickup Location</Label>
                  <Input 
                    id="pickupLocation" 
                    placeholder="Enter pickup location" 
                    value={pickupLocation} 
                    onChange={(e) => setPickupLocation(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dropoffLocation">Dropoff Location</Label>
                  <Input 
                    id="dropoffLocation" 
                    placeholder="Enter dropoff location" 
                    value={dropoffLocation} 
                    onChange={(e) => setDropoffLocation(e.target.value)} 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vehicleAssigned">Assigned Vehicle</Label>
                <Select value={vehicleAssigned} onValueChange={setVehicleAssigned}>
                  <SelectTrigger id="vehicleAssigned">
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="van1">Van 1</SelectItem>
                    <SelectItem value="van2">Van 2</SelectItem>
                    <SelectItem value="truck">Truck</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-4 gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
