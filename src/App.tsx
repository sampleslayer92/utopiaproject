
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
import { OnboardingWizard } from "./components/onboarding/OnboardingWizard";
import { ThemeProvider } from "next-themes";
import { TransactionsPage } from "./components/dashboard/TransactionsPage";
import { DevicesPage } from "./components/dashboard/DevicesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <BrowserRouter>
          <OnboardingProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<RegistrationPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/onboarding" element={<Navigate to="/dashboard" />} />
                <Route path="/onboarding/:step" element={<OnboardingWizard />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/devices" element={<DevicesPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </OnboardingProvider>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
