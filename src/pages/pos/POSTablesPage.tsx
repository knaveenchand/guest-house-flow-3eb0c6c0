
import { useState, useRef } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Square, Circle, RectangleHorizontal } from "lucide-react";
import { toast } from "sonner";

type TableShape = "round" | "square" | "rectangular";
type TableItem = {
  id: string;
  name: string;
  shape: TableShape;
  position: { x: number; y: number };
  width: number;
  height: number;
  seats: number;
  isSelected: boolean;
};

const POSTablesPage = () => {
  const [tables, setTables] = useState<TableItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [tableName, setTableName] = useState("");
  const [tableSeats, setTableSeats] = useState(4);
  const [selectedShape, setSelectedShape] = useState<TableShape>("round");
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [draggedTable, setDraggedTable] = useState<string | null>(null);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  
  const floorPlanRef = useRef<HTMLDivElement>(null);
  
  const handleAddTable = () => {
    if (!tableName) {
      toast.error("Please enter a table name");
      return;
    }
    
    const id = `table-${Date.now()}`;
    const newTable: TableItem = {
      id,
      name: tableName,
      shape: selectedShape,
      position: { x: 100, y: 100 },
      width: selectedShape === "rectangular" ? 120 : 80,
      height: selectedShape === "rectangular" ? 80 : 80,
      seats: tableSeats,
      isSelected: false,
    };
    
    setTables([...tables, newTable]);
    setTableName("");
    setTableSeats(4);
    setSelectedShape("round");
    setIsAdding(false);
    toast.success(`Table ${tableName} added`);
  };
  
  const handleDeleteTable = (id: string) => {
    setTables(tables.filter(table => table.id !== id));
    setSelectedTable(null);
    toast.success("Table deleted");
  };
  
  const handleTableClick = (id: string) => {
    setTables(tables.map(table => ({
      ...table,
      isSelected: table.id === id
    })));
    setSelectedTable(id);
  };
  
  const handleMouseDown = (e: React.MouseEvent, tableId: string) => {
    if (!floorPlanRef.current) return;
    
    const rect = floorPlanRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setDraggedTable(tableId);
    setStartPosition({ x, y });
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedTable || !floorPlanRef.current) return;
    
    const rect = floorPlanRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const deltaX = x - startPosition.x;
    const deltaY = y - startPosition.y;
    
    setTables(tables.map(table => {
      if (table.id === draggedTable) {
        return {
          ...table,
          position: {
            x: table.position.x + deltaX,
            y: table.position.y + deltaY
          }
        };
      }
      return table;
    }));
    
    setStartPosition({ x, y });
  };
  
  const handleMouseUp = () => {
    setDraggedTable(null);
  };
  
  const getTableStyle = (table: TableItem) => {
    const baseStyle = {
      left: `${table.position.x}px`,
      top: `${table.position.y}px`,
      width: `${table.width}px`,
      height: `${table.height}px`,
      position: "absolute" as const,
      cursor: "move",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: table.isSelected ? "rgb(34, 197, 94)" : "rgb(59, 130, 246)",
      color: "white",
      borderRadius: table.shape === "round" ? "50%" : table.shape === "square" ? "8px" : "8px",
      border: table.isSelected ? "2px solid rgb(22, 101, 52)" : "2px solid rgb(37, 99, 235)",
      userSelect: "none" as const
    };
    
    return baseStyle;
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">POS Tables</h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Control Panel */}
          <Card className="w-full lg:w-64">
            <CardHeader>
              <CardTitle>Table Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isAdding ? (
                <div className="space-y-2">
                  <Button 
                    className="w-full" 
                    onClick={() => setIsAdding(true)}
                  >
                    Add New Table
                  </Button>
                  
                  {selectedTable && (
                    <Button 
                      className="w-full" 
                      variant="destructive"
                      onClick={() => handleDeleteTable(selectedTable)}
                    >
                      Delete Selected Table
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Table Name</label>
                    <Input 
                      value={tableName} 
                      onChange={(e) => setTableName(e.target.value)}
                      placeholder="e.g. Table 1" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Number of Seats</label>
                    <Input 
                      type="number" 
                      min={1}
                      value={tableSeats} 
                      onChange={(e) => setTableSeats(parseInt(e.target.value) || 1)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Shape</label>
                    <div className="flex gap-2">
                      <div 
                        className={`flex flex-col items-center p-2 border rounded cursor-pointer ${selectedShape === 'round' ? 'bg-primary/20 border-primary' : 'border-gray-200'}`}
                        onClick={() => setSelectedShape('round')}
                      >
                        <Circle className="h-6 w-6" />
                        <span className="text-xs mt-1">Round</span>
                      </div>
                      <div 
                        className={`flex flex-col items-center p-2 border rounded cursor-pointer ${selectedShape === 'square' ? 'bg-primary/20 border-primary' : 'border-gray-200'}`}
                        onClick={() => setSelectedShape('square')}
                      >
                        <Square className="h-6 w-6" />
                        <span className="text-xs mt-1">Square</span>
                      </div>
                      <div 
                        className={`flex flex-col items-center p-2 border rounded cursor-pointer ${selectedShape === 'rectangular' ? 'bg-primary/20 border-primary' : 'border-gray-200'}`}
                        onClick={() => setSelectedShape('rectangular')}
                      >
                        <RectangleHorizontal className="h-6 w-6" />
                        <span className="text-xs mt-1">Rect.</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={handleAddTable}>Add Table</Button>
                    <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Floor Plan */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Restaurant Floor Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                ref={floorPlanRef}
                className="w-full h-[600px] border border-dashed border-gray-300 rounded-md bg-gray-50 relative overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {tables.map((table) => (
                  <div
                    key={table.id}
                    style={getTableStyle(table)}
                    onMouseDown={(e) => handleMouseDown(e, table.id)}
                    onClick={() => handleTableClick(table.id)}
                  >
                    <div className="flex flex-col items-center">
                      <span className="font-medium">{table.name}</span>
                      <span className="text-xs">Seats: {table.seats}</span>
                    </div>
                  </div>
                ))}
                
                {tables.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <span>Add tables using the controls on the left</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default POSTablesPage;
