
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Save, X, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface DocumentFormProps {
  document?: {
    id?: number;
    name: string;
    type: string;
    productId?: number | null;
    supplierId?: number | null;
    expiryDate?: Date | null;
    description?: string;
  };
  products: Array<{ id: number, name: string }>;
  suppliers: Array<{ id: number, name: string }>;
  onSave: (documentData: any) => void;
  onCancel: () => void;
}

const documentTypes = [
  { value: "certification", label: "Certification" },
  { value: "technical_sheet", label: "Fiche technique" },
  { value: "certificate", label: "Certificat d'analyse" },
  { value: "declaration", label: "Déclaration" },
  { value: "report", label: "Rapport d'audit" },
  { value: "other", label: "Autre" }
];

export default function DocumentForm({ 
  document, 
  products, 
  suppliers, 
  onSave, 
  onCancel 
}: DocumentFormProps) {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: document?.name || "",
    type: document?.type || "",
    productId: document?.productId?.toString() || "",
    supplierId: document?.supplierId?.toString() || "",
    expiryDate: document?.expiryDate || null,
    description: document?.description || "",
    file: null as File | null,
  });
  
  // Gérer les changements dans les champs du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Gérer les changements dans les champs select
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Gérer les changements de date
  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, expiryDate: date || null }));
  };
  
  // Gérer les fichiers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };
  
  // Gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérifier que les champs obligatoires sont remplis
    if (!formData.name || !formData.type) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }
    
    // Simuler l'envoi du document
    onSave({
      ...formData,
      productId: formData.productId ? parseInt(formData.productId) : null,
      supplierId: formData.supplierId ? parseInt(formData.supplierId) : null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Nom du document *
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium">
              Type de document *
            </label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Sélectionnez un type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="expiryDate" className="text-sm font-medium">
              Date d'expiration
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.expiryDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.expiryDate ? (
                    format(formData.expiryDate, "dd/MM/yyyy", { locale: fr })
                  ) : (
                    <span>Sélectionner une date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.expiryDate || undefined}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="file" className="text-sm font-medium">
              Fichier
            </label>
            <Input
              id="file"
              name="file"
              type="file"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            <p className="text-xs text-muted-foreground">
              Formats acceptés: PDF, JPG, PNG (max 10 Mo)
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="product" className="text-sm font-medium">
              Produit associé
            </label>
            <Select
              value={formData.productId}
              onValueChange={(value) => handleSelectChange("productId", value)}
            >
              <SelectTrigger id="productId">
                <SelectValue placeholder="Sélectionner un produit (optionnel)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Aucun produit</SelectItem>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="supplier" className="text-sm font-medium">
              Fournisseur associé
            </label>
            <Select
              value={formData.supplierId}
              onValueChange={(value) => handleSelectChange("supplierId", value)}
            >
              <SelectTrigger id="supplierId">
                <SelectValue placeholder="Sélectionner un fournisseur (optionnel)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Aucun fournisseur</SelectItem>
                {suppliers.map((supplier) => (
                  <SelectItem key={supplier.id} value={supplier.id.toString()}>
                    {supplier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="mr-2 h-4 w-4" />
          Annuler
        </Button>
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          {document?.id ? "Mettre à jour" : "Enregistrer le document"}
        </Button>
      </div>
    </form>
  );
}
