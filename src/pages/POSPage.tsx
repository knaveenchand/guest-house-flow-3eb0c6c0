
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Mock data - in a real app this would come from your settings/database
const categories = [
  { id: "breakfast", name: "Breakfast", color: "bg-pink-500" },
  { id: "lunch", name: "Lunch", color: "bg-orange-500" },
  { id: "specials", name: "Specials", color: "bg-green-500" },
  { id: "burgers", name: "Burgers", color: "bg-blue-500" },
  { id: "pasta", name: "Pasta", color: "bg-red-500" },
  { id: "salad", name: "Salad", color: "bg-yellow-500" },
  { id: "ct", name: "C&T", color: "bg-cyan-500" },
  { id: "juices", name: "Juices", color: "bg-cyan-400" },
  { id: "alcohol", name: "Alcohol", color: "bg-pink-400" },
];

const menuItems = [
  { id: 1, name: "Eggs Benedict", price: 12.50, category: "breakfast", image: null },
  { id: 2, name: "Burger", price: 15.00, category: "burgers", image: null },
  { id: 3, name: "Pancakes", price: 10.00, category: "breakfast", image: null },
  { id: 4, name: "Caesar Salad", price: 8.50, category: "salad", image: null },
  { id: 5, name: "Pasta Carbonara", price: 14.00, category: "pasta", image: null },
];

const rooms = Array.from({ length: 20 }, (_, i) => ({ id: i + 101, number: `${i + 101}` })).reverse();
const tables = Array.from({ length: 15 }, (_, i) => ({ id: i + 1, number: `${i + 1}` })).reverse();

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  modifiers?: string[];
}

const POSPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [roomModalOpen, setRoomModalOpen] = useState(false);
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string>("");

  const filteredItems = selectedCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToOrder = (item: typeof menuItems[0]) => {
    setOrderItems(prev => {
      const existingItem = prev.find(orderItem => orderItem.id === item.id);
      if (existingItem) {
        return prev.map(orderItem =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, change: number) => {
    setOrderItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean) as OrderItem[]
    );
  };

  const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleRoomSelection = (roomNumber: string) => {
    setSelectedRoom(roomNumber);
    setRoomModalOpen(false);
    setDeliveryModalOpen(true);
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Main POS Area */}
        <div className="flex-1 flex flex-col">
          {/* Category Bar */}
          <div className="flex items-center gap-2 p-4 border-b bg-gray-50">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              className={selectedCategory === "all" ? "bg-green-600 text-white hover:bg-green-700" : "bg-green-600 text-black hover:bg-green-700 hover:text-white"}
              onClick={() => setSelectedCategory("all")}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                className={selectedCategory === category.id 
                  ? `${category.color} text-white border-gray-400 hover:opacity-90` 
                  : `${category.color} text-black border-gray-400 hover:opacity-90 hover:text-white`
                }
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
            <Button variant="outline" size="icon" className="ml-auto">
              <Settings className="h-4 w-4" />
            </Button>
          </div>

          {/* Items Grid */}
          <div className="flex-1 p-4 overflow-auto">
            <div className="grid grid-cols-6 gap-4">
              {filteredItems.map((item) => (
                <Card 
                  key={item.id} 
                  className="aspect-square border-2 border-red-500 cursor-pointer hover:bg-gray-50"
                  onDoubleClick={() => addToOrder(item)}
                >
                  <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                    <div className="w-full h-24 bg-gray-200 mb-2 rounded flex items-center justify-center">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                      ) : (
                        <span className="text-gray-400 text-xs">No Image</span>
                      )}
                    </div>
                    <h3 className="text-sm font-medium text-center">{item.name}</h3>
                    <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-80 border-l bg-white flex flex-col">
          {/* Order Items */}
          <div className="flex-1 p-4 overflow-auto">
            <h2 className="text-lg font-semibold mb-4">Order</h2>
            {orderItems.length === 0 ? (
              <p className="text-gray-500 text-center">No items ordered</p>
            ) : (
              <div className="space-y-2">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      {item.modifiers && (
                        <p className="text-sm text-gray-600">{item.modifiers.join(", ")}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom section with dropdowns and payment buttons */}
          <div className="p-4 border-t relative">
            {/* Room Selection Dropdown - positioned much higher above payment buttons */}
            {roomModalOpen && (
              <div className="absolute bottom-[180px] right-[82px] w-[70px] bg-pink-600 border border-pink-700 rounded-lg shadow-lg z-50 h-[160px] overflow-y-auto scrollbar-hide">
                {rooms.map((room, index) => (
                  <button
                    key={room.id}
                    onClick={() => handleRoomSelection(room.number)}
                    className="w-full px-2 py-2 text-center text-white hover:bg-pink-700 border-b border-pink-500 last:border-b-0 text-sm"
                  >
                    {room.number}
                  </button>
                ))}
              </div>
            )}

            {/* Table Selection Dropdown - positioned much higher above payment buttons */}
            {tableModalOpen && (
              <div className="absolute bottom-[180px] right-[6px] w-[70px] bg-orange-600 border border-orange-700 rounded-lg shadow-lg z-50 h-[160px] overflow-y-auto scrollbar-hide">
                {tables.map((table, index) => (
                  <button
                    key={table.id}
                    onClick={() => setTableModalOpen(false)}
                    className="w-full px-2 py-2 text-center text-white hover:bg-orange-700 border-b border-orange-500 last:border-b-0 text-sm"
                  >
                    {table.number}
                  </button>
                ))}
              </div>
            )}
            
            {/* Payment Buttons - All in one row */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              <Button className="bg-green-600 hover:bg-green-700 text-white py-3">
                Cash
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white py-3">
                Card
              </Button>
              <Button 
                className="bg-pink-600 hover:bg-pink-700 text-white py-3"
                onClick={() => {
                  setTableModalOpen(false);
                  setRoomModalOpen(!roomModalOpen);
                }}
              >
                Room
              </Button>
              <Button 
                className="bg-orange-600 hover:bg-orange-700 text-white py-3"
                onClick={() => {
                  setRoomModalOpen(false);
                  setTableModalOpen(!tableModalOpen);
                }}
              >
                Table
              </Button>
            </div>

            {/* Total - moved to bottom */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-red-600">
                ${total.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Room Delivery Options Modal */}
        <Dialog open={deliveryModalOpen} onOpenChange={setDeliveryModalOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Room {selectedRoom} - Delivery Options</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Button 
                className="w-full py-6 text-lg"
                onClick={() => setDeliveryModalOpen(false)}
              >
                Deliver to room
              </Button>
              <Button 
                variant="outline" 
                className="w-full py-6 text-lg"
                onClick={() => setDeliveryModalOpen(false)}
              >
                In restaurant
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default POSPage;
