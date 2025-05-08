
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Menu, Clock, DollarSign, Printer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const POSSetupPage = () => {
  const [activeTab, setActiveTab] = useState("tables");

  return (
    <Layout>
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="tables">Tables</TabsTrigger>
            <TabsTrigger value="menu">Menu Items</TabsTrigger>
            <TabsTrigger value="general-settings">General Settings</TabsTrigger>
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tables" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  {/* Floor plan editor would go here */}
                  <div className="aspect-video bg-gray-100 rounded-md border border-dashed border-gray-300 mb-4 flex items-center justify-center">
                    <p className="text-gray-500">Table Layout Editor</p>
                  </div>
                  <Link to="/pos/tables">
                    <Button className="w-full">
                      Edit Table Layout
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="menu" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Menu Items</h2>
              <Link to="/pos/menu">
                <Button>
                  <Menu className="mr-2 h-4 w-4" />
                  Manage Menu
                </Button>
              </Link>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <p className="mb-4">
                  Add items for sale into the POS. Manage categories, modifiers, and ingredients with weight or units of measure for cost estimation. Set customer prices and control item visibility.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium">Categories</h3>
                    <p className="text-sm text-muted-foreground">Organize items into categories</p>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium">Ingredients</h3>
                    <p className="text-sm text-muted-foreground">Track costs and inventory</p>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium">Pricing</h3>
                    <p className="text-sm text-muted-foreground">Set prices and discounts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="general-settings" className="space-y-4 mt-4">
            <h2 className="text-xl font-semibold">General Settings</h2>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-lg mb-4">Shifts & Time Clock</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Shifts</h4>
                        <p className="text-sm text-muted-foreground">Track cash that goes in and out of your drawer</p>
                      </div>
                      <Switch id="shifts" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Time clock</h4>
                        <p className="text-sm text-muted-foreground">Track employees' clock in/out time</p>
                      </div>
                      <Switch id="timeclock" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-lg mb-4">Orders & Tickets</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Open tickets</h4>
                        <p className="text-sm text-muted-foreground">Save and edit orders before payment</p>
                      </div>
                      <Switch id="open-tickets" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Kitchen printers & Cash Drawers</h4>
                        <p className="text-sm text-muted-foreground">Send orders to kitchen printer or display</p>
                      </div>
                      <Switch id="kitchen-printers" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Customer displays</h4>
                        <p className="text-sm text-muted-foreground">Display order information to customers</p>
                      </div>
                      <Switch id="customer-displays" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Dining options</h4>
                        <p className="text-sm text-muted-foreground">Mark orders as dine in, takeout or delivery</p>
                      </div>
                      <Switch id="dining-options" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-lg mb-4">Inventory</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Low stock notifications</h4>
                        <p className="text-sm text-muted-foreground">Get daily email on items that are low or out of stock</p>
                      </div>
                      <Switch id="low-stock" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Negative stock alerts</h4>
                        <p className="text-sm text-muted-foreground">Warn cashiers when selling more than available stock</p>
                      </div>
                      <Switch id="negative-stock" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Weight embedded barcodes</h4>
                        <p className="text-sm text-muted-foreground">Scan barcodes with embedded weight</p>
                      </div>
                      <Switch id="weight-barcodes" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="payment-methods" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Payment Methods</h2>
              <Button>
                <span className="mr-2">+</span>
                Add Payment Method
              </Button>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Cash</h3>
                      <p className="text-sm text-muted-foreground">Default payment method</p>
                    </div>
                    <Switch id="cash" defaultChecked />
                  </div>
                  
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Credit Card</h3>
                      <p className="text-sm text-muted-foreground">Visa, Mastercard, etc.</p>
                    </div>
                    <Switch id="card" defaultChecked />
                  </div>
                  
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Mobile Payment</h3>
                      <p className="text-sm text-muted-foreground">Apple Pay, Google Pay, etc.</p>
                    </div>
                    <Switch id="mobile" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default POSSetupPage;
