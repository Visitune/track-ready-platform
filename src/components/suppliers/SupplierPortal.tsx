
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, MessageSquare, CalendarClock, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";

interface RequirementItem {
  id: number;
  documentName: string;
  product: string | null;
  status: "missing" | "expired" | "expiring" | "valid";
  expiryDate: string | null;
  uploadDate: string | null;
}

interface SupplierPortalProps {
  supplierName: string;
  requirements: RequirementItem[];
  complianceRate: number;
  onFileUpload: (requirementId: number, file: File) => void;
  onSendMessage: (requirementId: number, message: string) => void;
}

export function SupplierPortal({ 
  supplierName, 
  requirements, 
  complianceRate, 
  onFileUpload,
  onSendMessage 
}: SupplierPortalProps) {
  const handleFileChange = (requirementId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(requirementId, e.target.files[0]);
    }
  };
  
  const getStatusBadge = (status: RequirementItem["status"]) => {
    switch (status) {
      case "missing":
        return <Badge variant="destructive">Manquant</Badge>;
      case "expired":
        return <Badge variant="destructive">Expiré</Badge>;
      case "expiring":
        return <Badge variant="outline">À renouveler</Badge>;
      case "valid":
        return <Badge variant="default">Valide</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: RequirementItem["status"]) => {
    switch (status) {
      case "missing":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case "expired":
        return <RefreshCw className="h-5 w-5 text-destructive" />;
      case "expiring":
        return <CalendarClock className="h-5 w-5 text-amber-500" />;
      case "valid":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  const pendingRequirements = requirements.filter(
    req => req.status === "missing" || req.status === "expired" || req.status === "expiring"
  );
  const validRequirements = requirements.filter(req => req.status === "valid");

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Portail Fournisseur</h1>
        <p className="text-muted-foreground text-lg">{supplierName}</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>État de conformité</CardTitle>
          <CardDescription>Taux de conformité actuel par rapport aux exigences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">{complianceRate}%</span>
              <span className="text-sm text-muted-foreground">
                {requirements.filter(r => r.status === "valid").length} sur {requirements.length} documents conformes
              </span>
            </div>
            <Progress 
              value={complianceRate} 
              indicatorClassName={
                complianceRate > 80
                  ? "bg-green-500"
                  : complianceRate > 50
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="pending">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span>Actions requises ({pendingRequirements.length})</span>
            </TabsTrigger>
            <TabsTrigger value="valid" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Documents valides ({validRequirements.length})</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="pending">
          {pendingRequirements.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="text-lg font-medium">Tous vos documents sont à jour</p>
                <p className="text-muted-foreground">
                  Il n'y a pas d'action requise pour le moment.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pendingRequirements.map((req) => (
                <Card key={req.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{req.documentName}</CardTitle>
                        {req.product && (
                          <CardDescription>Produit: {req.product}</CardDescription>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(req.status)}
                        {getStatusBadge(req.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="text-sm space-y-2">
                      {req.expiryDate && (
                        <p className="text-muted-foreground">
                          {req.status === "expired"
                            ? `Expiré le ${req.expiryDate}`
                            : req.status === "expiring"
                            ? `Expire le ${req.expiryDate}`
                            : null}
                        </p>
                      )}
                      
                      {req.status === "missing" ? (
                        <p>Ce document est requis pour être en conformité.</p>
                      ) : (
                        <p>Veuillez renouveler ce document pour rester en conformité.</p>
                      )}

                      <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <div className="flex-1">
                          <label
                            htmlFor={`file-upload-${req.id}`}
                            className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-muted-foreground/25 rounded-md cursor-pointer hover:border-primary/50 transition-colors"
                          >
                            <Upload className="h-4 w-4" />
                            <span>Cliquez pour télécharger un document</span>
                            <input
                              id={`file-upload-${req.id}`}
                              type="file"
                              className="hidden"
                              onChange={(e) => handleFileChange(req.id, e)}
                            />
                          </label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Formats acceptés: PDF, JPEG, PNG (max 10 MB)
                          </p>
                        </div>
                        
                        <Button 
                          variant="secondary"
                          className="flex items-center gap-2"
                          onClick={() => onSendMessage(req.id, "")}
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>Envoyer un message</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="valid">
          {validRequirements.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                <p className="text-lg font-medium">Aucun document conforme</p>
                <p className="text-muted-foreground">
                  Veuillez fournir les documents demandés dans l'onglet "Actions requises".
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {validRequirements.map((req) => (
                <Card key={req.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{req.documentName}</CardTitle>
                        {req.product && (
                          <CardDescription>Produit: {req.product}</CardDescription>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(req.status)}
                        {getStatusBadge(req.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-2">
                      {req.uploadDate && (
                        <p className="text-muted-foreground">
                          Document fourni le {req.uploadDate}
                        </p>
                      )}
                      {req.expiryDate && (
                        <p className="text-muted-foreground">
                          Valide jusqu'au {req.expiryDate}
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Voir le document</span>
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="flex items-center gap-2"
                      onClick={() => onSendMessage(req.id, "")}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Messages</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
