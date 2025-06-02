
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { RegistrationPage } from "./components/onboarding/registration/RegistrationPage";
import { DashboardPage } from "./components/onboarding/dashboard/DashboardPage";
import { LanguageProvider } from "./contexts/LanguageContext";
import { OnboardingProvider } from "./contexts/OnboardingContext";
import { AuthProvider } from "./contexts/AuthContext";
import { OnboardingWizard } from "./components/onboarding/OnboardingWizard";
import { ThemeProvider } from "next-themes";
import { TransactionsPage } from "./components/dashboard/TransactionsPage";
import { DevicesPage } from "./components/dashboard/DevicesPage";
import { BusinessPartnersPage } from "./components/dashboard/BusinessPartnersPage";
import { ClientsPage } from "./components/dashboard/ClientsPage";
import { LocationsPage } from "./components/dashboard/LocationsPage";
import { ContractsPage } from "./components/dashboard/ContractsPage";
import { TicketsPage } from "./components/dashboard/TicketsPage";
import { SettingsPage } from "./components/dashboard/SettingsPage";
import { TeamPage } from "./components/dashboard/TeamPage";
import { TeamMemberDetail } from "./components/dashboard/TeamMemberDetail";
import { ReportsPage } from "./components/dashboard/ReportsPage";
import { ErrorBoundary } from "react-error-boundary";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { DashboardLayout } from "./components/dashboard/layouts/DashboardLayout";
import { LocationProvider } from "./contexts/LocationContext";
import { MerchantDetailPage } from "./components/dashboard/MerchantDetailPage";
import { LocationDashboard } from "./components/dashboard/LocationDashboard";

const queryClient = new QueryClient();

const ErrorFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-900 text-center p-5">
    <div>
      <h2 className="text-2xl font-bold mb-3 text-red-600">Oops! Something went wrong</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        We encountered an error. Please try refreshing the page.
      </p>
      <button 
        onClick={() => window.location.href = '/'} 
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Home Page
      </button>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <BrowserRouter>
          <AuthProvider>
            <LocationProvider>
              <OnboardingProvider>
                <TooltipProvider>
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Toaster />
                    <Sonner />
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/register" element={<RegistrationPage />} />
                      
                      {/* Dashboard routes - moved to top level */}
                      <Route path="/dashboard" element={
                        <ProtectedRoute>
                          <DashboardLayout />
                        </ProtectedRoute>
                      } />
                      <Route path="/dashboard/merchants" element={
                        <ProtectedRoute>
                          <DashboardLayout />
                        </ProtectedRoute>
                      } />
                      <Route path="/dashboard/merchants/:id" element={
                        <ProtectedRoute>
                          <DashboardLayout />
                        </ProtectedRoute>
                      } />
                      <Route path="/dashboard/business-partners" element={
                        <ProtectedRoute>
                          <DashboardLayout />
                        </ProtectedRoute>
                      } />
                      <Route path="/dashboard/devices" element={
                        <ProtectedRoute>
                          <DashboardLayout />
                        </ProtectedRoute>
                      } />
                      <Route path="/dashboard/locations" element={
                        <ProtectedRoute>
                          <DashboardLayout />
                        </ProtectedRoute>
                      } />
                      <Route path="/dashboard/location/:id" element={
                        <ProtectedRoute>
                          <DashboardLayout />
                        </ProtectedRoute>
                      } />
                      <Route path="/dashboard/transactions" element={
                        <ProtectedRoute>
                          <DashboardLayout />
                        </ProtectedRoute>
                      } />
                      <Route path="/dashboard/reports" element={
                        <ProtectedRoute>
                          <DashboardLayout />
                        </ProtectedRoute>
                      } />
                      <Route path="/dashboard/contracts" element={
                        <ProtectedRoute>
                          <DashboardLayout />
                        </ProtectedRoute>
                      } />
                      <Route path="/dashboard/contracts/:contractId" element={
                        <ProtectedRoute>
                          <DashboardLayout />
                        </ProtectedRoute>
                      } />
                      <Route path="/dashboard/tickets" element={
                        <ProtectedRoute>
                          <DashboardLayout />
                        </ProtectedRoute>
                      } />
                      <Route path="/dashboard/team" element={
                        <ProtectedRoute>
                          <DashboardLayout />
                        </ProtectedRoute>
                      } />
                      <Route path="/dashboard/team/:id" element={
                        <ProtectedRoute>
                          <DashboardLayout />
                        </ProtectedRoute>
                      } />
                      <Route path="/dashboard/settings" element={
                        <ProtectedRoute>
                          <DashboardLayout />
                        </ProtectedRoute>
                      } />
                      
                      {/* Onboarding routes */}
                      <Route path="/onboarding/:step" element={
                        <ProtectedRoute>
                          <OnboardingWizard />
                        </ProtectedRoute>
                      } />
                      
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </ErrorBoundary>
                </TooltipProvider>
              </OnboardingProvider>
            </LocationProvider>
          </AuthProvider>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
