
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, FileText, Users, PackageSearch, Check, AlertCircle } from "lucide-react";

// Types de données
interface RequirementGroup {
  id: number;
  name: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  isActive: boolean;
  criteria: {
    supplierTypes: string[];
    productFamilies: string[];
    countries: string[];
  };
  documentTypes: string[];
  matchingSuppliers: number;
  matchingProducts: number;
  totalRequirements: number;
  complianceRate: number;
}

// Données d'exemple
const requirementGroups: RequirementGroup[] = [
  {
    id: 1,
    name: "Matières premières bio",
    description: "Exigences pour tous les fournisseurs de matières premières biologiques",
    priority: "high",
    isActive: true,
    criteria: {
      supplierTypes: ["Fabricant", "Distributeur"],
      productFamilies: ["Matières premières"],
      countries: ["France", "Allemagne", "Italie"],
    },
    documentTypes: ["Certification BIO", "Certificat d'origine", "Fiche technique"],
    matchingSuppliers: 8,
    matchingProducts: 23,
    totalRequirements: 42,
    complianceRate: 78,
  },
  {
    id: 2,
    name: "Emballages alimentaires",
    description: "Exigences pour tous les emballages en contact avec les aliments",
    priority: "critical",
    isActive: true,
    criteria: {
      supplierTypes: ["Fabricant"],
      productFamilies: ["Emballages"],
      countries: ["Tous pays"],
    },
    documentTypes: ["Déclaration REACH", "Fiche de données de sécurité", "Certificat d'analyse"],
    matchingSuppliers: 12,
    matchingProducts: 45,
    totalRequirements: 87,
    complianceRate: 92,
  },
  {
    id: 3,
    name: "Fournisseurs USA",
    description: "Exigences spécifiques pour fournisseurs des États-Unis",
    priority: "medium",
    isActive: true,
    criteria: {
      supplierTypes: ["Tous types"],
      productFamilies: ["Tous types"],
      countries: ["États-Unis"],
    },
    documentTypes: ["FDA Compliance", "Certification ISO 9001"],
    matchingSuppliers: 5,
    matchingProducts: 18,
    totalRequirements: 31,
    complianceRate: 65,
  },
  {
    id: 4,
    name: "Certification qualité",
    description: "Exigences de certification qualité pour tous les fournisseurs principaux",
    priority: "medium",
    isActive: false,
    criteria: {
      supplierTypes: ["Tous types"],
      productFamilies: ["Tous types"],
      countries: ["Tous pays"],
    },
    documentTypes: ["Certification ISO 9001"],
    matchingSuppliers: 35,
    matchingProducts: 124,
    totalRequirements: 35,
    complianceRate: 84,
  },
];

interface RequirementGroupsListProps {
  onEdit: (id: number) => void;
  onView: (id: number) => void;
  onDelete: (id: number) => void;
  onDuplicate: (id: number) => void;
  onToggleActive: (id: number, active: boolean) => void;
}

export function RequirementGroupsList({
  onEdit,
  onView,
  onDelete,
  onDuplicate,
  onToggleActive,
}: RequirementGroupsListProps) {
  const getPriorityBadge = (priority: RequirementGroup["priority"]) => {
    switch (priority) {
      case "low":
        return <Badge variant="outline">Basse</Badge>;
      case "medium":
        return <Badge variant="secondary">Moyenne</Badge>;
      case "high":
        return <Badge>Haute</Badge>;
      case "critical":
        return <Badge variant="destructive">Critique</Badge>;
      default:
        return null;
    }
  };

  const getComplianceBadge = (rate: number) => {
    if (rate >= 90) {
      return <Badge variant="default" className="bg-green-500">Conforme ({rate}%)</Badge>;
    } else if (rate >= 70) {
      return <Badge variant="secondary" className="bg-yellow-500 text-black">À surveiller ({rate}%)</Badge>;
    } else {
      return <Badge variant="destructive">Critique ({rate}%)</Badge>;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {requirementGroups.map((group) => (
        <Card key={group.id} className={!group.isActive ? "opacity-70" : undefined}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl flex items-center gap-2">
                  {group.name}
                  {!group.isActive && (
                    <span className="text-xs text-muted-foreground">(Inactif)</span>
                  )}
                </CardTitle>
                <CardDescription className="text-sm">
                  {group.description}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {getPriorityBadge(group.priority)}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onView(group.id)}>
                      Voir détails
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(group.id)}>
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDuplicate(group.id)}>
                      Dupliquer
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onToggleActive(group.id, !group.isActive)}>
                      {group.isActive ? "Désactiver" : "Activer"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => onDelete(group.id)}
                    >
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 text-sm">
                {group.criteria.supplierTypes.length > 0 && (
                  <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md">
                    <Users className="h-3.5 w-3.5" />
                    <span>
                      {group.criteria.supplierTypes.length === 1
                        ? group.criteria.supplierTypes[0]
                        : `${group.criteria.supplierTypes.length} types`}
                    </span>
                  </div>
                )}
                {group.criteria.productFamilies.length > 0 && (
                  <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md">
                    <PackageSearch className="h-3.5 w-3.5" />
                    <span>
                      {group.criteria.productFamilies.length === 1
                        ? group.criteria.productFamilies[0]
                        : `${group.criteria.productFamilies.length} familles`}
                    </span>
                  </div>
                )}
                {group.documentTypes.length > 0 && (
                  <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md">
                    <FileText className="h-3.5 w-3.5" />
                    <span>{group.documentTypes.length} documents</span>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Fournisseurs</span>
                  <span className="font-medium">{group.matchingSuppliers}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Produits</span>
                  <span className="font-medium">{group.matchingProducts}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Exigences</span>
                  <span className="font-medium">{group.totalRequirements}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <div className="text-muted-foreground">Conformité</div>
                  <div>{getComplianceBadge(group.complianceRate)}</div>
                </div>
                <div className="flex items-center gap-4">
                  {group.complianceRate < 70 && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>Attention requise</span>
                    </div>
                  )}
                  {group.complianceRate >= 90 && (
                    <div className="flex items-center gap-1 text-green-500 text-sm">
                      <Check className="h-4 w-4" />
                      <span>Conforme</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
