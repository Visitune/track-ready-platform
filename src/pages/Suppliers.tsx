
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
import { Plus, Search, MoreHorizontal, Filter, Eye, Edit, Trash2, ExternalLink } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const suppliers = [
  {
    id: 1,
    name: "Fournitures Pro SAS",
    complianceRate: 98,
    country: "France",
    type: "Fabricant",
    products: 12,
    status: "conforme",
  },
  {
    id: 2,
    name: "EcoPack GmbH",
    complianceRate: 85,
    country: "Allemagne",
    type: "Fabricant",
    products: 8,
    status: "à surveiller",
  },
  {
    id: 3,
    name: "Matières Premières Inc.",
    complianceRate: 76,
    country: "Canada",
    type: "Négociant",
    products: 15,
    status: "à surveiller",
  },
  {
    id: 4,
    name: "FoodTech Solutions",
    complianceRate: 45,
    country: "États-Unis",
    type: "Fabricant",
    products: 6,
    status: "critique",
  },
  {
    id: 5,
    name: "Organic Supplies Ltd",
    complianceRate: 92,
    country: "Royaume-Uni",
    type: "Négociant",
    products: 4,
    status: "conforme",
  },
  {
    id: 6,
    name: "BioFood France",
    complianceRate: 88,
    country: "France",
    type: "Fabricant",
    products: 9,
    status: "conforme",
  },
  {
    id: 7,
    name: "Box & Pack S.L.",
    complianceRate: 72,
    country: "Espagne",
    type: "Fabricant",
    products: 11,
    status: "à surveiller",
  },
  {
    id: 8,
    name: "Nordic Ingredients",
    complianceRate: 94,
    country: "Suède",
    type: "Négociant",
    products: 7,
    status: "conforme",
  },
];

export default function Suppliers() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filtrer les fournisseurs en fonction du terme de recherche
  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Naviguer vers la page de détail d'un fournisseur
  const handleViewDetails = (id: number) => {
    navigate(`/fournisseurs/${id}`);
  };
  
  // Naviguer vers la page d'édition d'un fournisseur
  const handleEdit = (id: number) => {
    navigate(`/fournisseurs/${id}`);
  };
  
  // Naviguer vers le portail fournisseur
  const handleViewPortal = (id: number) => {
    navigate("/portail-fournisseur");
  };
  
  // Supprimer un fournisseur
  const handleDelete = (id: number, name: string) => {
    toast({
      title: "Fournisseur supprimé",
      description: `Le fournisseur ${name} a été supprimé.`,
      variant: "destructive",
    });
  };
  
  // Naviguer vers le formulaire de création d'un nouveau fournisseur
  const handleNewSupplier = () => {
    navigate("/fournisseurs/nouveau");
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="dashboard-title">Fournisseurs</h1>
        <Button className="flex items-center gap-2" onClick={handleNewSupplier}>
          <Plus className="h-4 w-4" />
          <span>Nouveau fournisseur</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Liste des fournisseurs</CardTitle>
          <CardDescription>
            Gérez tous vos fournisseurs et leur conformité
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un fournisseur..."
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
                  <TableHead>Type</TableHead>
                  <TableHead>Pays</TableHead>
                  <TableHead>Produits</TableHead>
                  <TableHead>Conformité</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">{supplier.name}</TableCell>
                    <TableCell>{supplier.type}</TableCell>
                    <TableCell>{supplier.country}</TableCell>
                    <TableCell>{supplier.products}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 w-32">
                        <Progress
                          value={supplier.complianceRate}
                          className="h-2"
                          indicatorClassName={
                            supplier.complianceRate > 80
                              ? "bg-green-500"
                              : supplier.complianceRate > 50
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }
                        />
                        <span className="text-sm w-8">
                          {supplier.complianceRate}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          supplier.status === "conforme"
                            ? "default"
                            : supplier.status === "à surveiller"
                            ? "outline"
                            : "destructive"
                        }
                      >
                        {supplier.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewDetails(supplier.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Voir détails
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(supplier.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewPortal(supplier.id)}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Portail fournisseur
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Supprimer
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Cette action ne peut pas être annulée. Cela supprimera définitivement le fournisseur
                                  <span className="font-semibold"> {supplier.name}</span> et toutes les données associées.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDelete(supplier.id, supplier.name)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredSuppliers.length === 0 && (
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
