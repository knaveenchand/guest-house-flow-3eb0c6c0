
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Settings, Menu } from "lucide-react";

const POSSetupPage = () => {
  const [activeTab, setActiveTab] = useState("tables");

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">POS Settings</h1>
            <p className="text-muted-foreground">
              Configure POS settings, tables, menu items, and more
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="tables">Tables</TabsTrigger>
            <TabsTrigger value="menu">Menu Items</TabsTrigger>
            <TabsTrigger value="modifiers">Modifiers</TabsTrigger>
            <TabsTrigger value="user-profiles">User Profiles</TabsTrigger>
            <TabsTrigger value="general-settings">General Settings</TabsTrigger>
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="printers">Printers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tables" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Tables Management</h2>
              <Link to="/pos/tables">
                <Button>
                  <Settings className="mr-2 h-4 w-4" />
                  Visual Table Layout
                </Button>
              </Link>
            </div>
            <p className="text-muted-foreground">
              Manage your restaurant tables and their layout.
            </p>
            {/* Tables management content */}
          </TabsContent>
          
          <TabsContent value="menu" className="space-y-4 mt-4">
            {/* Menu items content */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Menu Items</h2>
              <Link to="/pos/menu">
                <Button>
                  <Menu className="mr-2 h-4 w-4" />
                  Manage Menu
                </Button>
              </Link>
            </div>
            <p className="text-muted-foreground">
              Manage your menu categories and items.
            </p>
          </TabsContent>
          
          <TabsContent value="modifiers" className="space-y-4 mt-4">
            {/* Modifiers content */}
            <h2 className="text-xl font-semibold">Modifiers</h2>
            <p className="text-muted-foreground">
              Manage your menu item modifiers.
            </p>
          </TabsContent>
          
          <TabsContent value="user-profiles" className="space-y-4 mt-4">
            {/* User profiles content */}
            <h2 className="text-xl font-semibold">User Profiles</h2>
            <p className="text-muted-foreground">
              Manage user access and permissions.
            </p>
          </TabsContent>
          
          <TabsContent value="general-settings" className="space-y-4 mt-4">
            {/* General settings content */}
            <h2 className="text-xl font-semibold">General Settings</h2>
            <p className="text-muted-foreground">
              Configure general POS settings.
            </p>
          </TabsContent>
          
          <TabsContent value="payment-methods" className="space-y-4 mt-4">
            {/* Payment methods content */}
            <h2 className="text-xl font-semibold">Payment Methods</h2>
            <p className="text-muted-foreground">
              Manage payment methods for your POS system.
            </p>
          </TabsContent>
          
          <TabsContent value="printers" className="space-y-4 mt-4">
            {/* Printers content */}
            <h2 className="text-xl font-semibold">Printers</h2>
            <p className="text-muted-foreground">
              Configure receipt and kitchen printers.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default POSSetupPage;
