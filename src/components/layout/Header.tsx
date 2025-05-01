
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Hotel, Bed, Computer, ClipboardList, DollarSign, Tv, 
  Settings, Calendar, List, FileText, Cog, MessageCircle, Car, Wrench,
  PlaneLanding, PlaneTakeoff, BedDouble, Clock, Plus
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Module definitions with their submenus
const modules = [
  {
    title: "Rooms",
    path: "/rooms",
    icon: Bed,
    color: "text-yellow-400",
    bgColor: "bg-yellow-950/40",
    borderColor: "border-yellow-400",
    subMenu: [
      { title: "Calendar", icon: Calendar, path: "/rooms/calendar" },
      { title: "List", icon: List, path: "/rooms/list" },
      { title: "Add", icon: Plus, path: "/rooms/add" },
      { title: "Setup", icon: Cog, path: "/rooms/setup" }
    ]
  },
  {
    title: "POS",
    path: "/pos",
    icon: Computer,
    color: "text-green-500",
    bgColor: "bg-green-950/40",
    borderColor: "border-green-500",
    subMenu: [
      { title: "Tables", icon: MessageCircle, path: "/pos/tables" },
      { title: "Menu", icon: List, path: "/pos/menu" },
      { title: "Setup", icon: Cog, path: "/pos/setup" }
    ]
  },
  {
    title: "Tasks",
    path: "/tasks",
    icon: ClipboardList,
    color: "text-orange-500",
    bgColor: "bg-orange-950/40",
    borderColor: "border-orange-500",
    subMenu: [
      { title: "Housekeeping", icon: Bed, path: "/tasks/housekeeping" },
      { title: "Maintenance", icon: Wrench, path: "/tasks/maintenance" },
      { title: "Car", icon: Car, path: "/tasks/car" },
      { title: "Setup", icon: Cog, path: "/tasks/setup" }
    ]
  },
  {
    title: "Finances",
    path: "/finances",
    icon: DollarSign,
    color: "text-blue-500",
    bgColor: "bg-blue-950/40",
    borderColor: "border-blue-500",
    subMenu: [
      { title: "Reports", icon: FileText, path: "/finances/reports" },
      { title: "Expenses", icon: DollarSign, path: "/finances/expenses" },
      { title: "Setup", icon: Cog, path: "/finances/setup" }
    ]
  },
  {
    title: "Guest TV",
    path: "/guest-tv",
    icon: Tv,
    color: "text-pink-500",
    bgColor: "bg-pink-950/40",
    borderColor: "border-pink-500",
    subMenu: [
      { title: "Content", icon: Tv, path: "/guest-tv/content" },
      { title: "Setup", icon: Cog, path: "/guest-tv/setup" }
    ]
  }
];

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Find the current active module
  const currentMainModule = modules.find(module => 
    currentPath === module.path || currentPath.startsWith(`${module.path}/`)
  );

  return (
    <header className="flex flex-col w-full bg-black text-white border-b border-purple-900">
      {/* Main navigation */}
      <div className="h-16 flex items-center px-0 relative">
        {/* Logo - reduced width */}
        <Link to="/" className="flex items-center gap-2 px-4 py-2 border-r border-purple-900 h-full">
          <Hotel className="h-6 w-6 text-yellow-400" />
          <h1 className="text-xl font-bold hidden sm:block whitespace-nowrap">Hotel Esplanada</h1>
        </Link>
        
        {/* Main modules - Full width flex */}
        <div className="flex-1 flex h-full">
          {modules.map((module) => {
            const isActive = currentPath === module.path || currentPath.startsWith(`${module.path}/`);
            
            return (
              <div 
                key={module.title}
                className={cn(
                  "flex-1 flex items-center justify-center h-full border-r border-purple-900 transition-colors relative",
                  isActive ? `${module.bgColor} ${module.borderColor} border-b-2` : ''
                )}
              >
                {isActive ? (
                  // Show submenu when this module is active
                  <div className="flex items-center justify-center gap-4 w-full">
                    {module.subMenu.map((subItem) => (
                      <Link 
                        key={subItem.path}
                        to={subItem.path}
                        className={cn(
                          "flex flex-col items-center justify-center p-1 rounded-md",
                          currentPath === subItem.path ? `${module.color} bg-opacity-20 bg-black` : 'text-gray-300'
                        )}
                      >
                        <subItem.icon className={cn("h-5 w-5", currentPath === subItem.path ? module.color : '')} />
                      </Link>
                    ))}
                  </div>
                ) : (
                  // Show regular module button when not active
                  <Link 
                    to={module.path} 
                    className="flex items-center justify-center gap-2 w-full h-full"
                  >
                    <module.icon className={`h-5 w-5 ${module.color}`} />
                    <span className={`${module.color} font-medium`}>{module.title}</span>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
        
        {/* User menu */}
        <Button variant="ghost" className="h-10 w-10 rounded-full border border-yellow-500 mx-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gray-800 text-yellow-500">CF</AvatarFallback>
          </Avatar>
        </Button>
        
        <Button variant="outline" size="icon" className="border-gray-700 bg-gray-800 mr-2">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
