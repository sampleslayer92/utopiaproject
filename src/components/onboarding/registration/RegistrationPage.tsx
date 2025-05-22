
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { useNavigate } from 'react-router-dom';

interface BusinessSegmentOption {
  id: string;
  icon: string;
  label: string;
}

const businessSegments: BusinessSegmentOption[] = [
  { id: 'restaurant', icon: '🍽', label: 'Reštaurácia' },
  { id: 'cafe', icon: '☕', label: 'Kaviareň' },
  { id: 'ecommerce', icon: '🛒', label: 'E-shop' },
  { id: 'pos', icon: '🧾', label: 'Prevádzka s POS' },
  { id: 'services', icon: '✂️', label: 'Služby' },
  { id: 'hotel', icon: '🏨', label: 'Hotel' },
  { id: 'mobile', icon: '🚚', label: 'Mobilný predaj' },
  { id: 'other', icon: '❓', label: 'Iné' },
];

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '+421',
    segment: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSegmentSelect = (segmentId: string) => {
    setFormData({
      ...formData,
      segment: segmentId
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save data to localStorage or context
    localStorage.setItem('utopiaRegistration', JSON.stringify(formData));
    // Redirect to dashboard
    navigate('/dashboard');
  };
  
  const isFormValid = () => {
    return (
      formData.fullName.trim() !== '' && 
      formData.email.includes('@') && 
      formData.phone.length > 4 &&
      formData.segment !== ''
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="flex justify-end p-4">
        <LanguageSwitcher />
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Začať je jednoduché</h1>
            <p className="mt-2 text-gray-600">Stačí pár údajov – o všetko ostatné sa postaráme my.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Meno a priezvisko</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Zadajte vaše meno a priezvisko"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">E-mailová adresa</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="vasa@adresa.sk"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Telefónne číslo</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+421"
                  className="mt-1"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label className="mb-3 block">Segment podnikania</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {businessSegments.map((segment) => (
                  <Card 
                    key={segment.id}
                    className={`cursor-pointer transition-all hover:border-utopia-500 ${
                      formData.segment === segment.id 
                        ? 'border-utopia-500 bg-utopia-50 ring-2 ring-utopia-200' 
                        : ''
                    }`}
                    onClick={() => handleSegmentSelect(segment.id)}
                  >
                    <CardContent className="flex flex-col items-center text-center p-4">
                      <div className="text-3xl mb-2">{segment.icon}</div>
                      <div className="font-medium">{segment.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button 
                type="submit" 
                className="px-8 py-6 text-lg bg-utopia-600 hover:bg-utopia-700"
                disabled={!isFormValid()}
              >
                <span>Vytvoriť účet a vstúpiť do portálu</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      </main>
      
      <footer className="py-4 text-center text-sm text-gray-500">
        © 2025 Utopia. Všetky práva vyhradené.
      </footer>
    </div>
  );
};
