
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, Plus, Trash2, Upload } from 'lucide-react';
import { StepContainer } from '../StepContainer';
import { BackButton } from '../BackButton';
import { NextButton } from '../NextButton';
import { cn } from '@/lib/utils';
import { Osoba, OpravnenaOsoba } from '@/types/onboarding';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export const StepPersons: React.FC = () => {
  const { t } = useLanguage();
  const { 
    data, 
    addObchodnaOsoba,
    updateObchodnaOsoba,
    removeObchodnaOsoba,
    addTechnickaOsoba,
    updateTechnickaOsoba,
    removeTechnickaOsoba,
    addOpravnenaOsoba,
    updateOpravnenaOsoba,
    removeOpravnenaOsoba,
    isStepComplete,
    nextStep,
    prevStep
  } = useOnboarding();
  
  const [activeTab, setActiveTab] = useState('obchodne');
  const [documentUploads, setDocumentUploads] = useState<Record<string, { id: string, name: string, size: number }[]>>({});
  
  const handleAddObchodnaOsoba = () => {
    const newOsoba: Osoba = {
      id: uuidv4(),
      meno: '',
      email: '',
      telefon: '',
      funkcia: '',
      prevadzkaId: data.prevadzky?.[0]?.id
    };
    
    addObchodnaOsoba(newOsoba);
  };
  
  const handleAddTechnickaOsoba = () => {
    const newOsoba: Osoba = {
      id: uuidv4(),
      meno: '',
      email: '',
      telefon: '',
      funkcia: '',
      prevadzkaId: data.prevadzky?.[0]?.id
    };
    
    addTechnickaOsoba(newOsoba);
  };

  const handleAddOpravnenaOsoba = () => {
    // Check if we already have the maximum number of authorized persons (4)
    if (data.opravneneOsoby && data.opravneneOsoby.length >= 4) {
      toast.error("Môžete pridať maximálne 4 oprávnené osoby");
      return;
    }
    
    const newOsoba: OpravnenaOsoba = {
      id: uuidv4(),
      meno: '',
      funkcia: 'konateľ',
      datumNarodenia: new Date(),
      rodneCislo: '',
      obcianstvo: 'Slovenská republika',
      adresaTrvalehoBydliska: '',
      cisloDokladu: '',
      platnostDokladu: new Date(),
      typDokladu: 'Občiansky preukaz',
      politickyExponovana: false,
      email: '',
      telefon: '',
      prevadzkaId: data.prevadzky?.[0]?.id,
      dokumenty: []
    };
    
    addOpravnenaOsoba(newOsoba);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, id: string, type: string) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const newDocument = { id: type, name: file.name, size: file.size };
      
      // Update document uploads state
      setDocumentUploads(prev => ({
        ...prev,
        [id]: [...(prev[id] || []), newDocument]
      }));
      
      // In a real app, you would upload the file to a server here
      toast.success(`Dokument ${file.name} bol úspešne nahraný`);
      
      // Reset file input
      event.target.value = '';
    }
  };
  
  const removeDocument = (osobaId: string, docIndex: number) => {
    setDocumentUploads(prev => {
      const updatedDocs = [...(prev[osobaId] || [])];
      updatedDocs.splice(docIndex, 1);
      return { ...prev, [osobaId]: updatedDocs };
    });
  };
  
  return (
    <StepContainer
      title="Kontaktné osoby"
      subtitle="Zadajte informácie o osobách zodpovedných za spoluprácu"
    >
      <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-slate-200 dark:border-slate-700">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-6">Kontaktné osoby</h2>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="obchodne">Obchodné kontaktné osoby</TabsTrigger>
              <TabsTrigger value="technicke">Technické kontaktné osoby</TabsTrigger>
              <TabsTrigger value="opravnene">Oprávnené osoby na podpis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="obchodne">
              <div className="space-y-6">
                {data.obchodneOsoby && data.obchodneOsoby.length > 0 ? (
                  data.obchodneOsoby.map((osoba) => (
                    <Card key={osoba.id} className="border-slate-300 dark:border-slate-700 p-4 mb-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-medium">Obchodná kontaktná osoba</h3>
                        {data.obchodneOsoby.length > 1 && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeObchodnaOsoba(osoba.id)}
                            className="text-slate-400 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor={`obchodne-${osoba.id}-meno`}>Meno a priezvisko</Label>
                            <Input 
                              id={`obchodne-${osoba.id}-meno`}
                              value={osoba.meno}
                              onChange={(e) => updateObchodnaOsoba(osoba.id, { meno: e.target.value })}
                              placeholder="Meno a priezvisko"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`obchodne-${osoba.id}-funkcia`}>Funkcia</Label>
                            <Input 
                              id={`obchodne-${osoba.id}-funkcia`}
                              value={osoba.funkcia || ""}
                              onChange={(e) => updateObchodnaOsoba(osoba.id, { funkcia: e.target.value })}
                              placeholder="Pozícia v spoločnosti"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor={`obchodne-${osoba.id}-telefon`}>Telefónne číslo</Label>
                            <Input 
                              id={`obchodne-${osoba.id}-telefon`}
                              value={osoba.telefon}
                              onChange={(e) => updateObchodnaOsoba(osoba.id, { telefon: e.target.value })}
                              placeholder="+421"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`obchodne-${osoba.id}-email`}>E-mail</Label>
                            <Input 
                              id={`obchodne-${osoba.id}-email`}
                              type="email"
                              value={osoba.email}
                              onChange={(e) => updateObchodnaOsoba(osoba.id, { email: e.target.value })}
                              placeholder="email@spolocnost.sk"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`obchodne-${osoba.id}-prevadzka`}>Prevádzka</Label>
                          <Select 
                            value={osoba.prevadzkaId} 
                            onValueChange={(value) => updateObchodnaOsoba(osoba.id, { prevadzkaId: value })}
                          >
                            <SelectTrigger id={`obchodne-${osoba.id}-prevadzka`}>
                              <SelectValue placeholder="Vyberte prevádzku" />
                            </SelectTrigger>
                            <SelectContent>
                              {data.prevadzky?.map(prevadzka => (
                                <SelectItem key={prevadzka.id} value={prevadzka.id}>
                                  {prevadzka.nazovPrevadzky || "Prevádzka " + (data.prevadzky.indexOf(prevadzka) + 1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 border border-dashed rounded-lg border-slate-300 dark:border-slate-700">
                    <p className="text-slate-500 mb-4">Zatiaľ nie sú pridané žiadne obchodné kontaktné osoby</p>
                  </div>
                )}
                
                <Button 
                  type="button" 
                  variant="outline"
                  className="flex items-center border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-300"
                  onClick={handleAddObchodnaOsoba}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Pridať obchodnú kontaktnú osobu
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="technicke">
              <div className="space-y-6">
                {data.technickeOsoby && data.technickeOsoby.length > 0 ? (
                  data.technickeOsoby.map((osoba) => (
                    <Card key={osoba.id} className="border-slate-300 dark:border-slate-700 p-4 mb-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-medium">Technická kontaktná osoba</h3>
                        {data.technickeOsoby.length > 1 && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeTechnickaOsoba(osoba.id)}
                            className="text-slate-400 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor={`technicke-${osoba.id}-meno`}>Meno a priezvisko</Label>
                            <Input 
                              id={`technicke-${osoba.id}-meno`}
                              value={osoba.meno}
                              onChange={(e) => updateTechnickaOsoba(osoba.id, { meno: e.target.value })}
                              placeholder="Meno a priezvisko"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`technicke-${osoba.id}-funkcia`}>Funkcia</Label>
                            <Input 
                              id={`technicke-${osoba.id}-funkcia`}
                              value={osoba.funkcia || ""}
                              onChange={(e) => updateTechnickaOsoba(osoba.id, { funkcia: e.target.value })}
                              placeholder="Pozícia v spoločnosti"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor={`technicke-${osoba.id}-telefon`}>Telefónne číslo</Label>
                            <Input 
                              id={`technicke-${osoba.id}-telefon`}
                              value={osoba.telefon}
                              onChange={(e) => updateTechnickaOsoba(osoba.id, { telefon: e.target.value })}
                              placeholder="+421"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`technicke-${osoba.id}-email`}>E-mail</Label>
                            <Input 
                              id={`technicke-${osoba.id}-email`}
                              type="email"
                              value={osoba.email}
                              onChange={(e) => updateTechnickaOsoba(osoba.id, { email: e.target.value })}
                              placeholder="email@spolocnost.sk"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`technicke-${osoba.id}-prevadzka`}>Prevádzka</Label>
                          <Select 
                            value={osoba.prevadzkaId} 
                            onValueChange={(value) => updateTechnickaOsoba(osoba.id, { prevadzkaId: value })}
                          >
                            <SelectTrigger id={`technicke-${osoba.id}-prevadzka`}>
                              <SelectValue placeholder="Vyberte prevádzku" />
                            </SelectTrigger>
                            <SelectContent>
                              {data.prevadzky?.map(prevadzka => (
                                <SelectItem key={prevadzka.id} value={prevadzka.id}>
                                  {prevadzka.nazovPrevadzky || "Prevádzka " + (data.prevadzky.indexOf(prevadzka) + 1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 border border-dashed rounded-lg border-slate-300 dark:border-slate-700">
                    <p className="text-slate-500 mb-4">Zatiaľ nie sú pridané žiadne technické kontaktné osoby</p>
                  </div>
                )}
                
                <Button 
                  type="button" 
                  variant="outline"
                  className="flex items-center border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-300"
                  onClick={handleAddTechnickaOsoba}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Pridať technickú kontaktnú osobu
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="opravnene">
              <div className="space-y-6">
                {data.opravneneOsoby && data.opravneneOsoby.length > 0 ? (
                  data.opravneneOsoby.map((osoba) => (
                    <Card key={osoba.id} className="border-slate-300 dark:border-slate-700 p-4 mb-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-medium">Oprávnená osoba</h3>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeOpravnenaOsoba(osoba.id)}
                          className="text-slate-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor={`opravnene-${osoba.id}-meno`}>Meno a priezvisko</Label>
                          <Input 
                            id={`opravnene-${osoba.id}-meno`}
                            value={osoba.meno}
                            onChange={(e) => updateOpravnenaOsoba(osoba.id, { meno: e.target.value })}
                            placeholder="Meno a priezvisko"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`opravnene-${osoba.id}-funkcia`}>Funkcia</Label>
                          <Select 
                            value={osoba.funkcia} 
                            onValueChange={(value) => updateOpravnenaOsoba(osoba.id, { funkcia: value })}
                          >
                            <SelectTrigger id={`opravnene-${osoba.id}-funkcia`}>
                              <SelectValue placeholder="Vyberte funkciu" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="konateľ">Konateľ</SelectItem>
                              <SelectItem value="predseda predstavenstva">Predseda predstavenstva</SelectItem>
                              <SelectItem value="člen predstavenstva">Člen predstavenstva</SelectItem>
                              <SelectItem value="prokurista">Prokurista</SelectItem>
                              <SelectItem value="splnomocnená osoba">Splnomocnená osoba</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor={`opravnene-${osoba.id}-datum`}>Dátum narodenia</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id={`opravnene-${osoba.id}-datum`}
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !osoba.datumNarodenia && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {osoba.datumNarodenia ? format(new Date(osoba.datumNarodenia), "dd.MM.yyyy") : <span>Vyberte dátum</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={new Date(osoba.datumNarodenia)}
                                onSelect={(date) => date && updateOpravnenaOsoba(osoba.id, { datumNarodenia: date })}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`opravnene-${osoba.id}-rodne`}>Rodné číslo</Label>
                          <Input 
                            id={`opravnene-${osoba.id}-rodne`}
                            value={osoba.rodneCislo}
                            onChange={(e) => updateOpravnenaOsoba(osoba.id, { rodneCislo: e.target.value })}
                            placeholder="Napr. 123456/7890"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor={`opravnene-${osoba.id}-obcianstvo`}>Občianstvo</Label>
                          <Select 
                            value={osoba.obcianstvo} 
                            onValueChange={(value) => updateOpravnenaOsoba(osoba.id, { obcianstvo: value })}
                          >
                            <SelectTrigger id={`opravnene-${osoba.id}-obcianstvo`}>
                              <SelectValue placeholder="Vyberte občianstvo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Slovenská republika">Slovenská republika</SelectItem>
                              <SelectItem value="Česká republika">Česká republika</SelectItem>
                              <SelectItem value="Maďarsko">Maďarsko</SelectItem>
                              <SelectItem value="Poľsko">Poľsko</SelectItem>
                              <SelectItem value="Rakúsko">Rakúsko</SelectItem>
                              <SelectItem value="Nemecko">Nemecko</SelectItem>
                              <SelectItem value="Veľká Británia">Veľká Británia</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`opravnene-${osoba.id}-adresa`}>Adresa trvalého bydliska</Label>
                          <Input 
                            id={`opravnene-${osoba.id}-adresa`}
                            value={osoba.adresaTrvalehoBydliska}
                            onChange={(e) => updateOpravnenaOsoba(osoba.id, { adresaTrvalehoBydliska: e.target.value })}
                            placeholder="Ulica, číslo, mesto, PSČ"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor={`opravnene-${osoba.id}-typ-dokladu`}>Typ dokladu</Label>
                          <Select 
                            value={osoba.typDokladu} 
                            onValueChange={(value: "Občiansky preukaz" | "Pas") => updateOpravnenaOsoba(osoba.id, { typDokladu: value })}
                          >
                            <SelectTrigger id={`opravnene-${osoba.id}-typ-dokladu`}>
                              <SelectValue placeholder="Typ dokladu" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Občiansky preukaz">Občiansky preukaz</SelectItem>
                              <SelectItem value="Pas">Cestovný pas</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`opravnene-${osoba.id}-cislo-dokladu`}>Číslo dokladu</Label>
                          <Input 
                            id={`opravnene-${osoba.id}-cislo-dokladu`}
                            value={osoba.cisloDokladu}
                            onChange={(e) => updateOpravnenaOsoba(osoba.id, { cisloDokladu: e.target.value })}
                            placeholder="Číslo dokladu totožnosti"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`opravnene-${osoba.id}-platnost-dokladu`}>Platnosť dokladu</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id={`opravnene-${osoba.id}-platnost-dokladu`}
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !osoba.platnostDokladu && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {osoba.platnostDokladu ? format(new Date(osoba.platnostDokladu), "dd.MM.yyyy") : <span>Vyberte dátum</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={new Date(osoba.platnostDokladu)}
                                onSelect={(date) => date && updateOpravnenaOsoba(osoba.id, { platnostDokladu: date })}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <Label htmlFor={`opravnene-${osoba.id}-prevadzka`}>Prevádzka</Label>
                        <Select 
                          value={osoba.prevadzkaId} 
                          onValueChange={(value) => updateOpravnenaOsoba(osoba.id, { prevadzkaId: value })}
                        >
                          <SelectTrigger id={`opravnene-${osoba.id}-prevadzka`}>
                            <SelectValue placeholder="Vyberte prevádzku" />
                          </SelectTrigger>
                          <SelectContent>
                            {data.prevadzky?.map(prevadzka => (
                              <SelectItem key={prevadzka.id} value={prevadzka.id}>
                                {prevadzka.nazovPrevadzky || "Prevádzka " + (data.prevadzky.indexOf(prevadzka) + 1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="mt-6">
                        <Label>Nahrať doklady</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div className="border rounded-lg p-4 border-dashed border-slate-300 dark:border-slate-700">
                            <Label htmlFor={`opravnene-${osoba.id}-doklad-id`} className="cursor-pointer flex flex-col items-center justify-center space-y-2 py-4">
                              <Upload className="h-8 w-8 text-slate-400" />
                              <span className="text-sm font-medium">Doklad totožnosti</span>
                              <span className="text-xs text-slate-500">Nahrajte sken alebo fotku dokladu</span>
                            </Label>
                            <Input 
                              id={`opravnene-${osoba.id}-doklad-id`}
                              type="file"
                              className="hidden"
                              onChange={(e) => handleFileChange(e, osoba.id, "id")}
                              accept="image/jpeg,image/png,application/pdf"
                            />
                          </div>
                          
                          <div className="border rounded-lg p-4 border-dashed border-slate-300 dark:border-slate-700">
                            <Label htmlFor={`opravnene-${osoba.id}-vypis-OR`} className="cursor-pointer flex flex-col items-center justify-center space-y-2 py-4">
                              <Upload className="h-8 w-8 text-slate-400" />
                              <span className="text-sm font-medium">Výpis z obchodného registra</span>
                              <span className="text-xs text-slate-500">Nahrajte aktuálny výpis z OR</span>
                            </Label>
                            <Input 
                              id={`opravnene-${osoba.id}-vypis-OR`}
                              type="file"
                              className="hidden"
                              onChange={(e) => handleFileChange(e, osoba.id, "or")}
                              accept="image/jpeg,image/png,application/pdf"
                            />
                          </div>
                        </div>
                        
                        {/* Display uploaded documents */}
                        {documentUploads[osoba.id] && documentUploads[osoba.id].length > 0 && (
                          <div className="mt-4">
                            <Label className="mb-2 block">Nahrané dokumenty</Label>
                            <div className="space-y-2">
                              {documentUploads[osoba.id].map((doc, docIndex) => (
                                <div key={docIndex} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 p-2 rounded-md">
                                  <div>
                                    <span className="text-sm font-medium">{doc.name}</span>
                                    <span className="text-xs text-slate-500 ml-2">
                                      ({(doc.size / 1024).toFixed(1)} KB)
                                    </span>
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => removeDocument(osoba.id, docIndex)}
                                    className="text-slate-400 hover:text-red-500"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-6">
                        <Switch
                          id={`opravnene-${osoba.id}-politicky`}
                          checked={osoba.politickyExponovana}
                          onCheckedChange={(checked) => updateOpravnenaOsoba(osoba.id, { politickyExponovana: checked })}
                        />
                        <Label htmlFor={`opravnene-${osoba.id}-politicky`}>Politicky exponovaná osoba</Label>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 border border-dashed rounded-lg border-slate-300 dark:border-slate-700">
                    <p className="text-slate-500 mb-4">Zatiaľ nie sú pridané žiadne oprávnené osoby</p>
                  </div>
                )}
                
                <Button 
                  type="button" 
                  variant="outline"
                  className="flex items-center border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-300"
                  onClick={handleAddOpravnenaOsoba}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Pridať oprávnenú osobu
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-between">
        <BackButton onClick={prevStep} />
        <NextButton 
          onClick={nextStep}
          disabled={!isStepComplete('persons')}
        />
      </div>
    </StepContainer>
  );
};
