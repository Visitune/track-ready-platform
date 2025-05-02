
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  FileText,
  ExternalLink,
  Edit,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProductForm from "@/components/products/ProductForm";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";

// Données d'exemple pour les produits
const productsData = [
  {
    id: 1,
    name: "Flacon en verre 250ml",
    code: "EMB-V250",
    category: "Emballages",
    type: "Verre",
    description: "Flacon en verre transparent de 250ml avec col 28mm",
    suppliers: [
      { id: 1, name: "Fournitures Pro SAS", price: 0.85, moq: 5000 },
      { id: 2, name: "EcoPack GmbH", price: 0.82, moq: 10000 }
    ],
    documents: [
      { id: 1, name: "Fiche technique", type: "technical_sheet", date: "15/03/2025" },
      { id: 2, name: "Déclaration de conformité", type: "declaration", date: "10/02/2025" }
    ],
    price: 0.85,
    moq: 5000
  },
  {
    id: 2,
    name: "Bouchon RPET 28mm",
    code: "EMB-B028R",
    category: "Emballages",
    type: "Plastique",
    description: "Bouchon en RPET recyclé et recyclable, diamètre 28mm compatible avec nos flacons en verre",
    suppliers: [
      { id: 2, name: "EcoPack GmbH", price: 0.25, moq: 10000 },
      { id: 7, name: "Box & Pack S.L.", price: 0.27, moq: 8000 }
    ],
    documents: [
      { id: 3, name: "Fiche technique", type: "technical_sheet", date: "20/04/2025" },
      { id: 4, name: "Déclaration REACH", type: "declaration", date: "05/10/2024" }
    ],
    price: 0.25,
    moq: 10000
  }
];

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || "0");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  
  // Trouver le produit correspondant à l'ID
  const product = productsData.find(p => p.id === productId);

  // Gérer la mise à jour du produit
  const handleSave = (productData: any) => {
    toast({
      title: "Produit mis à jour",
      description: `Les informations de ${productData.name} ont été mises à jour.`,
    });
    setEditMode(false);
  };
  
  // Gérer la suppression du produit
  const handleDelete = () => {
    toast({
      title: "Produit supprimé",
      description: `Le produit ${product?.name} a été supprimé.`,
      variant: "destructive",
    });
    navigate("/produits");
  };
  
  // Gérer l'annulation de l'édition
  const handleCancelEdit = () => {
    setEditMode(false);
  };

  // Si le produit n'est pas trouvé
  if (!product) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="text-destructive mb-4 text-5xl">404</div>
          <h1 className="text-2xl font-bold mb-2">Produit non trouvé</h1>
          <p className="text-muted-foreground mb-6">
            Le produit avec l'ID {productId} n'existe pas.
          </p>
          <Button asChild>
            <Link to="/produits">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la liste des produits
            </Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mb-6">
        {/* En-tête avec boutons de navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link to="/produits">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              {product.name}
            </h1>
            <Badge variant="outline">{product.category}</Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <DeleteConfirmationDialog
              title="Supprimer ce produit ?"
              description="Cette action ne peut pas être annulée. Cela supprimera définitivement ce produit et toutes les données associées."
              itemName={product.name}
              onConfirm={handleDelete}
            />
            
            {!editMode && (
              <Button variant="outline" onClick={() => setEditMode(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Modifier
              </Button>
            )}
          </div>
        </div>

        {editMode ? (
          <Card>
            <CardHeader>
              <CardTitle>Modifier le produit</CardTitle>
              <CardDescription>Mettez à jour les informations du produit</CardDescription>
            </CardHeader>
            <CardContent>
              <ProductForm 
                product={product} 
                onSave={handleSave} 
                onCancel={handleCancelEdit} 
              />
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Carte résumé */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Code référence
                    </div>
                    <div className="font-semibold">{product.code}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Type
                    </div>
                    <div className="font-semibold">{product.type}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Prix indicatif
                    </div>
                    <div className="font-semibold">{product.price?.toFixed(2)} €</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      MOQ
                    </div>
                    <div className="font-semibold">{product.moq}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Onglets pour différentes sections */}
            <Tabs defaultValue="details">
              <TabsList className="mb-4">
                <TabsTrigger value="details">Détails</TabsTrigger>
                <TabsTrigger value="suppliers">Fournisseurs</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              
              {/* Onglet Détails */}
              <TabsContent value="details">
                <Card>
                  <CardHeader>
                    <CardTitle>Détails du produit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {product.description && (
                        <div>
                          <h3 className="font-medium mb-2">Description</h3>
                          <p className="text-muted-foreground">{product.description}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Onglet Fournisseurs */}
              <TabsContent value="suppliers">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Fournisseurs ({product.suppliers?.length || 0})</CardTitle>
                    <Button>
                      Ajouter un fournisseur
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {product.suppliers && product.suppliers.length > 0 ? (
                      <div className="space-y-4">
                        {product.suppliers.map((supplier) => (
                          <Card key={supplier.id}>
                            <CardHeader className="py-3">
                              <div className="flex justify-between">
                                <CardTitle className="text-base">{supplier.name}</CardTitle>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => navigate(`/fournisseurs/${supplier.id}`)}
                                >
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Voir le fournisseur
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="py-2">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Prix unitaire:</span>{" "}
                                  <span className="font-medium">{supplier.price.toFixed(2)} €</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">MOQ:</span>{" "}
                                  <span className="font-medium">{supplier.moq}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        Aucun fournisseur associé à ce produit.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Onglet Documents */}
              <TabsContent value="documents">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Documents ({product.documents?.length || 0})</CardTitle>
                    <Button>
                      <FileText className="mr-2 h-4 w-4" />
                      Ajouter un document
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {product.documents && product.documents.length > 0 ? (
                      <div className="space-y-4">
                        {product.documents.map((doc) => (
                          <Card key={doc.id}>
                            <CardHeader className="py-3">
                              <CardTitle className="text-base">{doc.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="py-2">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Type:</span>{" "}
                                  <span className="font-medium capitalize">{doc.type.replace("_", " ")}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Date:</span>{" "}
                                  <span className="font-medium">{doc.date}</span>
                                </div>
                              </div>
                            </CardContent>
                            <div className="px-6 pb-4 flex justify-end">
                              <Button variant="outline" size="sm">
                                <FileText className="mr-2 h-4 w-4" />
                                Voir
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        Aucun document associé à ce produit.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </AppLayout>
  );
}
