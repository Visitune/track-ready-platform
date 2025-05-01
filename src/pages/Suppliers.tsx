
import React from "react";
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
import { Plus, Search, MoreHorizontal, Filter } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="dashboard-title">Fournisseurs</h1>
        <Button className="flex items-center gap-2">
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
                {suppliers.map((supplier) => (
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
                          <DropdownMenuItem>Voir détails</DropdownMenuItem>
                          <DropdownMenuItem>Voir documents</DropdownMenuItem>
                          <DropdownMenuItem>Voir exigences</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Modifier</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
