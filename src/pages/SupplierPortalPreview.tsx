import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { SupplierPortal } from "@/components/suppliers/SupplierPortal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Copy, Mail } from "lucide-react";
import { Link } from "react-router-dom";

// Données d'exemple
const requirements = [
  {
    id: 1,
    documentName: "Certification ISO 9001",
    product: null,
    status: "valid" as const,
    expiryDate: "10/05/2026",
    uploadDate: "15/04/2025",
  },
  {
    id: 2,
    documentName: "Fiche technique",
    product: "Flacon en verre 250ml",
    status: "valid" as const,
    expiryDate: null,
    uploadDate: "15/03/2025",
  },
  {
    id: 3,
    documentName: "Certificat d'analyse",
    product: "Huile essentielle de lavande",
    status: "expiring" as const,
    expiryDate: "20/06/2025",
    uploadDate: "20/06/2024",
  },
  {
    id: 4,
    documentName: "Déclaration REACH",
    product: "Bouchon RPET 28mm",
    status: "expired" as const,
    expiryDate: "05/04/2025",
    uploadDate: "05/10/2024",
  },
  {
    id: 5,
    documentName: "Certification BIO",
    product: "Extrait d'aloe vera bio",
    status: "missing" as const,
    expiryDate: null,
    uploadDate: null,
  },
];

export default function SupplierPortalPreview() {
  const { toast } = useToast();

  const handleFileUpload = (requirementId: number, file: File) => {
    toast({
      title: "Document téléchargé",
      description: `Le fichier "${file.name}" a été téléchargé pour l'exigence #${requirementId}`,
    });
  };

  const handleSendMessage = (requirementId: number, message: string) => {
    toast({
      title: "Messagerie ouverte",
      description: `Envoi d'un message pour l'exigence #${requirementId}`,
    });
  };

  const handleCopyLink = () => {
    // Simuler la copie d'un lien vers le presse-papiers
    toast({
      title: "Lien copié",
      description: "Le lien d'accès au portail a été copié dans le presse-papiers.",
    });
  };

  const handleSendEmail = () => {
    toast({
      title: "Email envoyé",
      description: "Un email a été envoyé au fournisseur avec le lien d'accès au portail.",
    });
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link to="/fournisseurs">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              Prévisualisation du portail fournisseur
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleCopyLink}
            >
              <Copy className="h-4 w-4" />
              <span>Copier le lien</span>
            </Button>
            <Button
              className="flex items-center gap-2"
              onClick={handleSendEmail}
            >
              <Mail className="h-4 w-4" />
              <span>Envoyer par email</span>
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <h2 className="font-semibold text-lg">EcoPack GmbH</h2>
                <p className="text-muted-foreground">ID: ECO-2025-123</p>
              </div>

              <div>
                <p className="font-medium">Contact principal:</p>
                <p className="text-muted-foreground">Frank Schmidt - f.schmidt@ecopack.de</p>
              </div>

              <div>
                <p className="font-medium">Langue:</p>
                <p className="text-muted-foreground">Français</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="border rounded-lg overflow-hidden">
          <SupplierPortal
            supplierName="EcoPack GmbH"
            requirements={requirements}
            complianceRate={60}
            onFileUpload={handleFileUpload}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </AppLayout>
  );
}
