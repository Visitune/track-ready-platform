
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
import { Plus, Search, MoreHorizontal, Filter, FileText, Download } from "lucide-react";
import { format } from "date-fns";

const documents = [
  {
    id: 1,
    name: "Certification ISO 9001",
    type: "Certification",
    supplier: "Fournitures Pro SAS",
    products: [],
    receiptDate: new Date(2024, 5, 10),
    expiryDate: new Date(2025, 5, 10),
    status: "valide",
  },
  {
    id: 2,
    name: "Fiche technique - Flacon en verre 250ml",
    type: "Fiche technique",
    supplier: "EcoPack GmbH",
    products: ["Flacon en verre 250ml"],
    receiptDate: new Date(2024, 4, 15),
    expiryDate: null,
    status: "valide",
  },
  {
    id: 3,
    name: "Certificat d'analyse - Huile essentielle de lavande",
    type: "Certificat d'analyse",
    supplier: "Matières Premières Inc.",
    products: ["Huile essentielle de lavande"],
    receiptDate: new Date(2024, 3, 20),
    expiryDate: new Date(2024, 9, 20),
    status: "expirant",
  },
  {
    id: 4,
    name: "Déclaration REACH",
    type: "Déclaration",
    supplier: "FoodTech Solutions",
    products: ["Bouchon RPET 28mm"],
    receiptDate: new Date(2023, 11, 5),
    expiryDate: new Date(2024, 5, 5),
    status: "expiré",
  },
  {
    id: 5,
    name: "Certification BIO",
    type: "Certification",
    supplier: "Organic Supplies Ltd",
    products: ["Extrait d'aloe vera bio", "Beurre de karité bio"],
    receiptDate: new Date(2024, 2, 15),
    expiryDate: new Date(2025, 2, 15),
    status: "valide",
  },
  {
    id: 6,
    name: "Fiche de données de sécurité - Vitamine C",
    type: "Fiche de sécurité",
    supplier: "BioFood France",
    products: ["Vitamine C pure"],
    receiptDate: new Date(2024, 1, 25),
    expiryDate: null,
    status: "valide",
  }
];

export default function Documents() {
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="dashboard-title">Documents</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Nouveau document</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Bibliothèque de documents</CardTitle>
          <CardDescription>
            Tous les documents de conformité centralisés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un document..."
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
                  <TableHead>Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Fournisseur</TableHead>
                  <TableHead>Date de réception</TableHead>
                  <TableHead>Expiration</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="w-[110px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-medium">{document.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{document.type}</TableCell>
                    <TableCell>{document.supplier}</TableCell>
                    <TableCell>{format(document.receiptDate, "dd/MM/yyyy")}</TableCell>
                    <TableCell>
                      {document.expiryDate
                        ? format(document.expiryDate, "dd/MM/yyyy")
                        : "Non applicable"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          document.status === "valide"
                            ? "default"
                            : document.status === "expirant"
                            ? "outline"
                            : "destructive"
                        }
                      >
                        {document.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Voir détails</DropdownMenuItem>
                            <DropdownMenuItem>Télécharger</DropdownMenuItem>
                            <DropdownMenuItem>Historique des versions</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Modifier</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
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
