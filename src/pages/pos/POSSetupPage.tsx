
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { User, UserCog, Cog, UserPlus } from "lucide-react";

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

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">POS Setup</h1>
          <p className="text-muted-foreground">Configure POS settings, user permissions, and other options.</p>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList>
            <TabsTrigger value="users">User Profiles</TabsTrigger>
            <TabsTrigger value="general">General Settings</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
            <TabsTrigger value="printers">Printers</TabsTrigger>
          </TabsList>

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
