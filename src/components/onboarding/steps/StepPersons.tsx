
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
import { cn } from '@/lib/utils';
import { OpravnenaOsoba } from '@/types/onboarding';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

export const StepPersons: React.FC = () => {
  const { t } = useLanguage();
  const { 
    data, 
    updateObchodnaOsoba, 
    updateTechnickaOsoba, 
    addOpravnenaOsoba,
    updateOpravnenaOsoba,
    removeOpravnenaOsoba,
    isStepComplete 
  } = useOnboarding();
  
  const [activeTab, setActiveTab] = useState('obchodne');
  const [newDokument, setNewDokument] = useState<{ name: string, size: number } | null>(null);
  const [documentUploads, setDocumentUploads] = useState<Record<number, { id: string, name: string, size: number }[]>>({});
  
  const handleAddOpravnenaOsoba = () => {
    // Check if we already have the maximum number of authorized persons (4)
    if (data.opravneneOsoby && data.opravneneOsoby.length >= 4) {
      toast.error("Môžete pridať maximálne 4 oprávnené osoby");
      return;
    }
    
    const newOsoba: OpravnenaOsoba = {
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
      dokumenty: []
    };
    
    addOpravnenaOsoba(newOsoba);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, type: string) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const newDocument = { id: type, name: file.name, size: file.size };
      
      // Update document uploads state
      setDocumentUploads(prev => ({
        ...prev,
        [index]: [...(prev[index] || []), newDocument]
      }));
      
      // In a real app, you would upload the file to a server here
      toast.success(`Dokument ${file.name} bol úspešne nahraný`);
      
      // Reset file input
      event.target.value = '';
    }
  };
  
  const removeDocument = (index: number, docIndex: number) => {
    setDocumentUploads(prev => {
      const updatedDocs = [...(prev[index] || [])];
      updatedDocs.splice(docIndex, 1);
      return { ...prev, [index]: updatedDocs };
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
              <TabsTrigger value="obchodne">Obchodná kontaktná osoba</TabsTrigger>
              <TabsTrigger value="technicke">Technická kontaktná osoba</TabsTrigger>
              <TabsTrigger value="opravnene">Oprávnené osoby na podpis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="obchodne">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="obchodne-meno">Meno a priezvisko</Label>
                    <Input 
                      id="obchodne-meno"
                      value={data.obchodnaOsoba.meno}
                      onChange={(e) => updateObchodnaOsoba({ meno: e.target.value })}
                      placeholder="Meno a priezvisko"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="obchodne-funkcia">Funkcia</Label>
                    <Input 
                      id="obchodne-funkcia"
                      value={data.obchodnaOsoba.funkcia || ""}
                      onChange={(e) => updateObchodnaOsoba({ funkcia: e.target.value })}
                      placeholder="Pozícia v spoločnosti"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="obchodne-telefon">Telefónne číslo</Label>
                    <Input 
                      id="obchodne-telefon"
                      value={data.obchodnaOsoba.telefon}
                      onChange={(e) => updateObchodnaOsoba({ telefon: e.target.value })}
                      placeholder="+421"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="obchodne-email">E-mail</Label>
                    <Input 
                      id="obchodne-email"
                      type="email"
                      value={data.obchodnaOsoba.email}
                      onChange={(e) => updateObchodnaOsoba({ email: e.target.value })}
                      placeholder="email@spolocnost.sk"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="technicke">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="technicke-meno">Meno a priezvisko</Label>
                    <Input 
                      id="technicke-meno"
                      value={data.technickaOsoba.meno}
                      onChange={(e) => updateTechnickaOsoba({ meno: e.target.value })}
                      placeholder="Meno a priezvisko"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="technicke-funkcia">Funkcia</Label>
                    <Input 
                      id="technicke-funkcia"
                      value={data.technickaOsoba.funkcia || ""}
                      onChange={(e) => updateTechnickaOsoba({ funkcia: e.target.value })}
                      placeholder="Pozícia v spoločnosti"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="technicke-telefon">Telefónne číslo</Label>
                    <Input 
                      id="technicke-telefon"
                      value={data.technickaOsoba.telefon}
                      onChange={(e) => updateTechnickaOsoba({ telefon: e.target.value })}
                      placeholder="+421"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="technicke-email">E-mail</Label>
                    <Input 
                      id="technicke-email"
                      type="email"
                      value={data.technickaOsoba.email}
                      onChange={(e) => updateTechnickaOsoba({ email: e.target.value })}
                      placeholder="email@spolocnost.sk"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="opravnene">
              <div className="space-y-6">
                {data.opravneneOsoby && data.opravneneOsoby.length > 0 ? (
                  data.opravneneOsoby.map((osoba, index) => (
                    <Card key={index} className="border-slate-300 dark:border-slate-700 p-4 mb-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-medium">Oprávnená osoba {index + 1}</h3>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeOpravnenaOsoba(index)}
                          className="text-slate-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor={`opravnene-${index}-meno`}>Meno a priezvisko</Label>
                          <Input 
                            id={`opravnene-${index}-meno`}
                            value={osoba.meno}
                            onChange={(e) => updateOpravnenaOsoba(index, { meno: e.target.value })}
                            placeholder="Meno a priezvisko"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`opravnene-${index}-funkcia`}>Funkcia</Label>
                          <Select 
                            value={osoba.funkcia} 
                            onValueChange={(value) => updateOpravnenaOsoba(index, { funkcia: value })}
                          >
                            <SelectTrigger id={`opravnene-${index}-funkcia`}>
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
                          <Label htmlFor={`opravnene-${index}-datum`}>Dátum narodenia</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id={`opravnene-${index}-datum`}
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
                                onSelect={(date) => date && updateOpravnenaOsoba(index, { datumNarodenia: date })}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`opravnene-${index}-rodne`}>Rodné číslo</Label>
                          <Input 
                            id={`opravnene-${index}-rodne`}
                            value={osoba.rodneCislo}
                            onChange={(e) => updateOpravnenaOsoba(index, { rodneCislo: e.target.value })}
                            placeholder="Napr. 123456/7890"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor={`opravnene-${index}-obcianstvo`}>Občianstvo</Label>
                          <Select 
                            value={osoba.obcianstvo} 
                            onValueChange={(value) => updateOpravnenaOsoba(index, { obcianstvo: value })}
                          >
                            <SelectTrigger id={`opravnene-${index}-obcianstvo`}>
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
                          <Label htmlFor={`opravnene-${index}-adresa`}>Adresa trvalého bydliska</Label>
                          <Input 
                            id={`opravnene-${index}-adresa`}
                            value={osoba.adresaTrvalehoBydliska}
                            onChange={(e) => updateOpravnenaOsoba(index, { adresaTrvalehoBydliska: e.target.value })}
                            placeholder="Ulica, číslo, mesto, PSČ"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor={`opravnene-${index}-typ-dokladu`}>Typ dokladu</Label>
                          <Select 
                            value={osoba.typDokladu} 
                            onValueChange={(value: "Občiansky preukaz" | "Pas") => updateOpravnenaOsoba(index, { typDokladu: value })}
                          >
                            <SelectTrigger id={`opravnene-${index}-typ-dokladu`}>
                              <SelectValue placeholder="Typ dokladu" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Občiansky preukaz">Občiansky preukaz</SelectItem>
                              <SelectItem value="Pas">Cestovný pas</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`opravnene-${index}-cislo-dokladu`}>Číslo dokladu</Label>
                          <Input 
                            id={`opravnene-${index}-cislo-dokladu`}
                            value={osoba.cisloDokladu}
                            onChange={(e) => updateOpravnenaOsoba(index, { cisloDokladu: e.target.value })}
                            placeholder="Číslo dokladu totožnosti"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`opravnene-${index}-platnost-dokladu`}>Platnosť dokladu</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id={`opravnene-${index}-platnost-dokladu`}
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
                                onSelect={(date) => date && updateOpravnenaOsoba(index, { platnostDokladu: date })}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Label>Nahrať doklady</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div className="border rounded-lg p-4 border-dashed border-slate-300 dark:border-slate-700">
                            <Label htmlFor={`opravnene-${index}-doklad-id`} className="cursor-pointer flex flex-col items-center justify-center space-y-2 py-4">
                              <Upload className="h-8 w-8 text-slate-400" />
                              <span className="text-sm font-medium">Doklad totožnosti</span>
                              <span className="text-xs text-slate-500">Nahrajte sken alebo fotku dokladu</span>
                            </Label>
                            <Input 
                              id={`opravnene-${index}-doklad-id`}
                              type="file"
                              className="hidden"
                              onChange={(e) => handleFileChange(e, index, "id")}
                              accept="image/jpeg,image/png,application/pdf"
                            />
                          </div>
                          
                          <div className="border rounded-lg p-4 border-dashed border-slate-300 dark:border-slate-700">
                            <Label htmlFor={`opravnene-${index}-vypis-OR`} className="cursor-pointer flex flex-col items-center justify-center space-y-2 py-4">
                              <Upload className="h-8 w-8 text-slate-400" />
                              <span className="text-sm font-medium">Výpis z obchodného registra</span>
                              <span className="text-xs text-slate-500">Nahrajte aktuálny výpis z OR</span>
                            </Label>
                            <Input 
                              id={`opravnene-${index}-vypis-OR`}
                              type="file"
                              className="hidden"
                              onChange={(e) => handleFileChange(e, index, "or")}
                              accept="image/jpeg,image/png,application/pdf"
                            />
                          </div>
                        </div>
                        
                        {/* Display uploaded documents */}
                        {documentUploads[index] && documentUploads[index].length > 0 && (
                          <div className="mt-4">
                            <Label className="mb-2 block">Nahrané dokumenty</Label>
                            <div className="space-y-2">
                              {documentUploads[index].map((doc, docIndex) => (
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
                                    onClick={() => removeDocument(index, docIndex)}
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
                          id={`opravnene-${index}-politicky`}
                          checked={osoba.politickyExponovana}
                          onCheckedChange={(checked) => updateOpravnenaOsoba(index, { politickyExponovana: checked })}
                        />
                        <Label htmlFor={`opravnene-${index}-politicky`}>Politicky exponovaná osoba</Label>
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
    </StepContainer>
  );
};
