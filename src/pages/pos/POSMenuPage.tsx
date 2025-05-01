
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Coffee, Pizza, Beer, Wine, UtensilsCrossed, CupSoda, Dessert, PlusCircle } from "lucide-react";

const MenuCategoryButton = ({ 
  icon: Icon, 
  label, 
  color, 
  bgColor 
}: { 
  icon: React.ElementType; 
  label: string; 
  color: string; 
  bgColor: string;
}) => (
  <Button 
    variant="ghost"
    className={`flex flex-col items-center justify-center h-28 w-full ${bgColor} hover:bg-opacity-80 border border-gray-700 rounded-lg gap-2`}
  >
    <Icon className={`h-8 w-8 ${color}`} />
    <span className="text-sm font-medium">{label}</span>
  </Button>
);

const POSMenuPage = () => {
  return (
    <Layout>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2">
        <MenuCategoryButton 
          icon={Coffee} 
          label="Breakfast" 
          color="text-yellow-400" 
          bgColor="bg-yellow-950/20" 
        />
        <MenuCategoryButton 
          icon={Pizza} 
          label="Lunch" 
          color="text-orange-400" 
          bgColor="bg-orange-950/20" 
        />
        <MenuCategoryButton 
          icon={UtensilsCrossed} 
          label="Dinner" 
          color="text-red-400" 
          bgColor="bg-red-950/20" 
        />
        <MenuCategoryButton 
          icon={CupSoda} 
          label="Soft Drinks" 
          color="text-blue-400" 
          bgColor="bg-blue-950/20" 
        />
        <MenuCategoryButton 
          icon={Beer} 
          label="Beer" 
          color="text-amber-400" 
          bgColor="bg-amber-950/20" 
        />
        <MenuCategoryButton 
          icon={Wine} 
          label="Wine" 
          color="text-purple-400" 
          bgColor="bg-purple-950/20" 
        />
        <MenuCategoryButton 
          icon={Dessert} 
          label="Desserts" 
          color="text-pink-400" 
          bgColor="bg-pink-950/20" 
        />
        <MenuCategoryButton 
          icon={PlusCircle} 
          label="Add New" 
          color="text-green-400" 
          bgColor="bg-green-950/20" 
        />
      </div>
    </Layout>
  );
};

export default POSMenuPage;
