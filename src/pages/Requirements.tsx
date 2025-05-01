
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
import { format } from "date-fns";

const requirements = [
  {
    id: 1,
    document: "Certification ISO 9001",
    type: "Certification",
    supplier: "Fournitures Pro SAS",
    product: null,
    lastUpdate: new Date(2024, 5, 10),
    expiryDate: new Date(2025, 5, 10),
    status: "satisfaite",
  },
  {
    id: 2,
    document: "Fiche technique",
    type: "Fiche technique",
    supplier: "EcoPack GmbH",
    product: "Flacon en verre 250ml",
    lastUpdate: new Date(2024, 4, 15),
    expiryDate: null,
    status: "satisfaite",
  },
  {
    id: 3,
    document: "Certificat d'analyse",
    type: "Certificat d'analyse",
    supplier: "Matières Premières Inc.",
    product: "Huile essentielle de lavande",
    lastUpdate: new Date(2024, 3, 20),
    expiryDate: new Date(2024, 9, 20),
    status: "expirant",
  },
  {
    id: 4,
    document: "Déclaration REACH",
    type: "Déclaration",
    supplier: "FoodTech Solutions",
    product: "Bouchon RPET 28mm",
    lastUpdate: new Date(2023, 11, 5),
    expiryDate: new Date(2024, 5, 5),
    status: "expirée",
  },
  {
    id: 5,
    document: "Certification BIO",
    type: "Certification",
    supplier: "Organic Supplies Ltd",
    product: "Extrait d'aloe vera bio",
    lastUpdate: new Date(2024, 2, 15),
    expiryDate: new Date(2025, 2, 15),
    status: "satisfaite",
  },
  {
    id: 6,
    document: "Fiche de données de sécurité",
    type: "Fiche de sécurité",
    supplier: "BioFood France",
    product: "Vitamine C pure",
    lastUpdate: null,
    expiryDate: null,
    status: "manquante",
  },
  {
    id: 7,
    document: "Certificat d'origine",
    type: "Certification",
    supplier: "Matières Premières Inc.",
    product: null,
    lastUpdate: null,
    expiryDate: null,
    status: "manquante",
  },
  {
    id: 8,
    document: "Certification BIO",
    type: "Certification",
    supplier: "Organic Supplies Ltd",
    product: "Beurre de karité bio",
    lastUpdate: new Date(2024, 2, 15),
    expiryDate: new Date(2025, 2, 15),
    status: "satisfaite",
  },
];

export default function Requirements() {
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="dashboard-title">Exigences</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Nouveau groupe d'exigences</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Liste des exigences</CardTitle>
          <CardDescription>
            Suivez l'état de toutes les exigences de conformité
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher une exigence..."
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
                  <TableHead>Document requis</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Fournisseur</TableHead>
                  <TableHead>Produit</TableHead>
                  <TableHead>Mise à jour</TableHead>
                  <TableHead>Expiration</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requirements.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium">{req.document}</TableCell>
                    <TableCell>{req.type}</TableCell>
                    <TableCell>{req.supplier}</TableCell>
                    <TableCell>{req.product || "Tous"}</TableCell>
                    <TableCell>
                      {req.lastUpdate
                        ? format(req.lastUpdate, "dd/MM/yyyy")
                        : "Non fourni"}
                    </TableCell>
                    <TableCell>
                      {req.expiryDate
                        ? format(req.expiryDate, "dd/MM/yyyy")
                        : "Non applicable"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          req.status === "satisfaite"
                            ? "default"
                            : req.status === "expirant"
                            ? "outline"
                            : "destructive"
                        }
                      >
                        {req.status}
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
                          <DropdownMenuItem>Voir document</DropdownMenuItem>
                          <DropdownMenuItem>Envoyer rappel</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Modifier</DropdownMenuItem>
                          <DropdownMenuItem>Marquer comme satisfaite</DropdownMenuItem>
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
