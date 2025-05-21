
import React, { useState } from 'react';
import { StepContainer } from '../StepContainer';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import SignatureCanvas from './SignatureCanvas';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Download, Eye } from 'lucide-react';
import { toast } from 'sonner';

export const StepSign: React.FC = () => {
  const { data, updatePodpisSuhlasy } = useOnboarding();
  const { podpisSuhlasy } = data;
  const [contractPreviewOpen, setContractPreviewOpen] = useState(false);
  const [signatureClient, setSignatureClient] = useState<string | null>(null);
  const [signatureProvider, setSignatureProvider] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleGdprChange = (checked: boolean) => {
    updatePodpisSuhlasy({
      gdpr: checked
    });
  };

  const handleObchodnePodmienkyChange = (checked: boolean) => {
    updatePodpisSuhlasy({
      obchodnePodmienky: checked
    });
  };

  const handleDorucovanieElektronickyChange = (checked: boolean) => {
    updatePodpisSuhlasy({
      dorucovanieElektronicky: checked
    });
  };

  const handleViewContract = () => {
    setContractPreviewOpen(true);
  };

  const handleCloseContractPreview = () => {
    setContractPreviewOpen(false);
  };

  const handleDownloadContract = () => {
    toast.info("Sťahovanie zmluvy sa začalo");
    // In real app, this would trigger a download
    setTimeout(() => {
      toast.success("Zmluva bola úspešne stiahnutá");
    }, 1500);
  };

  const handleSubmit = () => {
    if (signatureClient && signatureProvider) {
      setSubmitted(true);
      setTimeout(() => {
        toast.success("Onboarding úspešne dokončený!");
      }, 500);
    } else {
      toast.error("Pred dokončením je potrebné pridať podpis klienta aj poskytovateľa");
    }
  };

  return (
    <StepContainer
      title="Podpis a súhlasy"
      subtitle="Posledný krok pred dokončením onboardingu."
      nextButtonDisabled={true}
    >
      {!submitted ? (
        <>
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Súhlasy</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="gdpr"
                    checked={podpisSuhlasy.gdpr}
                    onCheckedChange={handleGdprChange}
                    className="mt-1"
                  />
                  <div>
                    <Label htmlFor="gdpr" className="text-base font-medium">Súhlas so spracovaním údajov (GDPR)</Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Súhlasím so spracovaním osobných údajov spoločnosťou Utopia podľa podmienok uvedených v dokumente na ochranu osobných údajov.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="obchodnePodmienky"
                    checked={podpisSuhlasy.obchodnePodmienky}
                    onCheckedChange={handleObchodnePodmienkyChange}
                    className="mt-1"
                  />
                  <div>
                    <Label htmlFor="obchodnePodmienky" className="text-base font-medium">Súhlas s obchodnými podmienkami</Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Potvrdzujem, že som si prečítal(a) a súhlasím s obchodnými podmienkami spoločnosti Utopia.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="dorucovanieElektronicky"
                    checked={podpisSuhlasy.dorucovanieElektronicky}
                    onCheckedChange={handleDorucovanieElektronickyChange}
                    className="mt-1"
                  />
                  <div>
                    <Label htmlFor="dorucovanieElektronicky" className="text-base font-medium">Súhlas s doručovaním elektronicky</Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Súhlasím s doručovaním všetkých dokumentov a komunikácie elektronickou formou na uvedenú e-mailovú adresu.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Zmluva</h3>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handleViewContract}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Náhľad zmluvy
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleDownloadContract}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Stiahnuť zmluvu
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Podpis klienta</h4>
                  <SignatureCanvas onSave={setSignatureClient} />
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Podpis poskytovateľa</h4>
                  <SignatureCanvas onSave={setSignatureProvider} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-center">
            <Button 
              onClick={handleSubmit}
              disabled={!podpisSuhlasy.gdpr || !podpisSuhlasy.obchodnePodmienky || !podpisSuhlasy.dorucovanieElektronicky || !signatureClient || !signatureProvider}
              className="bg-utopia-600 hover:bg-utopia-700 px-10"
            >
              Dokončiť onboarding
            </Button>
          </div>
          
          <AlertDialog open={contractPreviewOpen} onOpenChange={setContractPreviewOpen}>
            <AlertDialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
              <AlertDialogHeader>
                <AlertDialogTitle>Náhľad zmluvy</AlertDialogTitle>
                <AlertDialogDescription>
                  <div className="mt-4 space-y-4">
                    <div className="p-4 border rounded-md bg-gray-50">
                      <h3 className="text-center font-bold mb-4">ZMLUVA O POSKYTOVANÍ SLUŽIEB</h3>
                      <p className="mb-2"><strong>Poskytovateľ:</strong> Utopia, a.s.</p>
                      <p className="mb-2"><strong>Adresa:</strong> Technologická 6, 851 01 Bratislava</p>
                      <p className="mb-2"><strong>IČO:</strong> 12345678</p>
                      <p className="mb-4"><strong>DIČ:</strong> 2023456789</p>
                      
                      <p className="mb-2"><strong>Obchodník:</strong> {data.company.nazovSpolocnosti}</p>
                      <p className="mb-2"><strong>IČO:</strong> {data.company.ico}</p>
                      <p className="mb-2"><strong>DIČ:</strong> {data.company.dic}</p>
                      <p className="mb-2"><strong>IČ DPH:</strong> {data.company.icDph}</p>
                      <p className="mb-4"><strong>Sídlo:</strong> {data.company.sidlo}</p>
                      
                      <div className="mb-4">
                        <h4 className="font-bold">1. PREDMET ZMLUVY</h4>
                        <p>Predmetom tejto zmluvy je poskytovanie finančných služieb a riešení pre obchodníka v rozsahu špecifikovanom v tejto zmluve a jej prílohách.</p>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-bold">2. VYBRANÉ PRODUKTY A SLUŽBY</h4>
                        <p>
                          <strong>Zariadenia:</strong> {data.zariadenia.filter(z => z.selected).map(z => z.nazov).join(", ") || "Žiadne"}
                        </p>
                        <p>
                          <strong>Licencie:</strong> {data.licencie.filter(l => l.selected).map(l => l.nazov).join(", ") || "Žiadne"}
                        </p>
                        <p>
                          <strong>Platobné metódy:</strong> {data.platobneMetody.filter(p => p.selected).map(p => p.nazov).join(", ") || "Žiadne"}
                        </p>
                        <p>
                          <strong>Doplnkové služby:</strong> {data.doplnkoveSluzby.filter(d => d.selected).map(d => d.nazov).join(", ") || "Žiadne"}
                        </p>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-bold">3. FAKTURAČNÉ ÚDAJE</h4>
                        <p><strong>Fakturačný email:</strong> {data.fakturacneUdaje.fakturacnyEmail}</p>
                        <p><strong>Fakturačná adresa:</strong> {data.fakturacneUdaje.fakturacnaAdresa}</p>
                        <p><strong>IBAN:</strong> {data.fakturacneUdaje.iban}</p>
                        <p><strong>Spôsob úhrady:</strong> {data.fakturacneUdaje.sposobUhrady}</p>
                        <p><strong>Frekvencia:</strong> {data.fakturacneUdaje.frekvencia}</p>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-bold">4. DOBA TRVANIA</h4>
                        <p>Táto zmluva sa uzatvára na dobu neurčitú s minimálnou dobou trvania 24 mesiacov od podpisu tejto zmluvy.</p>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-bold">5. ZÁVEREČNÉ USTANOVENIA</h4>
                        <p>Táto zmluva nadobúda platnosť a účinnosť dňom jej podpisu oboma zmluvnými stranami.</p>
                        <p>Zmluva je vyhotovená v dvoch rovnopisoch, pričom každá zmluvná strana obdrží jeden rovnopis.</p>
                      </div>
                      
                      <div className="mt-8 mb-4">
                        <p><strong>Dátum:</strong> {new Date().toLocaleDateString('sk-SK')}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <p className="text-center"><strong>Za poskytovateľa</strong></p>
                          <div className="h-20 border-b border-dashed mt-4 mb-2"></div>
                          <p className="text-center">Utopia, a.s.</p>
                        </div>
                        <div>
                          <p className="text-center"><strong>Za obchodníka</strong></p>
                          <div className="h-20 border-b border-dashed mt-4 mb-2"></div>
                          <p className="text-center">{data.company.nazovSpolocnosti}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={handleCloseContractPreview}>Zavrieť</Button>
                <Button onClick={handleDownloadContract} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Stiahnuť zmluvu
                </Button>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 animate-scale-in">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="h-8 w-8 text-white" />
              </div>
            </div>
            
            {/* Confetti elements */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full animate-confetti"
                style={{
                  backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"][i % 5],
                  top: "50%",
                  left: "50%",
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${1 + Math.random() * 1}s`
                }}
              />
            ))}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Onboarding úspešne dokončený!</h2>
          <p className="text-gray-500 mb-6">Vaša zmluva bola podpísaná a odoslaná.</p>
          
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={handleDownloadContract}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Stiahnuť zmluvu
            </Button>
            
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-utopia-600 hover:bg-utopia-700"
            >
              Späť na hlavnú stránku
            </Button>
          </div>
        </div>
      )}
    </StepContainer>
  );
};
