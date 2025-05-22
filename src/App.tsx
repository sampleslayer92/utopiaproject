
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
import { OnboardingWizard } from "./components/onboarding/OnboardingWizard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RegistrationPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/onboarding" element={<Navigate to="/" />} />
            <Route path="/onboarding/:step" element={<OnboardingWizard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
