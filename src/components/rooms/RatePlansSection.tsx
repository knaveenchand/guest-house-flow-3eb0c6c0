
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import RatesTable from "./RatesTable";

interface RatePlansSectionProps {
  roomTypeList: Array<{
    name: string;
    totalRooms: number;
    description: string;
    color: string;
    roomNumbers: string[];
    amenities: string[];
    maxGuests: number;
  }>;
  bookingChannels: string[];
  ratesData: Record<string, Record<string, string>>;
  handleRateChange: (roomType: string, channel: string, value: string) => void;
  handleAddRatePlan: () => void;
}

const RatePlansSection = ({ 
  roomTypeList, 
  bookingChannels, 
  ratesData, 
  handleRateChange,
  handleAddRatePlan
}: RatePlansSectionProps) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Rates & Channels</h2>
        <Button onClick={handleAddRatePlan}>
          <Plus className="h-4 w-4 mr-2" />
          Add Rate Plan
        </Button>
      </div>
      
      <RatesTable 
        roomTypeList={roomTypeList}
        bookingChannels={bookingChannels}
        ratesData={ratesData}
        handleRateChange={handleRateChange}
      />
    </section>
  );
};

export default RatePlansSection;
