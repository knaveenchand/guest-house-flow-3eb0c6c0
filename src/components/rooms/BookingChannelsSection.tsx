
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

interface BookingChannelsSectionProps {
  bookingChannels: string[];
  handleEditChannel: (channel: string) => void;
  handleAddChannel: () => void;
}

const BookingChannelsSection = ({ 
  bookingChannels,
  handleEditChannel,
  handleAddChannel
}: BookingChannelsSectionProps) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Booking Channels</h2>
        <Button onClick={handleAddChannel}>
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
                      onClick={() => handleEditChannel(channel)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
};

export default BookingChannelsSection;
