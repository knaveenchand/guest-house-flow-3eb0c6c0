
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package } from "lucide-react";

const POSInventoryPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
            <p className="text-muted-foreground">
              Manage stock levels and inventory items
            </p>
          </div>
          <Button>Add Inventory Item</Button>
        </div>

        <Tabs defaultValue="current">
          <TabsList>
            <TabsTrigger value="current">Current Stock</TabsTrigger>
            <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
            <TabsTrigger value="history">Stock History</TabsTrigger>
          </TabsList>
          <TabsContent value="current" className="mt-4">
            <p>Current inventory levels will be displayed here.</p>
          </TabsContent>
          <TabsContent value="orders" className="mt-4">
            <p>Purchase orders will be displayed here.</p>
          </TabsContent>
          <TabsContent value="history" className="mt-4">
            <p>Stock history and movement will be displayed here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default POSInventoryPage;
