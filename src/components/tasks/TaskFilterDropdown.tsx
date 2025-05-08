
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, CheckSquare } from "lucide-react";

interface TaskFilterDropdownProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export function TaskFilterDropdown({ activeFilter, setActiveFilter }: TaskFilterDropdownProps) {
  const filters = [
    { id: "all", name: "All Tasks" },
    { id: "pending", name: "Pending" },
    { id: "in-progress", name: "In Progress" },
    { id: "completed", name: "Completed" },
    { id: "high-priority", name: "High Priority" },
    { id: "urgent", name: "Urgent Only" },
    { id: "assigned-to-me", name: "Assigned to Me" }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter Tasks</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {filters.map((filter) => (
            <DropdownMenuItem 
              key={filter.id}
              className="flex items-center justify-between"
              onClick={() => setActiveFilter(filter.id)}
            >
              <span>{filter.name}</span>
              {activeFilter === filter.id && <CheckSquare className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
