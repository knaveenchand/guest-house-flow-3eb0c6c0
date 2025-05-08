
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Plus, Clipboard, Receipt, Utensils } from "lucide-react";

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
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Plus size={18} />
            <span>Add Stock</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Clipboard size={18} />
            <span>Check Stock</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Receipt size={18} />
            <span>Bill Foto</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Utensils size={18} />
            <span>Kitchen List</span>
          </Button>
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
