
import { 
  Calendar, Bed, Users, CalendarCheck, Bell, Clock, 
  Hotel, LayoutDashboard, Tv, Receipt, ClipboardList, 
  DollarSign, Computer 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";

import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Rooms",
    path: "/rooms",
    icon: Bed,
  },
  {
    title: "POS",
    path: "/pos",
    icon: Computer,
  },
  {
    title: "Tasks",
    path: "/tasks",
    icon: ClipboardList,
  },
  {
    title: "Finances",
    path: "/finances",
    icon: DollarSign,
  },
  {
    title: "Guest TV",
    path: "/guest-tv",
    icon: Tv,
  },
];

type SidebarProps = {
  className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <ShadcnSidebar className={cn("border-r", className)}>
      <div className="p-4 flex items-center gap-2">
        <Hotel className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold">Hotel Esplanada</h1>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </ShadcnSidebar>
  );
};

export default Sidebar;
