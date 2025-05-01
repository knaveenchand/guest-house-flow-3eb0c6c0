
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RoomsPage from "./pages/RoomsPage";
import POSPage from "./pages/POSPage";
import TasksPage from "./pages/TasksPage";
import FinancesPage from "./pages/FinancesPage";
import GuestTVPage from "./pages/GuestTVPage";
import NotFound from "./pages/NotFound";

// Add module subpages
import RoomsCalendarPage from "./pages/rooms/RoomsCalendarPage";
import RoomsListPage from "./pages/rooms/RoomsListPage";
import RoomsInvoicingPage from "./pages/rooms/RoomsInvoicingPage";
import RoomsSetupPage from "./pages/rooms/RoomsSetupPage";
import AddBookingPage from "./pages/rooms/AddBookingPage";

import POSTablesPage from "./pages/pos/POSTablesPage";
import POSMenuPage from "./pages/pos/POSMenuPage";
import POSSetupPage from "./pages/pos/POSSetupPage";

import TasksHousekeepingPage from "./pages/tasks/TasksHousekeepingPage";
import TasksMaintenancePage from "./pages/tasks/TasksMaintenancePage";
import TasksSetupPage from "./pages/tasks/TasksSetupPage";

import FinancesReportsPage from "./pages/finances/FinancesReportsPage";
import FinancesExpensesPage from "./pages/finances/FinancesExpensesPage";
import FinancesSetupPage from "./pages/finances/FinancesSetupPage";

import GuestTVContentPage from "./pages/guesttv/GuestTVContentPage";
import GuestTVSetupPage from "./pages/guesttv/GuestTVSetupPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Rooms module */}
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/rooms/calendar" element={<RoomsCalendarPage />} />
          <Route path="/rooms/list" element={<RoomsListPage />} />
          <Route path="/rooms/invoicing" element={<RoomsInvoicingPage />} />
          <Route path="/rooms/setup" element={<RoomsSetupPage />} />
          <Route path="/rooms/add" element={<AddBookingPage />} />
          
          {/* POS module */}
          <Route path="/pos" element={<POSPage />} />
          <Route path="/pos/tables" element={<POSTablesPage />} />
          <Route path="/pos/menu" element={<POSMenuPage />} />
          <Route path="/pos/setup" element={<POSSetupPage />} />
          
          {/* Tasks module */}
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/housekeeping" element={<TasksHousekeepingPage />} />
          <Route path="/tasks/maintenance" element={<TasksMaintenancePage />} />
          <Route path="/tasks/setup" element={<TasksSetupPage />} />
          
          {/* Finances module */}
          <Route path="/finances" element={<FinancesPage />} />
          <Route path="/finances/reports" element={<FinancesReportsPage />} />
          <Route path="/finances/expenses" element={<FinancesExpensesPage />} />
          <Route path="/finances/setup" element={<FinancesSetupPage />} />
          
          {/* Guest TV module */}
          <Route path="/guest-tv" element={<GuestTVPage />} />
          <Route path="/guest-tv/content" element={<GuestTVContentPage />} />
          <Route path="/guest-tv/setup" element={<GuestTVSetupPage />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
