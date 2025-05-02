
import React from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProductForm from "@/components/products/ProductForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NewProduct() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Gérer la création d'un produit
  const handleSave = (productData: any) => {
    toast({
      title: "Produit créé",
      description: `Le produit ${productData.name} a été créé avec succès.`,
    });
    navigate("/produits");
  };
  
  // Gérer l'annulation
  const handleCancel = () => {
    navigate("/produits");
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link to="/produits">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              Nouveau produit
            </h1>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Informations du produit</CardTitle>
            <CardDescription>
              Ajoutez les informations du nouveau produit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProductForm 
              onSave={handleSave} 
              onCancel={handleCancel} 
            />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
