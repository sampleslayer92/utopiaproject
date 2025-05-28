
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
import { ErrorBoundary } from "react-error-boundary";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { DashboardLayout } from "./components/dashboard/layouts/DashboardLayout";

const queryClient = new QueryClient();

// Simple fallback component for error boundary
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
            <OnboardingProvider>
              <TooltipProvider>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Toaster />
                  <Sonner />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    
                    {/* Protected dashboard routes */}
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <DashboardLayout />
                      </ProtectedRoute>
                    }>
                      <Route index element={<DashboardPage />} />
                      <Route path="transactions" element={<TransactionsPage />} />
                      <Route path="devices" element={<DevicesPage />} />
                    </Route>
                    
                    {/* Legacy routes */}
                    <Route path="/onboarding" element={<Navigate to="/dashboard" />} />
                    <Route path="/onboarding/:step" element={
                      <ProtectedRoute>
                        <OnboardingWizard />
                      </ProtectedRoute>
                    } />
                    <Route path="/transactions" element={
                      <ProtectedRoute>
                        <TransactionsPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/devices" element={
                      <ProtectedRoute>
                        <DevicesPage />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </ErrorBoundary>
              </TooltipProvider>
            </OnboardingProvider>
          </AuthProvider>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
