
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Computer } from "lucide-react";

const POSPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">POS System</h1>
            <p className="text-muted-foreground">
              Manage restaurant sales and open tabs
            </p>
          </div>
          <Button>New Order</Button>
        </div>

        <Tabs defaultValue="tables">
          <TabsList>
            <TabsTrigger value="tables">Tables</TabsTrigger>
            <TabsTrigger value="menu">Menu Items</TabsTrigger>
            <TabsTrigger value="tabs">Open Tabs</TabsTrigger>
          </TabsList>
          <TabsContent value="tables" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((table) => (
                <Card key={table} className={`${table % 3 === 0 ? 'bg-green-50' : 'bg-muted'}`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Table {table}</h3>
                      <span className={`text-sm ${table % 3 === 0 ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {table % 3 === 0 ? 'Available' : 'Occupied'}
                      </span>
                    </div>
                    {table % 3 !== 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground">Tab: $45.00</p>
                        <p className="text-xs text-muted-foreground">Opened: 1:30 PM</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="menu" className="mt-4">
            <p>Menu items management will be displayed here.</p>
          </TabsContent>
          <TabsContent value="tabs" className="mt-4">
            <p>Open tabs will be displayed here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default POSPage;
