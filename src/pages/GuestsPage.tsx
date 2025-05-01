
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Search, User } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Guest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  visits: number;
  lastStay: string;
};

const guests: Guest[] = [
  {
    id: "G001",
    name: "Michael Johnson",
    email: "michael@example.com",
    phone: "+1-202-555-0167",
    visits: 3,
    lastStay: "2025-04-15",
  },
  {
    id: "G002",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "+1-202-555-0231",
    visits: 1,
    lastStay: "2025-05-03",
  },
  {
    id: "G003",
    name: "Robert Brown",
    email: "robert@example.com",
    phone: "+1-202-555-0198",
    visits: 5,
    lastStay: "2025-05-01",
  },
  {
    id: "G004",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "+1-202-555-0143",
    visits: 2,
    lastStay: "2025-03-22",
  },
  {
    id: "G005",
    name: "David Wilson",
    email: "david@example.com",
    phone: "+1-202-555-0187",
    visits: 7,
    lastStay: "2025-04-28",
  },
  {
    id: "G006",
    name: "Jennifer Taylor",
    email: "jennifer@example.com",
    phone: "+1-202-555-0122",
    visits: 4,
    lastStay: "2025-02-15",
  },
];

const GuestsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Guests</h1>
            <p className="text-muted-foreground">
              Manage guest information and history
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Guest
          </Button>
        </div>

        <div className="flex items-center gap-2 w-full max-w-sm">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search guests..."
            className="flex-1"
          />
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Visits</TableHead>
                  <TableHead>Last Stay</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {guests.map((guest) => (
                  <TableRow key={guest.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {guest.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{guest.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{guest.email}</TableCell>
                    <TableCell>{guest.phone}</TableCell>
                    <TableCell>{guest.visits}</TableCell>
                    <TableCell>{guest.lastStay}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default GuestsPage;
