
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Plus, BarChart3, FolderTree } from "lucide-react";
import { RequirementGroupsList } from "@/components/requirements/RequirementGroupsList";
import { RequirementGroupForm } from "@/components/requirements/RequirementGroupForm";
import { useToast } from "@/hooks/use-toast";

export default function RequirementGroups() {
  const [activeTab, setActiveTab] = useState<string>("list");
  const [editingGroupId, setEditingGroupId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleEdit = (id: number) => {
    setEditingGroupId(id);
    setActiveTab("new");
  };

  const handleView = (id: number) => {
    toast({
      title: "Voir les détails",
      description: `Affichage des détails du groupe d'exigences #${id}`,
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Groupe supprimé",
      description: `Le groupe d'exigences #${id} a été supprimé.`,
      variant: "destructive",
    });
  };

  const handleDuplicate = (id: number) => {
    toast({
      title: "Groupe dupliqué",
      description: `Une copie du groupe d'exigences #${id} a été créée.`,
    });
  };

  const handleToggleActive = (id: number, active: boolean) => {
    toast({
      title: active ? "Groupe activé" : "Groupe désactivé",
      description: `Le groupe d'exigences #${id} a été ${
        active ? "activé" : "désactivé"
      }.`,
    });
  };

  const handleFormSubmit = (values: any) => {
    console.log("Form values:", values);
    // Ici, nous traiterions normalement les données du formulaire
    // en les envoyant à Supabase ou un autre backend
    setActiveTab("list");
    setEditingGroupId(null);
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Groupes d'exigences</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <FolderTree className="h-4 w-4" />
              <span>Liste des groupes</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Statistiques</span>
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Nouveau groupe</span>
            </TabsTrigger>
          </TabsList>
          
          {activeTab === "list" && (
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher un groupe..."
                  className="pl-8 w-[250px]"
                />
              </div>
              <Button
                onClick={() => {
                  setEditingGroupId(null);
                  setActiveTab("new");
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Nouveau groupe
              </Button>
            </div>
          )}
        </div>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Liste des groupes d'exigences</CardTitle>
              <CardDescription>
                Gérez les différents groupes d'exigences et leurs règles de conformité
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RequirementGroupsList
                onEdit={handleEdit}
                onView={handleView}
                onDelete={handleDelete}
                onDuplicate={handleDuplicate}
                onToggleActive={handleToggleActive}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques de conformité par groupe</CardTitle>
              <CardDescription>
                Visualisez la performance de conformité de chaque groupe d'exigences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[400px] border rounded">
                <p className="text-muted-foreground">
                  [Graphique des statistiques de conformité par groupe]
                  <br />
                  Les statistiques seraient normalement affichées ici avec des graphiques Recharts.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new">
          <RequirementGroupForm 
            onSubmit={handleFormSubmit}
            initialData={editingGroupId ? {
              name: "Exemple de groupe existant",
              description: "Description d'un groupe à éditer",
              supplierType: ["manufacturer"],
              productFamily: ["raw_materials"],
              country: [],
              certification: [],
              documentTypes: ["iso_9001", "technical_sheet"],
              priority: "high",
              isActive: true,
            } : undefined}
          />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
