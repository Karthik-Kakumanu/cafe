import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/lib/authContext";
import { PlanProvider } from "@/lib/planContext";
import { CustomerProvider } from "@/lib/customerContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Programs from "./pages/Programs";
import CheckIns from "./pages/CheckIns";
import Analytics from "./pages/Analytics";
import SettingsPage from "./pages/SettingsPage";
import Segments from "./pages/Segments";
import Campaigns from "./pages/Campaigns";
import Feedback from "./pages/Feedback";
import Transactions from "./pages/Transactions";
import Reservations from "./pages/Reservations";
import Billing from "./pages/Billing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AdminRoute = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <PlanProvider>
          <CustomerProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public: Login */}
                <Route path="/admin" element={<LoginPage />} />

                {/* Protected: Admin Dashboard */}
                <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
                <Route path="/admin/customers" element={<AdminRoute><Customers /></AdminRoute>} />
                <Route path="/admin/programs" element={<AdminRoute><Programs /></AdminRoute>} />
                <Route path="/admin/checkins" element={<AdminRoute><CheckIns /></AdminRoute>} />
                <Route path="/admin/analytics" element={<AdminRoute><Analytics /></AdminRoute>} />
                <Route path="/admin/settings" element={<AdminRoute><SettingsPage /></AdminRoute>} />
                <Route path="/admin/segments" element={<AdminRoute><Segments /></AdminRoute>} />
                <Route path="/admin/campaigns" element={<AdminRoute><Campaigns /></AdminRoute>} />
                <Route path="/admin/feedback" element={<AdminRoute><Feedback /></AdminRoute>} />
                <Route path="/admin/transactions" element={<AdminRoute><Transactions /></AdminRoute>} />
                <Route path="/admin/reservations" element={<AdminRoute><Reservations /></AdminRoute>} />
                <Route path="/admin/billing" element={<AdminRoute><Billing /></AdminRoute>} />

                {/* Redirects */}
                <Route path="/" element={<Navigate to="/admin" replace />} />
                <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CustomerProvider>
        </PlanProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
