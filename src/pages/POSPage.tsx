
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

const POSPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sales</h1>
            <p className="text-muted-foreground">
              Manage restaurant sales and open tabs
            </p>
          </div>
          <Button>New Order</Button>
        </div>

        <Tabs defaultValue="menu">
          <TabsList>
            <TabsTrigger value="menu">Menu Items</TabsTrigger>
            <TabsTrigger value="tabs">Open Tabs</TabsTrigger>
          </TabsList>
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
