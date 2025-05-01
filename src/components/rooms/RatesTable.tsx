
import { Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface RatesTableProps {
  roomTypeList: Array<{
    name: string;
  }>;
  bookingChannels: string[];
  ratesData: Record<string, Record<string, string>>;
  handleRateChange: (roomType: string, channel: string, value: string) => void;
}

const RatesTable = ({ roomTypeList, bookingChannels, ratesData, handleRateChange }: RatesTableProps) => {
  const handleSaveRates = () => {
    // This would save the rates to the backend
    toast.success("Rates have been saved successfully");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Room Rates by Channel</CardTitle>
            <CardDescription>Configure pricing for different room types and booking channels</CardDescription>
          </div>
          <Button onClick={handleSaveRates} className="ml-auto">
            <Save className="h-4 w-4 mr-2" />
            Save Rates
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Channel</TableHead>
              {roomTypeList.map((roomType) => (
                <TableHead key={roomType.name}>{roomType.name}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookingChannels.map((channel) => (
              <TableRow key={channel}>
                <TableCell className="font-medium">{channel}</TableCell>
                {roomTypeList.map((roomType) => (
                  <TableCell key={`${channel}-${roomType.name}`}>
                    <Input 
                      type="price"
                      value={ratesData[roomType.name]?.[channel] || "0"}
                      onChange={(e) => handleRateChange(roomType.name, channel, e.target.value)}
                      className="max-w-[100px]"
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RatesTable;
