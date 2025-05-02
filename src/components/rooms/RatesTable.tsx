
import { Save, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface RatesTableProps {
  roomTypeList: Array<{
    name: string;
    color: string;
  }>;
  bookingChannels: string[];
  ratesData: Record<string, Record<string, string>>;
  handleRateChange: (roomType: string, channel: string, value: string) => void;
}

interface DiscountData {
  [roomType: string]: {
    [channel: string]: {
      percent: string;
      amount: string;
    }
  }
}

const RatesTable = ({ roomTypeList, bookingChannels, ratesData, handleRateChange }: RatesTableProps) => {
  const [discounts, setDiscounts] = useState<DiscountData>(() => {
    // Initialize discount data structure
    const initialDiscounts: DiscountData = {};
    roomTypeList.forEach(room => {
      initialDiscounts[room.name] = {};
      bookingChannels.forEach(channel => {
        initialDiscounts[room.name][channel] = { percent: "0", amount: "0" };
      });
    });
    return initialDiscounts;
  });

  const handleSaveRates = () => {
    // This would save the rates to the backend
    toast.success("Rates have been saved successfully");
  };

  const handleDiscountChange = (
    roomType: string, 
    channel: string, 
    type: "percent" | "amount", 
    value: string
  ) => {
    // Only allow numeric input with optional decimal point
    if (!/^\d*\.?\d*$/.test(value) && value !== '') {
      return;
    }

    setDiscounts(prev => ({
      ...prev,
      [roomType]: {
        ...prev[roomType],
        [channel]: {
          ...prev[roomType][channel],
          [type]: value
        }
      }
    }));
  };

  const incrementDiscount = (
    roomType: string, 
    channel: string, 
    type: "percent" | "amount"
  ) => {
    const currentValue = discounts[roomType]?.[channel]?.[type] || "0";
    const newValue = (parseFloat(currentValue) + 1).toString();
    handleDiscountChange(roomType, channel, type, newValue);
  };

  const decrementDiscount = (
    roomType: string, 
    channel: string, 
    type: "percent" | "amount"
  ) => {
    const currentValue = discounts[roomType]?.[channel]?.[type] || "0";
    const newValue = Math.max(0, parseFloat(currentValue) - 1).toString();
    handleDiscountChange(roomType, channel, type, newValue);
  };

  // Map color names to Tailwind background classes
  const getRoomTypeColor = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-50",
      indigo: "bg-indigo-50",
      purple: "bg-purple-50",
      pink: "bg-pink-50",
      green: "bg-green-50",
      yellow: "bg-yellow-50",
      orange: "bg-orange-50",
      red: "bg-red-50",
      gray: "bg-gray-50",
      cyan: "bg-cyan-50",
      teal: "bg-teal-50",
      lime: "bg-lime-50",
      emerald: "bg-emerald-50",
      sky: "bg-sky-50",
      rose: "bg-rose-50",
      amber: "bg-amber-50",
      violet: "bg-violet-50",
      fuchsia: "bg-fuchsia-50"
    };
    
    return colorMap[color] || "bg-gray-50";
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
                <TableHead key={roomType.name} className="text-center">{roomType.name}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookingChannels.map((channel) => (
              <TableRow key={channel}>
                <TableCell className="font-medium">{channel}</TableCell>
                {roomTypeList.map((roomType) => (
                  <TableCell 
                    key={`${channel}-${roomType.name}`} 
                    className={cn("p-2", getRoomTypeColor(roomType.color))}
                  >
                    <div className="flex items-center justify-between gap-1">
                      {/* Percent discount with improved up/down buttons */}
                      <div className="flex flex-col w-8">
                        <div className="flex relative">
                          <Input 
                            type="text"
                            value={discounts[roomType.name]?.[channel]?.percent || "0"}
                            onChange={(e) => handleDiscountChange(roomType.name, channel, "percent", e.target.value)}
                            className="w-full text-center pr-4 py-0 h-6 text-xs"
                          />
                          <div className="flex flex-col absolute right-0 h-full">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-3 w-3 p-0 hover:bg-transparent" 
                              onClick={() => incrementDiscount(roomType.name, channel, "percent")}
                            >
                              <ArrowUp className="h-2 w-2" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-3 w-3 p-0 hover:bg-transparent" 
                              onClick={() => decrementDiscount(roomType.name, channel, "percent")}
                            >
                              <ArrowDown className="h-2 w-2" />
                            </Button>
                          </div>
                        </div>
                        <span className="text-[8px] text-center text-muted-foreground">%</span>
                      </div>
                      
                      {/* Main rate input */}
                      <div className="flex flex-col">
                        <Input 
                          type="text"
                          value={ratesData[roomType.name]?.[channel] || "0"}
                          onChange={(e) => handleRateChange(roomType.name, channel, e.target.value)}
                          className="max-w-[60px] h-7 text-sm font-medium bg-white dark:bg-gray-800"
                        />
                        <span className="text-[8px] text-center text-muted-foreground">Rate</span>
                      </div>
                      
                      {/* Amount discount with improved up/down buttons */}
                      <div className="flex flex-col w-8">
                        <div className="flex relative">
                          <Input 
                            type="text"
                            value={discounts[roomType.name]?.[channel]?.amount || "0"}
                            onChange={(e) => handleDiscountChange(roomType.name, channel, "amount", e.target.value)}
                            className="w-full text-center pr-4 py-0 h-6 text-xs"
                          />
                          <div className="flex flex-col absolute right-0 h-full">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-3 w-3 p-0 hover:bg-transparent" 
                              onClick={() => incrementDiscount(roomType.name, channel, "amount")}
                            >
                              <ArrowUp className="h-2 w-2" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-3 w-3 p-0 hover:bg-transparent" 
                              onClick={() => decrementDiscount(roomType.name, channel, "amount")}
                            >
                              <ArrowDown className="h-2 w-2" />
                            </Button>
                          </div>
                        </div>
                        <span className="text-[8px] text-center text-muted-foreground">$</span>
                      </div>
                    </div>
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
