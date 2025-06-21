
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BookingChannel, getBookingChannels, addBookingChannel, updateBookingChannel, deleteBookingChannel } from "@/api/bookingChannels";

const paymentTypes = ["Direct", "Prepaid", "On Arrival"];

const BookingChannelsSection = () => {
  const [channels, setChannels] = useState<BookingChannel[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [commission, setCommission] = useState(0);
  const [paymentType, setPaymentType] = useState("Direct");
  const [editingChannel, setEditingChannel] = useState<BookingChannel | null>(null);

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    try {
      const fetchedChannels = await getBookingChannels();
      setChannels(fetchedChannels.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      toast.error("Failed to fetch booking channels.");
      console.error("Error fetching channels:", error);
    }
  };
  
  const openAddDialog = () => {
    setEditingChannel(null);
    setChannelName("");
    setCommission(0);
    setPaymentType("Direct");
    setIsDialogOpen(true);
  };

  const openEditDialog = (channel: BookingChannel) => {
    setEditingChannel(channel);
    setChannelName(channel.name);
    setCommission(channel.commission || 0);
    setPaymentType(channel.paymentType || "Direct");
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!channelName.trim()) {
      toast.error("Channel name cannot be empty");
      return;
    }

    const channelData: Omit<BookingChannel, 'id'> = {
      name: channelName.trim(),
      commission,
      paymentType,
    };

    try {
      if (editingChannel) {
        await updateBookingChannel(editingChannel.id!, channelData);
        toast.success(`Channel "${channelName}" updated.`);
      } else {
        if (channels.some(c => c.name.toLowerCase() === channelName.trim().toLowerCase())) {
          toast.error(`Channel "${channelName}" already exists.`);
          return;
        }
        await addBookingChannel(channelData);
        toast.success(`Channel "${channelName}" added.`);
      }
      fetchChannels(); // Re-fetch all channels to get the latest data
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to save channel.");
      console.error("Error saving channel:", error);
    }
  };

  const confirmDeleteChannel = (channel: BookingChannel) => {
    if (channel.name === "Walk-in") {
      toast.error("The default 'Walk-in' channel cannot be deleted.");
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete the "${channel.name}" channel?`)) {
      handleDelete(channel.id!);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBookingChannel(id);
      fetchChannels(); // Re-fetch to update the list
      toast.success("Channel deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete channel.");
      console.error("Error deleting channel:", error);
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
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {channels.map((channel) => (
              <TableRow key={channel.id}>
                <TableCell className="font-medium">{channel.name}</TableCell>
                <TableCell>{channel.commission || 0}%</TableCell>
                <TableCell>{channel.paymentType || 'N/A'}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => openEditDialog(channel)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => confirmDeleteChannel(channel)}
                      disabled={channel.name === "Walk-in"}
                    >
                      <Trash2 className={`h-4 w-4 ${channel.name === "Walk-in" ? "" : "text-red-500"}`} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingChannel ? "Edit Booking Channel" : "Add Booking Channel"}</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="channelName" className="text-right">Name</Label>
              <Input
                id="channelName"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                className="col-span-3"
                disabled={editingChannel?.name === "Walk-in"}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="commission" className="text-right">Commission (%)</Label>
              <Input
                id="commission"
                type="number"
                value={commission}
                onChange={(e) => setCommission(Number(e.target.value))}
                className="col-span-3"
                disabled={editingChannel?.name === "Walk-in"}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentType" className="text-right">Payment Type</Label>
              <Select 
                value={paymentType} 
                onValueChange={setPaymentType} 
                disabled={editingChannel?.name === "Walk-in"}
              >
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
