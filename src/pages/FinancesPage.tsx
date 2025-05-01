
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Download, PieChart, BarChart, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const FinancesPage = () => {
  const expenses = [
    { id: 1, date: "18/04/2025", category: "Wages", total: 2234.00, tax: 0, net: 2234.00, notes: "-" },
    { id: 2, date: "23/04/2025", category: "Cleaning products", total: 154.00, tax: 0, net: 154.00, notes: "-" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Finances</h1>
            <p className="text-muted-foreground">
              Track income, expenses, and financial reports
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline">Income Log</Button>
          <Button variant="destructive">Expense Log</Button>
          <Button variant="outline">Money Tracker</Button>
          <Button variant="outline">Monthly Overview</Button>
          <Button variant="outline">Annual Overview</Button>
          <div className="ml-auto">
            <Button variant="outline" className="mr-2">
              <Download className="h-4 w-4 mr-2" />
              CSV
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Expense Category</TableHead>
                  <TableHead>Total Expense</TableHead>
                  <TableHead>Tax</TableHead>
                  <TableHead>Net Expense</TableHead>
                  <TableHead>Notes/Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>${expense.total.toFixed(2)}</TableCell>
                    <TableCell>${expense.tax.toFixed(2)}</TableCell>
                    <TableCell>${expense.net.toFixed(2)}</TableCell>
                    <TableCell>{expense.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <div className="bg-card p-4 text-right rounded-lg border">
          <span className="font-medium text-lg">You've Spent a Total of $2388.00</span>
        </div>
      </div>
    </Layout>
  );
};

export default FinancesPage;
