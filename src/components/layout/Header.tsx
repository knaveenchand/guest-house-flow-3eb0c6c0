
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Hotel, Bed, Computer, ClipboardList, DollarSign, Tv, 
  Settings, Calendar, List, FileText, Cog, MessageCircle, Car, Wrench
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Menubar, 
  MenubarContent, 
  MenubarItem, 
  MenubarMenu, 
  MenubarTrigger 
} from "@/components/ui/menubar";
import { cn } from "@/lib/utils";

// Module definitions
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
      { title: "List View", icon: List, path: "/rooms/list" },
      { title: "Invoicing", icon: FileText, path: "/rooms/invoicing" },
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
  const currentMainModule = modules.find(module => 
    currentPath === module.path || currentPath.startsWith(`${module.path}/`)
  );

  return (
    <header className="flex flex-col w-full bg-black text-white border-b border-gray-800">
      {/* Main navigation */}
      <div className="h-16 flex items-center px-4 gap-2">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 px-4 py-2 border-r border-gray-800">
          <Hotel className="h-6 w-6 text-yellow-400" />
          <h1 className="text-xl font-bold hidden md:block whitespace-nowrap">Hotel Esplanada</h1>
        </Link>
        
        {/* Main modules - Widened buttons */}
        <div className="flex-1 overflow-x-auto no-scrollbar">
          <div className="flex">
            {modules.map((module) => (
              <Link 
                key={module.title}
                to={module.path} 
                className={cn(
                  "flex items-center justify-center gap-2 px-6 py-2 border-r border-gray-800 transition-colors min-w-[100px]",
                  currentPath === module.path || currentPath.startsWith(`${module.path}/`) 
                    ? `${module.bgColor} ${module.borderColor} border-b-2` : ''
                )}
              >
                <module.icon className={`h-5 w-5 ${module.color}`} />
                <span className={`${module.color} hidden md:block font-medium`}>{module.title}</span>
              </Link>
            ))}
          </div>
        </div>
        
        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 w-10 rounded-full border border-yellow-500">
              <Avatar className="h-9 w-9">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gray-800 text-yellow-500">CF</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="outline" size="icon" className="border-gray-700 bg-gray-800">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Submenu for current module - enhanced style */}
      {currentMainModule && currentMainModule.subMenu && currentMainModule.subMenu.length > 0 && (
        <div className={`py-1 px-4 ${currentMainModule.bgColor} border-b border-gray-800`}>
          <div className="flex space-x-4 overflow-x-auto no-scrollbar">
            {currentMainModule.subMenu.map((item) => (
              <Link 
                key={item.title}
                to={item.path} 
                className={`flex items-center gap-2 px-4 py-3 rounded-md ${
                  currentPath === item.path 
                    ? `bg-gray-800 ${currentMainModule.color}` 
                    : `hover:bg-gray-800/50`
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
