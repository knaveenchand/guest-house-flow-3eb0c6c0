
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DollarSign, PieChart, Receipt, CreditCard, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const FinancesSetupPage = () => {
  const [activeTab, setActiveTab] = useState("categories");
  const [activeCategorySection, setActiveCategorySection] = useState("income");

  return (
    <Layout>
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="tax-settings">Tax Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="categories" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Financial Categories</h2>
              <Button>
                <span className="mr-2">+</span>
                Add Category
              </Button>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                {/* Horizontal Toggle Group for Category Sections */}
                <div className="mb-6 overflow-x-auto pb-2">
                  <ToggleGroup 
                    type="single"
                    value={activeCategorySection}
                    onValueChange={(value) => value && setActiveCategorySection(value)} 
                    className="flex flex-wrap gap-2"
                    variant="outline"
                  >
                    <ToggleGroupItem 
                      value="income" 
                      className={`flex items-center gap-2 ${activeCategorySection === "income" ? "bg-blue-500 text-white hover:bg-blue-600" : ""}`}
                    >
                      <DollarSign className="h-4 w-4" />
                      <span>Income</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="expenses" 
                      className={`flex items-center gap-2 ${activeCategorySection === "expenses" ? "bg-blue-500 text-white hover:bg-blue-600" : ""}`}
                    >
                      <CreditCard className="h-4 w-4" />
                      <span>Expenses</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="taxes" 
                      className={`flex items-center gap-2 ${activeCategorySection === "taxes" ? "bg-blue-500 text-white hover:bg-blue-600" : ""}`}
                    >
                      <Receipt className="h-4 w-4" />
                      <span>Taxes</span>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                {/* Content based on selected section */}
                {activeCategorySection === "income" && (
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Income Categories</h3>
                      <Button size="sm" variant="outline">Add Income Category</Button>
                    </div>
                    <div className="space-y-2">
                      <div className="p-3 border rounded flex items-center justify-between">
                        <span>Accommodation</span>
                        <Tag className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="p-3 border rounded flex items-center justify-between">
                        <span>Food & Beverage</span>
                        <Tag className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="p-3 border rounded flex items-center justify-between">
                        <span>Additional Services</span>
                        <Tag className="h-4 w-4 text-purple-500" />
                      </div>
                    </div>
                  </div>
                )}

                {activeCategorySection === "expenses" && (
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Expense Categories</h3>
                      <Button size="sm" variant="outline">Add Expense Category</Button>
                    </div>
                    <div className="space-y-2">
                      <div className="p-3 border rounded flex items-center justify-between">
                        <span>Utilities</span>
                        <Tag className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="p-3 border rounded flex items-center justify-between">
                        <span>Maintenance</span>
                        <Tag className="h-4 w-4 text-yellow-500" />
                      </div>
                      <div className="p-3 border rounded flex items-center justify-between">
                        <span>Staff</span>
                        <Tag className="h-4 w-4 text-orange-500" />
                      </div>
                    </div>
                  </div>
                )}

                {activeCategorySection === "taxes" && (
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Tax Categories</h3>
                      <Button size="sm" variant="outline">Add Tax Category</Button>
                    </div>
                    <div className="space-y-2">
                      <div className="p-3 border rounded flex items-center justify-between">
                        <span>VAT</span>
                        <div className="text-sm font-medium">19%</div>
                      </div>
                      <div className="p-3 border rounded flex items-center justify-between">
                        <span>City Tax</span>
                        <div className="text-sm font-medium">5%</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="accounts" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Financial Accounts</h2>
              <Button>
                <span className="mr-2">+</span>
                Add Account
              </Button>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Main Account</h3>
                        <p className="text-sm text-muted-foreground">Primary business account</p>
                      </div>
                      <div className="font-semibold">$24,500.00</div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Reserve Account</h3>
                        <p className="text-sm text-muted-foreground">Savings for future investments</p>
                      </div>
                      <div className="font-semibold">$15,750.00</div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Tax Account</h3>
                        <p className="text-sm text-muted-foreground">Reserved for tax payments</p>
                      </div>
                      <div className="font-semibold">$8,320.00</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                      <p className="text-sm text-muted-foreground">Physical currency</p>
                    </div>
                    <Switch id="cash-finance" defaultChecked />
                  </div>
                  
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Credit Card</h3>
                      <p className="text-sm text-muted-foreground">Visa, Mastercard, etc.</p>
                    </div>
                    <Switch id="card-finance" defaultChecked />
                  </div>
                  
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Bank Transfer</h3>
                      <p className="text-sm text-muted-foreground">Direct bank transfers</p>
                    </div>
                    <Switch id="transfer-finance" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tax-settings" className="space-y-4 mt-4">
            <h2 className="text-xl font-semibold">Tax Settings</h2>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">VAT Configuration</h4>
                      <p className="text-sm text-muted-foreground">Set VAT rates for different product categories</p>
                    </div>
                    <Button size="sm" variant="outline">Configure</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Tax Reports</h4>
                      <p className="text-sm text-muted-foreground">Generate tax reports for specified periods</p>
                    </div>
                    <Button size="sm" variant="outline">Generate</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Automatic Tax Calculation</h4>
                      <p className="text-sm text-muted-foreground">Calculate taxes automatically at checkout</p>
                    </div>
                    <Switch id="auto-tax" defaultChecked />
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

export default FinancesSetupPage;

