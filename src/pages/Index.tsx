
import Layout from "@/components/layout/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentBookings } from "@/components/dashboard/RecentBookings";
import { RoomOccupancyChart } from "@/components/dashboard/RoomOccupancyChart";
import { UpcomingCheckIns } from "@/components/dashboard/UpcomingCheckIns";
import { BedDouble, CalendarCheck, DollarSign, Users } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your hotel's performance.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Bookings"
            value="128"
            icon={CalendarCheck}
            description="Total bookings this month"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Available Rooms"
            value="7"
            icon={BedDouble}
            description="Out of 30 rooms"
          />
          <StatCard
            title="Revenue"
            value="$12,480"
            icon={DollarSign}
            description="This month's earnings"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="New Guests"
            value="32"
            icon={Users}
            description="New guests this month"
            trend={{ value: 3, isPositive: true }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <RoomOccupancyChart />
          <div className="lg:col-span-2">
            <UpcomingCheckIns />
          </div>
        </div>

        <RecentBookings />
      </div>
    </Layout>
  );
};

export default Index;
