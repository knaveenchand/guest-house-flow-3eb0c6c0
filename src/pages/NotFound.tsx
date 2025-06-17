
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Hotel } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleReturnToDashboard = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Hotel className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Oops! This page doesn't exist in Hotel Esplanada.
        </p>
        <Button onClick={handleReturnToDashboard}>
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
