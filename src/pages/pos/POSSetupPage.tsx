
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Menu, Clock, DollarSign, Printer, FileText, SlidersHorizontal, Wheat, Percent, ArrowLeft, Eye, Edit, Trash2, PlusCircle, Color, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const POSSetupPage = () => {
  const [activeTab, setActiveTab] = useState("tables");
  const [activeMenuSection, setActiveMenuSection] = useState("categories");
  
  // Sample category data with colors and icons
  const categories = [
    { id: 1, name: "Breakfast", color: "#22c55e", icon: "Coffee", items: 15 },
    { id: 2, name: "Lunch", color: "#f97316", icon: "Pizza", items: 22 },
    { id: 3, name: "Drinks", color: "#0ea5e9", icon: "Beer", items: 18 }
  ];
  
  // Available colors for selector
  const colorOptions = [
    { value: "#22c55e", label: "Green" },
    { value: "#f97316", label: "Orange" },
    { value: "#0ea5e9", label: "Blue" },
    { value: "#8b5cf6", label: "Purple" },
    { value: "#ec4899", label: "Pink" },
    { value: "#ef4444", label: "Red" }
  ];
  
  // Available icons for selector
  const iconOptions = [
    { value: "Coffee", label: "Coffee" },
    { value: "Pizza", label: "Pizza" },
    { value: "Beer", label: "Beer" },
    { value: "Wheat", label: "Wheat" },
    { value: "Clock", label: "Clock" }
  ];

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
            <Card>
              <CardContent className="pt-6">
                {/* Horizontal Toggle Group for Menu Sections */}
                <div className="mb-6 overflow-x-auto pb-2">
                  <ToggleGroup 
                    type="single"
                    value={activeMenuSection}
                    onValueChange={(value) => value && setActiveMenuSection(value)} 
                    className="flex flex-wrap gap-2"
                    variant="outline"
                  >
                    <ToggleGroupItem 
                      value="categories" 
                      className={`flex items-center gap-2 ${activeMenuSection === "categories" ? "bg-green-500 text-white hover:bg-green-600" : ""}`}
                    >
                      <Menu className="h-4 w-4" />
                      <span>Categories</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="items" 
                      className={`flex items-center gap-2 ${activeMenuSection === "items" ? "bg-green-500 text-white hover:bg-green-600" : ""}`}
                    >
                      <FileText className="h-4 w-4" />
                      <span>Items</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="modifiers" 
                      className={`flex items-center gap-2 ${activeMenuSection === "modifiers" ? "bg-green-500 text-white hover:bg-green-600" : ""}`}
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                      <span>Modifiers</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="ingredients" 
                      className={`flex items-center gap-2 ${activeMenuSection === "ingredients" ? "bg-green-500 text-white hover:bg-green-600" : ""}`}
                    >
                      <Wheat className="h-4 w-4" />
                      <span>Ingredients</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="discounts" 
                      className={`flex items-center gap-2 ${activeMenuSection === "discounts" ? "bg-green-500 text-white hover:bg-green-600" : ""}`}
                    >
                      <Percent className="h-4 w-4" />
                      <span>Discounts</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="refunds" 
                      className={`flex items-center gap-2 ${activeMenuSection === "refunds" ? "bg-green-500 text-white hover:bg-green-600" : ""}`}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Refunds</span>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                {/* Content based on selected section */}
                {activeMenuSection === "categories" && (
                  <div className="p-4 border rounded-md bg-green-50">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Categories</h3>
                      <Button size="sm" variant="outline">Add Category</Button>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Color</TableHead>
                          <TableHead>Icon</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Visible</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {categories.map((category) => (
                          <TableRow key={category.id}>
                            <TableCell className="font-medium">{category.name}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Circle className="h-4 w-4" fill={category.color} color={category.color} />
                                <Select defaultValue={category.color}>
                                  <SelectTrigger className="w-[100px]">
                                    <SelectValue placeholder="Color" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {colorOptions.map((color) => (
                                      <SelectItem key={color.value} value={color.value}>
                                        <div className="flex items-center gap-2">
                                          <Circle className="h-3 w-3" fill={color.value} color={color.value} />
                                          <span>{color.label}</span>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Select defaultValue={category.icon}>
                                <SelectTrigger className="w-[100px]">
                                  <SelectValue placeholder="Icon" />
                                </SelectTrigger>
                                <SelectContent>
                                  {iconOptions.map((icon) => (
                                    <SelectItem key={icon.value} value={icon.value}>
                                      {icon.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>{category.items}</TableCell>
                            <TableCell>
                              <Switch id={`visible-${category.id}`} defaultChecked />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="ghost">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    <Button className="mt-4 w-full" variant="outline">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add New Category
                    </Button>
                  </div>
                )}

                {activeMenuSection === "items" && (
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Items</h3>
                      <Button size="sm" variant="outline">Add Item</Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Manage individual menu items with pricing</p>
                    <div className="mt-4 flex items-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm">Item Visibility</span>
                      <Switch id="item-visibility" />
                    </div>
                  </div>
                )}

                {activeMenuSection === "modifiers" && (
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Modifiers</h3>
                      <Button size="sm" variant="outline">Add Modifier</Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Add options that modify menu items</p>
                  </div>
                )}

                {activeMenuSection === "ingredients" && (
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Ingredients</h3>
                      <Button size="sm" variant="outline">Add Ingredient</Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Manage ingredients with units of measure for cost tracking</p>
                  </div>
                )}

                {activeMenuSection === "discounts" && (
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Discounts</h3>
                      <Button size="sm" variant="outline">Add Discount</Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Configure promotional discounts</p>
                  </div>
                )}

                {activeMenuSection === "refunds" && (
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Refunds</h3>
                      <Button size="sm" variant="outline">Refund Settings</Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Manage refund policies and procedures</p>
                  </div>
                )}
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
                        <p className="text-sm text-muted-foreground">Allow to save and edit orders before payment</p>
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
