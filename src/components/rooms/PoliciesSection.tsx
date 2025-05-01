
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PoliciesSection = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Policies</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Policy
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cancellation Policies</CardTitle>
            <CardDescription>Define cancellation rules by channel</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Channel</TableHead>
                  <TableHead>Free Cancel</TableHead>
                  <TableHead>Fee</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Walk-in</TableCell>
                  <TableCell>24 hours</TableCell>
                  <TableCell>1 night</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Booking.com</TableCell>
                  <TableCell>48 hours</TableCell>
                  <TableCell>100%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Expedia</TableCell>
                  <TableCell>48 hours</TableCell>
                  <TableCell>100%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Policies</CardTitle>
            <CardDescription>Define payment rules by channel</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Channel</TableHead>
                  <TableHead>Deposit</TableHead>
                  <TableHead>Payment Due</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Walk-in</TableCell>
                  <TableCell>None</TableCell>
                  <TableCell>On arrival</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Booking.com</TableCell>
                  <TableCell>10%</TableCell>
                  <TableCell>At booking</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Expedia</TableCell>
                  <TableCell>15%</TableCell>
                  <TableCell>At booking</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PoliciesSection;
