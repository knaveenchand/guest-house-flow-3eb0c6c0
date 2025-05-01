
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CheckCircle, User } from "lucide-react";

type Checkin = {
  id: string;
  guestName: string;
  guestInitials: string;
  roomNumber: string;
  checkInTime: string;
  nights: number;
};

const checkins: Checkin[] = [
  {
    id: "CHK1001",
    guestName: "Alice Cooper",
    guestInitials: "AC",
    roomNumber: "205",
    checkInTime: "12:00 PM",
    nights: 3,
  },
  {
    id: "CHK1002",
    guestName: "Bob Smith",
    guestInitials: "BS",
    roomNumber: "310",
    checkInTime: "1:30 PM",
    nights: 2,
  },
  {
    id: "CHK1003",
    guestName: "Carol Davies",
    guestInitials: "CD",
    roomNumber: "107",
    checkInTime: "3:00 PM",
    nights: 5,
  },
];

export function UpcomingCheckIns() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Today's Check-ins</CardTitle>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {checkins.map((checkin) => (
            <div key={checkin.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{checkin.guestInitials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{checkin.guestName}</div>
                  <div className="text-sm text-muted-foreground">
                    Room {checkin.roomNumber} • {checkin.nights} {checkin.nights === 1 ? 'night' : 'nights'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium">{checkin.checkInTime}</div>
                  <div className="text-xs text-muted-foreground">Check-in time</div>
                </div>
                <Button variant="outline" size="icon" className="rounded-full">
                  <CheckCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
