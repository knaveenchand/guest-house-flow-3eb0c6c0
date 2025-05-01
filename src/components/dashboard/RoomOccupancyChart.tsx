
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Occupied", value: 18, color: "#1E40AF" },
  { name: "Available", value: 7, color: "#60A5FA" },
  { name: "Under Maintenance", value: 2, color: "#E5E7EB" },
  { name: "Reserved", value: 3, color: "#F59E0B" },
];

export function RoomOccupancyChart() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Room Occupancy</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} Rooms`, ""]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
