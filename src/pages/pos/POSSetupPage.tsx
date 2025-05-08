import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { User, UserCog, Cog, UserPlus, Plus, Pencil, List, ListPlus, ListMinus } from "lucide-react";

type UserProfile = {
  id: string;
  name: string;
  role: "Owner" | "General Manager" | "F&B Manager" | "Staff";
  permissions: string[];
  pin: string;
  active: boolean;
}

// Example user profiles
const initialUserProfiles: UserProfile[] = [
  {
    id: "1",
    name: "John Smith",
    role: "Owner",
    permissions: ["manage_users", "view_reports", "manage_inventory", "modify_menu", "process_payments", "void_transactions", "apply_discounts", "manage_tables"],
    pin: "1234",
    active: true
  },
  {
    id: "2",
    name: "Sarah Johnson",
    role: "General Manager",
    permissions: ["view_reports", "manage_inventory", "modify_menu", "process_payments", "void_transactions", "apply_discounts", "manage_tables"],
    pin: "2345",
    active: true
  },
  {
    id: "3",
    name: "Michael Lee",
    role: "F&B Manager",
    permissions: ["view_reports", "manage_inventory", "modify_menu", "process_payments", "apply_discounts", "manage_tables"],
    pin: "3456",
    active: true
  },
  {
    id: "4",
    name: "Lisa Garcia",
    role: "Staff",
    permissions: ["process_payments", "manage_tables"],
    pin: "4567",
    active: true
  }
];

const roleColors = {
  "Owner": "bg-purple-100 border-purple-300 text-purple-800",
  "General Manager": "bg-blue-100 border-blue-300 text-blue-800",
  "F&B Manager": "bg-green-100 border-green-300 text-green-800",
  "Staff": "bg-yellow-100 border-yellow-300 text-yellow-800"
};

const permissionLabels = {
  "manage_users": "Manage Users",
  "view_reports": "View Reports",
  "manage_inventory": "Manage Inventory",
  "modify_menu": "Modify Menu",
  "process_payments": "Process Payments",
  "void_transactions": "Void Transactions",
  "apply_discounts": "Apply Discounts",
  "manage_tables": "Manage Tables"
};

// Menu related types
type Category = {
  id: string;
  name: string;
  position: number;
}

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  modifierGroups: string[];
  active: boolean;
}

type ModifierGroup = {
  id: string;
  name: string;
  required: boolean;
  multiSelect: boolean;
  options: ModifierOption[];
}

type ModifierOption = {
  id: string;
  name: string;
  price: number;
}

// Sample data for menu management
const initialCategories: Category[] = [
  { id: "1", name: "Appetizers", position: 1 },
  { id: "2", name: "Main Course", position: 2 },
  { id: "3", name: "Desserts", position: 3 },
  { id: "4", name: "Drinks", position: 4 },
];

const initialModifierGroups: ModifierGroup[] = [
  {
    id: "1",
    name: "Cooking Preference",
    required: true,
    multiSelect: false,
    options: [
      { id: "1", name: "Rare", price: 0 },
      { id: "2", name: "Medium", price: 0 },
      { id: "3", name: "Well Done", price: 0 },
    ]
  },
  {
    id: "2",
    name: "Add Extras",
    required: false,
    multiSelect: true,
    options: [
      { id: "1", name: "Extra Cheese", price: 1.5 },
      { id: "2", name: "Bacon", price: 2.0 },
      { id: "3", name: "Mushrooms", price: 1.0 },
    ]
  },
];

const initialMenuItems: MenuItem[] = [
  { 
    id: "1", 
    name: "House Salad", 
    description: "Fresh mixed greens with house dressing", 
    price: 7.99, 
    categoryId: "1", 
    modifierGroups: [], 
    active: true 
  },
  { 
    id: "2", 
    name: "Steak", 
    description: "8oz Sirloin", 
    price: 24.99, 
    categoryId: "2", 
    modifierGroups: ["1", "2"], 
    active: true 
  },
  { 
    id: "3", 
    name: "Chocolate Cake", 
    description: "Homemade chocolate cake", 
    price: 6.99, 
    categoryId: "3", 
    modifierGroups: [], 
    active: true 
  },
];

const POSSetupPage = () => {
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>(initialUserProfiles);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  const form = useForm<{
    name: string;
    role: UserProfile["role"];
    pin: string;
    permissions: string[];
  }>({
    defaultValues: {
      name: "",
      role: "Staff",
      pin: "",
      permissions: ["process_payments", "manage_tables"]
    }
  });

  const handleAddUser = () => {
    setIsAddingUser(true);
    setSelectedUser(null);
    form.reset({
      name: "",
      role: "Staff",
      pin: "",
      permissions: ["process_payments", "manage_tables"]
    });
  };

  const handleEditUser = (user: UserProfile) => {
    setSelectedUser(user);
    setIsAddingUser(true);
    form.reset({
      name: user.name,
      role: user.role,
      pin: user.pin,
      permissions: user.permissions
    });
  };

  const handleSaveUser = (data: any) => {
    if (selectedUser) {
      // Edit existing user
      setUserProfiles(userProfiles.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...data }
          : user
      ));
    } else {
      // Add new user
      setUserProfiles([
        ...userProfiles,
        {
          id: Math.random().toString(36).substr(2, 9),
          ...data,
          active: true
        }
      ]);
    }
    setIsAddingUser(false);
    setSelectedUser(null);
  };

  const handleToggleActive = (id: string) => {
    setUserProfiles(userProfiles.map(user => 
      user.id === id 
        ? { ...user, active: !user.active }
        : user
    ));
  };

  // Menu management states
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [modifierGroups, setModifierGroups] = useState<ModifierGroup[]>(initialModifierGroups);
  
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  const [isAddingMenuItem, setIsAddingMenuItem] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  
  const [isAddingModifier, setIsAddingModifier] = useState(false);
  const [selectedModifier, setSelectedModifier] = useState<ModifierGroup | null>(null);
  const [isAddingModifierOption, setIsAddingModifierOption] = useState(false);
  const [selectedModifierOption, setSelectedModifierOption] = useState<ModifierOption | null>(null);

  // Category form
  const categoryForm = useForm<{
    name: string;
    position: number;
  }>({
    defaultValues: {
      name: "",
      position: categories.length + 1
    }
  });

  // Menu item form
  const menuItemForm = useForm<{
    name: string;
    description: string;
    price: number;
    categoryId: string;
    modifierGroups: string[];
  }>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: categories.length > 0 ? categories[0].id : "",
      modifierGroups: [],
    }
  });

  // Modifier group form
  const modifierGroupForm = useForm<{
    name: string;
    required: boolean;
    multiSelect: boolean;
  }>({
    defaultValues: {
      name: "",
      required: false,
      multiSelect: false,
    }
  });

  // Modifier option form
  const modifierOptionForm = useForm<{
    name: string;
    price: number;
  }>({
    defaultValues: {
      name: "",
      price: 0,
    }
  });

  // Category handlers
  const handleAddCategory = () => {
    setIsAddingCategory(true);
    setSelectedCategory(null);
    categoryForm.reset({
      name: "",
      position: categories.length + 1
    });
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsAddingCategory(true);
    categoryForm.reset({
      name: category.name,
      position: category.position
    });
  };

  const handleSaveCategory = (data: any) => {
    if (selectedCategory) {
      // Edit existing category
      setCategories(categories.map(cat => 
        cat.id === selectedCategory.id 
          ? { ...cat, ...data }
          : cat
      ));
    } else {
      // Add new category
      setCategories([
        ...categories,
        {
          id: Math.random().toString(36).substr(2, 9),
          ...data
        }
      ]);
    }
    setIsAddingCategory(false);
    setSelectedCategory(null);
  };

  // Menu item handlers
  const handleAddMenuItem = () => {
    setIsAddingMenuItem(true);
    setSelectedMenuItem(null);
    menuItemForm.reset({
      name: "",
      description: "",
      price: 0,
      categoryId: categories.length > 0 ? categories[0].id : "",
      modifierGroups: [],
    });
  };

  const handleEditMenuItem = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setIsAddingMenuItem(true);
    menuItemForm.reset({
      name: item.name,
      description: item.description,
      price: item.price,
      categoryId: item.categoryId,
      modifierGroups: item.modifierGroups,
    });
  };

  const handleSaveMenuItem = (data: any) => {
    if (selectedMenuItem) {
      // Edit existing item
      setMenuItems(menuItems.map(item => 
        item.id === selectedMenuItem.id 
          ? { ...item, ...data, active: true }
          : item
      ));
    } else {
      // Add new item
      setMenuItems([
        ...menuItems,
        {
          id: Math.random().toString(36).substr(2, 9),
          ...data,
          active: true
        }
      ]);
    }
    setIsAddingMenuItem(false);
    setSelectedMenuItem(null);
  };

  const toggleItemActive = (id: string) => {
    setMenuItems(menuItems.map(item => 
      item.id === id 
        ? { ...item, active: !item.active }
        : item
    ));
  };

  // Modifier handlers
  const handleAddModifier = () => {
    setIsAddingModifier(true);
    setSelectedModifier(null);
    modifierGroupForm.reset({
      name: "",
      required: false,
      multiSelect: false,
    });
  };

  const handleEditModifier = (modifier: ModifierGroup) => {
    setSelectedModifier(modifier);
    setIsAddingModifier(true);
    modifierGroupForm.reset({
      name: modifier.name,
      required: modifier.required,
      multiSelect: modifier.multiSelect,
    });
  };

  const handleSaveModifier = (data: any) => {
    if (selectedModifier) {
      // Edit existing modifier
      setModifierGroups(modifierGroups.map(mod => 
        mod.id === selectedModifier.id 
          ? { ...mod, ...data, options: mod.options }
          : mod
      ));
    } else {
      // Add new modifier
      setModifierGroups([
        ...modifierGroups,
        {
          id: Math.random().toString(36).substr(2, 9),
          ...data,
          options: []
        }
      ]);
    }
    setIsAddingModifier(false);
    setSelectedModifier(null);
  };

  // Modifier option handlers
  const handleAddModifierOption = (modifier: ModifierGroup) => {
    setSelectedModifier(modifier);
    setIsAddingModifierOption(true);
    setSelectedModifierOption(null);
    modifierOptionForm.reset({
      name: "",
      price: 0,
    });
  };

  const handleEditModifierOption = (modifier: ModifierGroup, option: ModifierOption) => {
    setSelectedModifier(modifier);
    setIsAddingModifierOption(true);
    setSelectedModifierOption(option);
    modifierOptionForm.reset({
      name: option.name,
      price: option.price,
    });
  };

  const handleSaveModifierOption = (data: any) => {
    if (!selectedModifier) return;
    
    const updatedModifierGroups = [...modifierGroups];
    const modifierIndex = updatedModifierGroups.findIndex(mod => mod.id === selectedModifier.id);
    
    if (modifierIndex === -1) return;
    
    if (selectedModifierOption) {
      // Edit existing option
      const updatedOptions = selectedModifier.options.map(opt => 
        opt.id === selectedModifierOption.id 
          ? { ...opt, ...data }
          : opt
      );
      updatedModifierGroups[modifierIndex] = {
        ...selectedModifier,
        options: updatedOptions
      };
    } else {
      // Add new option
      updatedModifierGroups[modifierIndex] = {
        ...selectedModifier,
        options: [
          ...selectedModifier.options,
          {
            id: Math.random().toString(36).substr(2, 9),
            ...data
          }
        ]
      };
    }
    
    setModifierGroups(updatedModifierGroups);
    setIsAddingModifierOption(false);
    setSelectedModifierOption(null);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">POS Setup</h1>
          <p className="text-muted-foreground">Configure POS settings, user permissions, and other options.</p>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="users">User Profiles</TabsTrigger>
            <TabsTrigger value="menu">Menu Items</TabsTrigger>
            <TabsTrigger value="modifiers">Modifiers</TabsTrigger>
            <TabsTrigger value="general">General Settings</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
            <TabsTrigger value="printers">Printers</TabsTrigger>
          </TabsList>

          {/* Users Tab Content */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>User Profiles</CardTitle>
                  <CardDescription>Manage staff access and permissions.</CardDescription>
                </div>
                {!isAddingUser && (
                  <Button onClick={handleAddUser}><UserPlus className="h-4 w-4 mr-2" /> Add User</Button>
                )}
              </CardHeader>
              <CardContent>
                {isAddingUser ? (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSaveUser)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Full Name" />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                              <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                {...field}
                              >
                                <option value="Owner">Owner</option>
                                <option value="General Manager">General Manager</option>
                                <option value="F&B Manager">F&B Manager</option>
                                <option value="Staff">Staff</option>
                              </select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="pin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>PIN</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="password" 
                                placeholder="4-digit PIN"
                                maxLength={4}
                              />
                            </FormControl>
                            <FormDescription>4-digit code for logging into POS</FormDescription>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="permissions"
                        render={() => (
                          <FormItem>
                            <FormLabel>Permissions</FormLabel>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                              {Object.entries(permissionLabels).map(([key, label]) => (
                                <div key={key} className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id={key}
                                    checked={form.watch("permissions").includes(key)}
                                    onChange={(e) => {
                                      const permissions = form.watch("permissions");
                                      if (e.target.checked) {
                                        form.setValue("permissions", [...permissions, key]);
                                      } else {
                                        form.setValue("permissions", permissions.filter(p => p !== key));
                                      }
                                    }}
                                    className="rounded border-gray-300"
                                  />
                                  <label htmlFor={key} className="text-sm">{label}</label>
                                </div>
                              ))}
                            </div>
                          </FormItem>
                        )}
                      />

                      <div className="flex gap-2">
                        <Button type="submit">{selectedUser ? 'Update User' : 'Add User'}</Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => {
                            setIsAddingUser(false);
                            setSelectedUser(null);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>PIN</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userProfiles.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>
                            <span className={`text-xs px-2 py-1 rounded-md border ${roleColors[user.role]}`}>
                              {user.role}
                            </span>
                          </TableCell>
                          <TableCell>••••</TableCell>
                          <TableCell>
                            <span className={`text-xs px-2 py-1 rounded-md ${user.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                              {user.active ? 'Active' : 'Inactive'}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleEditUser(user)}
                              >
                                <UserCog className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleToggleActive(user.id)}
                              >
                                <User className={`h-4 w-4 ${!user.active ? 'opacity-50' : ''}`} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Menu Items Tab Content */}
          <TabsContent value="menu" className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Categories Section */}
              <Card className="flex-1">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Categories</CardTitle>
                    <CardDescription>Organize menu items into categories</CardDescription>
                  </div>
                  {!isAddingCategory && (
                    <Button onClick={handleAddCategory}><Plus className="h-4 w-4 mr-2" /> Add Category</Button>
                  )}
                </CardHeader>
                <CardContent>
                  {isAddingCategory ? (
                    <Form {...categoryForm}>
                      <form onSubmit={categoryForm.handleSubmit(handleSaveCategory)} className="space-y-4">
                        <FormField
                          control={categoryForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category Name</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="e.g. Appetizers" />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={categoryForm.control}
                          name="position"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Display Order</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  {...field} 
                                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                                  min={1}
                                />
                              </FormControl>
                              <FormDescription>Order in which category appears</FormDescription>
                            </FormItem>
                          )}
                        />

                        <div className="flex gap-2">
                          <Button type="submit">{selectedCategory ? 'Update Category' : 'Add Category'}</Button>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => {
                              setIsAddingCategory(false);
                              setSelectedCategory(null);
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </Form>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order</TableHead>
                          <TableHead>Category Name</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {categories.sort((a, b) => a.position - b.position).map((category) => (
                          <TableRow key={category.id}>
                            <TableCell>{category.position}</TableCell>
                            <TableCell className="font-medium">{category.name}</TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleEditCategory(category)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>

              {/* Menu Items Section */}
              <Card className="flex-1">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Menu Items</CardTitle>
                    <CardDescription>Add and manage menu items</CardDescription>
                  </div>
                  {!isAddingMenuItem && (
                    <Button onClick={handleAddMenuItem}><Plus className="h-4 w-4 mr-2" /> Add Item</Button>
                  )}
                </CardHeader>
                <CardContent>
                  {isAddingMenuItem ? (
                    <Form {...menuItemForm}>
                      <form onSubmit={menuItemForm.handleSubmit(handleSaveMenuItem)} className="space-y-4">
                        <FormField
                          control={menuItemForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Item Name</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="e.g. House Salad" />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={menuItemForm.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Brief description" />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={menuItemForm.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price</FormLabel>
                              <FormControl>
                                <Input 
                                  type="price" 
                                  {...field} 
                                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={menuItemForm.control}
                          name="categoryId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <FormControl>
                                <select
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                  {...field}
                                >
                                  {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                      {category.name}
                                    </option>
                                  ))}
                                </select>
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={menuItemForm.control}
                          name="modifierGroups"
                          render={() => (
                            <FormItem>
                              <FormLabel>Modifiers</FormLabel>
                              <div className="space-y-2">
                                {modifierGroups.map((modifier) => (
                                  <div key={modifier.id} className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      id={`modifier-${modifier.id}`}
                                      checked={menuItemForm.watch("modifierGroups").includes(modifier.id)}
                                      onChange={(e) => {
                                        const modifiers = menuItemForm.watch("modifierGroups");
                                        if (e.target.checked) {
                                          menuItemForm.setValue("modifierGroups", [...modifiers, modifier.id]);
                                        } else {
                                          menuItemForm.setValue("modifierGroups", modifiers.filter(id => id !== modifier.id));
                                        }
                                      }}
                                      className="rounded border-gray-300"
                                    />
                                    <label htmlFor={`modifier-${modifier.id}`} className="text-sm">{modifier.name}</label>
                                  </div>
                                ))}
                              </div>
                            </FormItem>
                          )}
                        />

                        <div className="flex gap-2">
                          <Button type="submit">{selectedMenuItem ? 'Update Item' : 'Add Item'}</Button>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => {
                              setIsAddingMenuItem(false);
                              setSelectedMenuItem(null);
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </Form>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {menuItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>${item.price.toFixed(2)}</TableCell>
                            <TableCell>{categories.find(c => c.id === item.categoryId)?.name || "Uncategorized"}</TableCell>
                            <TableCell>
                              <span className={`text-xs px-2 py-1 rounded-md ${item.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {item.active ? 'Active' : 'Inactive'}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleEditMenuItem(item)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => toggleItemActive(item.id)}
                                >
                                  {item.active ? <ListMinus className="h-4 w-4" /> : <ListPlus className="h-4 w-4" />}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Modifiers Tab Content */}
          <TabsContent value="modifiers" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Modifier Groups</CardTitle>
                  <CardDescription>Manage item options and modifiers</CardDescription>
                </div>
                {!isAddingModifier && (
                  <Button onClick={handleAddModifier}><Plus className="h-4 w-4 mr-2" /> Add Modifier Group</Button>
                )}
              </CardHeader>
              <CardContent>
                {isAddingModifier ? (
                  <Form {...modifierGroupForm}>
                    <form onSubmit={modifierGroupForm.handleSubmit(handleSaveModifier)} className="space-y-4">
                      <FormField
                        control={modifierGroupForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Modifier Group Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g. Cooking Preference" />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={modifierGroupForm.control}
                          name="required"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="rounded border-gray-300"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Required Selection</FormLabel>
                                <FormDescription>
                                  Customer must select an option
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={modifierGroupForm.control}
                          name="multiSelect"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="rounded border-gray-300"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Allow Multiple</FormLabel>
                                <FormDescription>
                                  Allow selecting multiple options
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button type="submit">{selectedModifier ? 'Update Modifier Group' : 'Add Modifier Group'}</Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => {
                            setIsAddingModifier(false);
                            setSelectedModifier(null);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                ) : isAddingModifierOption ? (
                  <Form {...modifierOptionForm}>
                    <form onSubmit={modifierOptionForm.handleSubmit(handleSaveModifierOption)} className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Add Option to: {selectedModifier?.name}
                      </h3>
                      
                      <FormField
                        control={modifierOptionForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Option Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g. Extra Cheese" />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={modifierOptionForm.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Price</FormLabel>
                            <FormControl>
                              <Input 
                                type="price" 
                                {...field} 
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                              />
                            </FormControl>
                            <FormDescription>
                              Additional price for this option (0 if no extra charge)
                            </FormDescription>
                          </FormItem>
                        )}
                      />

                      <div className="flex gap-2">
                        <Button type="submit">{selectedModifierOption ? 'Update Option' : 'Add Option'}</Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => {
                            setIsAddingModifierOption(false);
                            setSelectedModifierOption(null);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                ) : (
                  <div className="space-y-6">
                    {modifierGroups.map((modifier) => (
                      <div key={modifier.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <h3 className="text-lg font-medium">{modifier.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {modifier.required ? 'Required' : 'Optional'} • 
                              {modifier.multiSelect ? ' Multiple selections allowed' : ' Single selection only'}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditModifier(modifier)}
                            >
                              Edit Group
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleAddModifierOption(modifier)}
                            >
                              Add Option
                            </Button>
                          </div>
                        </div>
                        
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Option</TableHead>
                              <TableHead>Additional Price</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {modifier.options.map((option) => (
                              <TableRow key={option.id}>
                                <TableCell>{option.name}</TableCell>
                                <TableCell>${option.price.toFixed(2)}</TableCell>
                                <TableCell>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => handleEditModifierOption(modifier, option)}
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                            {modifier.options.length === 0 && (
                              <TableRow>
                                <TableCell colSpan={3} className="text-center text-muted-foreground py-4">
                                  No options added yet
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    ))}
                    
                    {modifierGroups.length === 0 && (
                      <div className="text-center py-10 border rounded-md">
                        <List className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-2 text-lg font-medium">No modifier groups yet</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Add modifier groups to customize menu items
                        </p>
                        <Button className="mt-4" onClick={handleAddModifier}>
                          <Plus className="h-4 w-4 mr-2" /> Add Modifier Group
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* General Settings Tab Content */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure general POS settings.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>General POS settings will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Methods Tab Content */}
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Configure available payment methods.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Payment method settings will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Printers Tab Content */}
          <TabsContent value="printers">
            <Card>
              <CardHeader>
                <CardTitle>Printers</CardTitle>
                <CardDescription>Configure receipt and kitchen printers.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Printer settings will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default POSSetupPage;
