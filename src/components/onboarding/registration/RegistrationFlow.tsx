
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WelcomeScreen } from './WelcomeScreen';
import { BusinessTypeScreen } from './BusinessTypeScreen';
import { ProductSelectionScreen } from './ProductSelectionScreen';
import { CountrySelectionScreen } from './CountrySelectionScreen';
import { PhoneVerificationScreen } from './PhoneVerificationScreen';
import { UserDataForm } from './UserDataForm';
import { RegistrationLayout } from './RegistrationLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface UserData {
  country: string;
  fullName: string;
  email: string;
  phone: string;
  businessType: string;
  selectedProducts: string[];
  verificationCode: string;
}

export const RegistrationFlow: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({
    country: 'SK',
    fullName: '',
    email: '',
    phone: '+421',
    businessType: '',
    selectedProducts: [],
    verificationCode: ''
  });
  
  const handleChange = (field: string, value: string) => {
    setUserData({
      ...userData,
      [field]: value
    });
  };
  
  const handleCountrySelect = (country: string) => {
    const phonePrefix = country === 'SK' ? '+421' : 
                        country === 'CZ' ? '+420' : 
                        country === 'GB' ? '+44' : 
                        country === 'AT' ? '+43' : 
                        country === 'HU' ? '+36' : 
                        country === 'PL' ? '+48' :
                        country === 'DE' ? '+49' : '+44';
    setUserData({
      ...userData,
      country,
      phone: phonePrefix
    });
  };
  
  const handleBusinessTypeSelect = (type: string) => {
    setUserData({
      ...userData,
      businessType: type
    });
  };
  
  const handleProductSelect = (products: string[]) => {
    setUserData({
      ...userData,
      selectedProducts: products
    });
  };

  const verifyPhone = (code: string) => {
    setUserData({
      ...userData,
      verificationCode: code
    });
    
    if (code.length === 4) {
      toast.success(t("phone.verified"));
      nextStep();
    } else {
      toast.error(t("invalid.code"));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('utopiaRegistration', JSON.stringify(userData));
    navigate('/dashboard');
    toast.success(t("registration.complete"));
  };
  
  const nextStep = () => {
    setStep(step + 1);
  };
  
  const prevStep = () => {
    setStep(step - 1);
  };
  
  // Step 0: Welcome
  if (step === 0) {
    return <WelcomeScreen onNext={nextStep} />;
  }
  
  // Step 1: Country Selection
  if (step === 1) {
    return (
      <CountrySelectionScreen 
        selectedCountry={userData.country} 
        onSelect={handleCountrySelect}
        onNext={nextStep}
        onBack={prevStep}
      />
    );
  }

  // Step 2: Account Creation
  if (step === 2) {
    return (
      <RegistrationLayout onBack={prevStep}>
        <UserDataForm
          fullName={userData.fullName}
          email={userData.email}
          onChange={handleChange}
          onSubmit={nextStep}
        />
      </RegistrationLayout>
    );
  }

  // Step 3: Phone Verification
  if (step === 3) {
    return (
      <PhoneVerificationScreen 
        phone={userData.phone}
        onChangePhone={(phone) => setUserData({...userData, phone})}
        onVerify={verifyPhone}
        onBack={prevStep}
      />
    );
  }
  
  // Step 4: Business Type
  if (step === 4) {
    return (
      <BusinessTypeScreen 
        onSelect={handleBusinessTypeSelect} 
        selectedType={userData.businessType}
        onNext={nextStep}
        onBack={prevStep}
      />
    );
  }
  
  // Step 5: Product Selection
  if (step === 5) {
    return (
      <ProductSelectionScreen 
        onSelect={handleProductSelect} 
        selectedProducts={userData.selectedProducts}
        onSubmit={handleSubmit}
        onBack={prevStep}
      />
    );
  }

  // Fallback
  return <WelcomeScreen onNext={nextStep} />;
};
