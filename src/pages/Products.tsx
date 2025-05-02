
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, MoreHorizontal, Filter, Eye, Edit, Trash2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";

const products = [
  {
    id: 1,
    name: "Flacon en verre 250ml",
    code: "EMB-V250",
    category: "Emballages",
    type: "Verre",
    suppliers: 2,
    documents: 5,
  },
  {
    id: 2,
    name: "Bouchon RPET 28mm",
    code: "EMB-B028R",
    category: "Emballages",
    type: "Plastique",
    suppliers: 3,
    documents: 8,
  },
  {
    id: 3,
    name: "Huile essentielle de lavande",
    code: "MP-HEL-100",
    category: "Matières Premières",
    type: "Huiles essentielles",
    suppliers: 4,
    documents: 12,
  },
  {
    id: 4,
    name: "Extrait d'aloe vera bio",
    code: "MP-EAV-50",
    category: "Matières Premières",
    type: "Extraits végétaux",
    suppliers: 2,
    documents: 7,
  },
  {
    id: 5,
    name: "Carton recyclé 3 unités",
    code: "EMB-CR3",
    category: "Emballages",
    type: "Carton",
    suppliers: 1,
    documents: 3,
  },
  {
    id: 6,
    name: "Étiquette papier kraft",
    code: "EMB-ETI-PK",
    category: "Emballages",
    type: "Étiquettes",
    suppliers: 2,
    documents: 4,
  },
  {
    id: 7,
    name: "Vitamine C pure",
    code: "MP-VC-100",
    category: "Matières Premières",
    type: "Vitamines",
    suppliers: 3,
    documents: 10,
  },
  {
    id: 8,
    name: "Beurre de karité bio",
    code: "MP-BK-500",
    category: "Matières Premières",
    type: "Beurres végétaux",
    suppliers: 2,
    documents: 6,
  },
];

export default function Products() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filtrer les produits en fonction du terme de recherche
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Naviguer vers la page de détail d'un produit
  const handleViewDetails = (id: number) => {
    navigate(`/produits/${id}`);
  };
  
  // Naviguer vers la page d'édition d'un produit
  const handleEdit = (id: number) => {
    navigate(`/produits/${id}`);
  };
  
  // Naviguer vers la page des documents d'un produit
  const handleViewDocuments = (id: number) => {
    navigate(`/produits/${id}`, { state: { tab: 'documents' } });
  };
  
  // Supprimer un produit
  const handleDelete = (id: number, name: string) => {
    toast({
      title: "Produit supprimé",
      description: `Le produit ${name} a été supprimé.`,
      variant: "destructive",
    });
  };
  
  // Naviguer vers le formulaire de création d'un nouveau produit
  const handleNewProduct = () => {
    navigate("/produits/nouveau");
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="dashboard-title">Produits</h1>
        <Button className="flex items-center gap-2" onClick={handleNewProduct}>
          <Plus className="h-4 w-4" />
          <span>Nouveau produit</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Liste des produits</CardTitle>
          <CardDescription>
            Gérez tous vos produits et leurs exigences documentaires
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un produit..."
                className="w-full pl-8 md:max-w-md bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filtres</span>
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Fournisseurs</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead className="w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.code}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell>{product.type}</TableCell>
                    <TableCell>{product.suppliers}</TableCell>
                    <TableCell>{product.documents}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewDetails(product.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Voir détails
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(product.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewDocuments(product.id)}>
                            <FileText className="mr-2 h-4 w-4" />
                            Voir documents
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DeleteConfirmationDialog
                            title="Supprimer ce produit ?"
                            description="Cette action ne peut pas être annulée. Cela supprimera définitivement ce produit et toutes les données associées."
                            itemName={product.name}
                            onConfirm={() => handleDelete(product.id, product.name)}
                            triggerButtonText="Supprimer"
                            triggerButtonProps={{ 
                              className: "w-full justify-start font-normal text-sm px-2 py-1.5 text-red-600", 
                              variant: "ghost" 
                            }}
                          >
                            <div className="flex items-center text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Supprimer
                            </div>
                          </DeleteConfirmationDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredProducts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Aucun résultat trouvé.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
