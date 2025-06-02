
import { OnboardingData } from './onboarding';

export interface ExtendedContract {
  id: string;
  contractNumber: string;
  clientId: string;
  clientName: string;
  type: string;
  status: 'active' | 'pending' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
  value: number;
  monthlyFee: number;
  commissionRate: number;
  signedBy: string;
  notes: string;
  
  // Onboarding data
  onboardingData: OnboardingData;
  
  // Contract specific additions
  createdAt: string;
  updatedAt: string;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    uploadedAt: string;
  }>;
}
