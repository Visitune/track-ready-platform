
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductFormProps {
  product?: {
    id?: number;
    name: string;
    code: string;
    category: string;
    type: string;
    description: string;
    price?: number;
    moq?: number;
  };
  onSave: (productData: any) => void;
  onCancel: () => void;
}

const categories = [
  "Emballages",
  "Matières Premières",
  "Ingrédients",
  "Étiquettes",
  "Accessoires"
];

const types = {
  "Emballages": ["Verre", "Plastique", "Carton", "Papier", "Étiquettes", "Autres"],
  "Matières Premières": ["Huiles essentielles", "Extraits végétaux", "Vitamines", "Beurres végétaux", "Autres"],
  "Ingrédients": ["Actifs", "Conservateurs", "Texturants", "Parfums", "Colorants", "Autres"],
  "Étiquettes": ["Papier", "Plastique", "Adhésif", "Autres"],
  "Accessoires": ["Applicateurs", "Bouchons", "Pompes", "Autres"]
};

export default function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: product?.name || "",
    code: product?.code || "",
    category: product?.category || "",
    type: product?.type || "",
    description: product?.description || "",
    price: product?.price?.toString() || "",
    moq: product?.moq?.toString() || ""
  });
  
  // Gérer les changements dans les champs du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Gérer les changements dans les champs select
  const handleSelectChange = (name: string, value: string) => {
    if (name === "category") {
      // Réinitialiser le type si on change de catégorie
      setFormData((prev) => ({ ...prev, category: value, type: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  // Gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.code || !formData.category) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }
    
    // Convertir les valeurs numériques
    const productData = {
      ...formData,
      price: formData.price ? parseFloat(formData.price) : undefined,
      moq: formData.moq ? parseInt(formData.moq) : undefined,
    };
    
    // Appeler la fonction onSave
    onSave(productData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Nom du produit *
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
            <label htmlFor="code" className="text-sm font-medium">
              Code référence *
            </label>
            <Input
              id="code"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Catégorie *
            </label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Sélectionnez une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium">
              Type
            </label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleSelectChange("type", value)}
              disabled={!formData.category}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Sélectionnez un type" />
              </SelectTrigger>
              <SelectContent>
                {formData.category && types[formData.category as keyof typeof types]?.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium">
              Prix unitaire (€)
            </label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="moq" className="text-sm font-medium">
              Quantité minimum (MOQ)
            </label>
            <Input
              id="moq"
              name="moq"
              type="number"
              min="0"
              value={formData.moq}
              onChange={handleInputChange}
            />
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
          {product?.id ? "Mettre à jour" : "Créer le produit"}
        </Button>
      </div>
    </form>
  );
}
