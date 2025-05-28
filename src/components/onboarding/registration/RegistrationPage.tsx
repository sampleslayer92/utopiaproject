
import React, { useState } from 'react';
import { WelcomeChoiceScreen } from '@/components/auth/WelcomeChoiceScreen';
import { LoginPage } from '@/components/auth/LoginPage';
import { RegistrationFlow } from './RegistrationFlow';

export const RegistrationPage: React.FC = () => {
  const [mode, setMode] = useState<'choice' | 'login' | 'register'>('choice');
  
  const handleNewClient = () => {
    setMode('register');
  };
  
  const handleExistingClient = () => {
    setMode('login');
  };
  
  const handleBackToChoice = () => {
    setMode('choice');
  };
  
  if (mode === 'choice') {
    return (
      <WelcomeChoiceScreen 
        onNewClient={handleNewClient}
        onExistingClient={handleExistingClient}
      />
    );
  }
  
  if (mode === 'login') {
    return <LoginPage onBack={handleBackToChoice} />;
  }
  
  if (mode === 'register') {
    return <RegistrationFlow />;
  }

  return null;
};
