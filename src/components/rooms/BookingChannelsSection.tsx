
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface BookingChannelsSectionProps {
  bookingChannels: string[];
  handleEditChannel: (oldChannel: string, newChannel: string) => void;
  handleAddChannel: (channelName: string, commission: string, paymentType: string) => void;
  handleDeleteChannel: (channel: string) => void;
}

const paymentTypes = ["Direct", "Prepaid", "On Arrival"];
const commissionRates = ["0%", "2%", "4%", "6%", "8%", "10%", "15%", "20%"];

const BookingChannelsSection = ({ 
  bookingChannels,
  handleEditChannel,
  handleAddChannel,
  handleDeleteChannel
}: BookingChannelsSectionProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [commission, setCommission] = useState("0%");
  const [paymentType, setPaymentType] = useState("Direct");
  const [editingChannel, setEditingChannel] = useState<string | null>(null);
  
  const openAddDialog = () => {
    setChannelName("");
    setCommission("0%");
    setPaymentType("Direct");
    setEditingChannel(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (channel: string) => {
    setChannelName(channel);
    // Set default values or retrieve actual values if available
    const index = bookingChannels.indexOf(channel);
    setCommission(index === 0 ? '0%' : `${(index + 1) * 2}%`);
    setPaymentType(index === 0 ? 'Direct' : index % 2 === 0 ? 'Prepaid' : 'On Arrival');
    setEditingChannel(channel);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!channelName.trim()) {
      toast.error("Channel name cannot be empty");
      return;
    }

    if (editingChannel) {
      // If we're editing, update the channel
      handleEditChannel(editingChannel, channelName);
      toast.success(`Channel ${editingChannel} updated to ${channelName}`);
    } else {
      // If we're adding, add a new channel
      if (bookingChannels.includes(channelName)) {
        toast.error(`Channel ${channelName} already exists`);
        return;
      }
      handleAddChannel(channelName, commission, paymentType);
      toast.success(`Channel ${channelName} added successfully`);
    }
    setIsDialogOpen(false);
  };

  const confirmDeleteChannel = (channel: string) => {
    if (channel === "Walk-in") {
      toast.error("Cannot delete default Walk-in channel");
      return;
    }
    
    if (confirm(`Are you sure you want to delete the "${channel}" channel?`)) {
      handleDeleteChannel(channel);
      toast.success(`Channel "${channel}" deleted successfully`);
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Booking Channels</h2>
        <Button onClick={openAddDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add Channel
        </Button>
      </div>
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Channel Name</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Payment Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookingChannels.map((channel, index) => (
              <TableRow key={channel}>
                <TableCell className="font-medium">{channel}</TableCell>
                <TableCell>{index === 0 ? '0%' : `${(index + 1) * 2}%`}</TableCell>
                <TableCell>
                  {index === 0 ? 'Direct' : index % 2 === 0 ? 'Prepaid' : 'On Arrival'}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => openEditDialog(channel)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => confirmDeleteChannel(channel)}
                      disabled={channel === "Walk-in"}
                    >
                      <Trash2 className={`h-4 w-4 ${channel === "Walk-in" ? "text-gray-300" : "text-red-500"}`} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Channel Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingChannel ? "Edit Booking Channel" : "Add Booking Channel"}</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="channelName" className="text-right">Channel Name</Label>
              <Input
                id="channelName"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                className="col-span-3"
                disabled={editingChannel === "Walk-in"}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="commission" className="text-right">Commission</Label>
              <Select value={commission} onValueChange={setCommission} disabled={editingChannel === "Walk-in"}>
                <SelectTrigger className="col-span-3" id="commission">
                  <SelectValue placeholder="Commission rate" />
                </SelectTrigger>
                <SelectContent>
                  {commissionRates.map((rate) => (
                    <SelectItem key={rate} value={rate}>{rate}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentType" className="text-right">Payment Type</Label>
              <Select value={paymentType} onValueChange={setPaymentType} disabled={editingChannel === "Walk-in"}>
                <SelectTrigger className="col-span-3" id="paymentType">
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  {paymentTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BookingChannelsSection;
