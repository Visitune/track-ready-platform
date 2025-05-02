
import React from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DocumentForm from "@/components/documents/DocumentForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Données d'exemple pour les fournisseurs
const suppliers = [
  { id: 1, name: "Fournitures Pro SAS" },
  { id: 2, name: "EcoPack GmbH" },
  { id: 3, name: "Matières Premières Inc." },
  { id: 4, name: "FoodTech Solutions" },
  { id: 5, name: "Organic Supplies Ltd" },
];

// Données d'exemple pour les produits
const products = [
  { id: 1, name: "Flacon en verre 250ml" },
  { id: 2, name: "Bouchon RPET 28mm" },
  { id: 3, name: "Huile essentielle de lavande" },
  { id: 4, name: "Extrait d'aloe vera bio" },
  { id: 5, name: "Carton recyclé 3 unités" },
];

export default function NewDocument() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Gérer la création d'un document
  const handleSave = (documentData: any) => {
    toast({
      title: "Document créé",
      description: `Le document ${documentData.name} a été créé avec succès.`,
    });
    navigate("/documents");
  };
  
  // Gérer l'annulation
  const handleCancel = () => {
    navigate("/documents");
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link to="/documents">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              Nouveau document
            </h1>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Informations du document</CardTitle>
            <CardDescription>
              Ajoutez les informations et téléchargez votre document
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DocumentForm 
              products={products}
              suppliers={suppliers}
              onSave={handleSave} 
              onCancel={handleCancel} 
            />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
