
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Save,
  Trash2,
  FileText,
  Package,
  MessageSquare,
  AlertCircle,
  Calendar,
  ExternalLink,
  Mail,
} from "lucide-react";
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

// Données d'exemple pour les documents
const documents = [
  {
    id: 1,
    name: "Certification ISO 9001",
    type: "certification",
    status: "valid",
    expiryDate: "10/05/2026",
    uploadDate: "15/04/2025",
  },
  {
    id: 2,
    name: "Fiche technique - Flacon en verre 250ml",
    type: "technical_sheet",
    status: "valid",
    expiryDate: null,
    uploadDate: "15/03/2025",
  },
  {
    id: 3,
    name: "Certificat d'analyse - Huile essentielle de lavande",
    type: "certificate",
    status: "expiring",
    expiryDate: "20/06/2025",
    uploadDate: "20/06/2024",
  },
  {
    id: 4,
    name: "Déclaration REACH - Bouchon RPET 28mm",
    type: "declaration",
    status: "expired",
    expiryDate: "05/04/2025",
    uploadDate: "05/10/2024",
  },
];

// Données d'exemple pour les produits
const products = [
  {
    id: 1,
    name: "Flacon en verre 250ml",
    reference: "FV-250",
    type: "Emballage",
    price: 0.85,
    moq: 5000,
  },
  {
    id: 2,
    name: "Huile essentielle de lavande",
    reference: "HE-LAV-BIO",
    type: "Matière première",
    price: 120.50,
    moq: 25,
  },
  {
    id: 3,
    name: "Bouchon RPET 28mm",
    reference: "BCH-RPET-28",
    type: "Emballage",
    price: 0.25,
    moq: 10000,
  }
];

// Données d'exemple pour les messages
const messages = [
  {
    id: 1,
    date: "15/04/2025",
    sender: "Équipe qualité",
    subject: "Certification ISO 9001",
    content: "Nous avons bien reçu votre certification ISO 9001, merci.",
    isRead: true,
  },
  {
    id: 2,
    date: "20/06/2024",
    sender: "Service achat",
    subject: "Demande de devis",
    content: "Pourriez-vous nous faire parvenir un devis pour 10 000 flacons en verre 250ml?",
    isRead: false,
  }
];

// Données d'exemple pour les fournisseurs
const suppliersData = [
  {
    id: 1,
    name: "Fournitures Pro SAS",
    complianceRate: 98,
    country: "France",
    type: "Fabricant",
    products: 12,
    status: "conforme",
    email: "contact@fournitures-pro.fr",
    phone: "+33 1 23 45 67 89",
    address: "12 rue de l'Industrie, 75001 Paris, France",
    contact: "Marie Dupont",
    contactEmail: "m.dupont@fournitures-pro.fr",
    contactPhone: "+33 1 23 45 67 90",
    notes: "Fournisseur de confiance, bonne réactivité",
  },
  {
    id: 2,
    name: "EcoPack GmbH",
    complianceRate: 85,
    country: "Allemagne",
    type: "Fabricant",
    products: 8,
    status: "à surveiller",
    email: "info@ecopack.de",
    phone: "+49 123 456789",
    address: "Industriestraße 45, 10115 Berlin, Allemagne",
    contact: "Frank Schmidt",
    contactEmail: "f.schmidt@ecopack.de",
    contactPhone: "+49 123 456780",
    notes: "Fournisseur d'emballages écologiques",
  },
  {
    id: 3,
    name: "Matières Premières Inc.",
    complianceRate: 76,
    country: "Canada",
    type: "Négociant",
    products: 15,
    status: "à surveiller",
    email: "info@matieres-premieres.ca",
    phone: "+1 234 5678901",
    address: "123 Industrial Road, Toronto, ON M5V 1J2, Canada",
    contact: "John Smith",
    contactEmail: "j.smith@matieres-premieres.ca",
    contactPhone: "+1 234 5678902",
    notes: "Spécialisé dans les matières premières biologiques",
  },
  {
    id: 4,
    name: "FoodTech Solutions",
    complianceRate: 45,
    country: "États-Unis",
    type: "Fabricant",
    products: 6,
    status: "critique",
    email: "contact@foodtechsolutions.com",
    phone: "+1 987 6543210",
    address: "456 Tech Avenue, San Francisco, CA 94103, USA",
    contact: "Sarah Johnson",
    contactEmail: "s.johnson@foodtechsolutions.com",
    contactPhone: "+1 987 6543211",
    notes: "Plusieurs non-conformités détectées lors du dernier audit",
  },
];

export default function SupplierDetail() {
  const { id } = useParams<{ id: string }>();
  const supplierId = parseInt(id || "0");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Trouver le fournisseur correspondant à l'ID
  const supplier = suppliersData.find(s => s.id === supplierId);
  
  const [formData, setFormData] = useState({
    name: supplier?.name || "",
    type: supplier?.type || "",
    country: supplier?.country || "",
    email: supplier?.email || "",
    phone: supplier?.phone || "",
    address: supplier?.address || "",
    contact: supplier?.contact || "",
    contactEmail: supplier?.contactEmail || "",
    contactPhone: supplier?.contactPhone || "",
    notes: supplier?.notes || "",
  });
  
  // Gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Fournisseur mis à jour",
      description: `Les informations de ${formData.name} ont été mises à jour.`,
    });
  };
  
  // Gérer les changements dans les champs du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Gérer la suppression d'un fournisseur
  const handleDelete = () => {
    toast({
      title: "Fournisseur supprimé",
      description: `Le fournisseur ${supplier?.name} a été supprimé.`,
      variant: "destructive",
    });
    navigate("/fournisseurs");
  };
  
  // Gérer l'envoi d'un email
  const handleSendEmail = () => {
    toast({
      title: "Email envoyé",
      description: `Un email a été envoyé à ${supplier?.email}.`,
    });
  };
  
  // Gérer l'accès au portail fournisseur
  const handleAccessPortal = () => {
    navigate("/portail-fournisseur");
  };

  // Si le fournisseur n'est pas trouvé
  if (!supplier) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <AlertCircle className="h-16 w-16 text-destructive mb-4" />
          <h1 className="text-2xl font-bold mb-2">Fournisseur non trouvé</h1>
          <p className="text-muted-foreground mb-6">
            Le fournisseur avec l'ID {supplierId} n'existe pas.
          </p>
          <Button asChild>
            <Link to="/fournisseurs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la liste des fournisseurs
            </Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  // Fonction pour obtenir la couleur de badge en fonction du statut
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "conforme":
        return "default";
      case "à surveiller":
        return "outline";
      case "critique":
        return "destructive";
      default:
        return "secondary";
    }
  };

  // Fonction pour obtenir la couleur de la barre de progression
  const getProgressColor = (rate: number) => {
    if (rate > 80) return "bg-green-500";
    if (rate > 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Fonction pour obtenir le badge de statut de document
  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case "valid":
        return <Badge variant="default">Valide</Badge>;
      case "expiring":
        return <Badge variant="outline">À renouveler</Badge>;
      case "expired":
        return <Badge variant="destructive">Expiré</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  return (
    <AppLayout>
      <div className="mb-6">
        {/* En-tête avec boutons de navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link to="/fournisseurs">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              {supplier.name}
            </h1>
            <Badge variant={getBadgeVariant(supplier.status)}>
              {supplier.status}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </Button>
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
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <Button variant="outline" onClick={handleSendEmail}>
              <Mail className="mr-2 h-4 w-4" />
              Contacter
            </Button>
            
            <Button onClick={handleAccessPortal}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Portail fournisseur
            </Button>
          </div>
        </div>

        {/* Carte résumé */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Taux de conformité
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-semibold text-lg">{supplier.complianceRate}%</div>
                  <Progress
                    value={supplier.complianceRate}
                    className="h-2 flex-1"
                    indicatorClassName={getProgressColor(supplier.complianceRate)}
                  />
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Type
                </div>
                <div className="font-semibold">{supplier.type}</div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Pays
                </div>
                <div className="font-semibold">{supplier.country}</div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Produits
                </div>
                <div className="font-semibold">{supplier.products}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Onglets pour différentes sections */}
        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">Informations générales</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          
          {/* Onglet Informations générales */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Informations du fournisseur</CardTitle>
                <CardDescription>
                  Modifier les informations générales du fournisseur
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Nom du fournisseur
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="type" className="text-sm font-medium">
                          Type
                        </label>
                        <Input
                          id="type"
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="country" className="text-sm font-medium">
                          Pays
                        </label>
                        <Input
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Téléphone
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="address" className="text-sm font-medium">
                          Adresse
                        </label>
                        <Textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          rows={2}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="contact" className="text-sm font-medium">
                          Contact principal
                        </label>
                        <Input
                          id="contact"
                          name="contact"
                          value={formData.contact}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="contactEmail" className="text-sm font-medium">
                          Email du contact
                        </label>
                        <Input
                          id="contactEmail"
                          name="contactEmail"
                          type="email"
                          value={formData.contactEmail}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="contactPhone" className="text-sm font-medium">
                          Téléphone du contact
                        </label>
                        <Input
                          id="contactPhone"
                          name="contactPhone"
                          value={formData.contactPhone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 space-y-2">
                      <label htmlFor="notes" className="text-sm font-medium">
                        Notes
                      </label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer les modifications
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          {/* Onglet Documents */}
          <TabsContent value="documents">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>
                    Gérer les documents liés à ce fournisseur
                  </CardDescription>
                </div>
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  Ajouter un document
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <Card key={doc.id}>
                      <CardHeader className="py-3">
                        <div className="flex justify-between">
                          <CardTitle className="text-base">{doc.name}</CardTitle>
                          {getDocumentStatusBadge(doc.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="py-2">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Type:</span>{" "}
                            <span className="font-medium capitalize">{doc.type.replace("_", " ")}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Date de téléchargement:</span>{" "}
                            <span className="font-medium">{doc.uploadDate || "-"}</span>
                          </div>
                          {doc.expiryDate && (
                            <div>
                              <span className="text-muted-foreground">Date d'expiration:</span>{" "}
                              <span className="font-medium">{doc.expiryDate}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="py-3 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          Voir
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Onglet Produits */}
          <TabsContent value="products">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Produits</CardTitle>
                  <CardDescription>
                    Produits fournis par ce fournisseur
                  </CardDescription>
                </div>
                <Button>
                  <Package className="mr-2 h-4 w-4" />
                  Ajouter un produit
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr className="border-b">
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Référence</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Nom</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Type</th>
                        <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Prix</th>
                        <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">MOQ</th>
                        <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b">
                          <td className="p-4 align-middle">{product.reference}</td>
                          <td className="p-4 align-middle font-medium">{product.name}</td>
                          <td className="p-4 align-middle">{product.type}</td>
                          <td className="p-4 align-middle text-right">{product.price.toFixed(2)} €</td>
                          <td className="p-4 align-middle text-right">{product.moq}</td>
                          <td className="p-4 align-middle text-right">
                            <Button variant="ghost" size="icon">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Onglet Messages */}
          <TabsContent value="messages">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Messages</CardTitle>
                  <CardDescription>
                    Communications avec ce fournisseur
                  </CardDescription>
                </div>
                <Button>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Nouveau message
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 border rounded-lg ${
                        !message.isRead ? "bg-muted/50" : ""
                      }`}
                    >
                      <div className="flex justify-between mb-2">
                        <div className="font-medium">{message.subject}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {message.date}
                        </div>
                      </div>
                      <div className="text-sm mb-2">{message.content}</div>
                      <div className="text-sm text-muted-foreground">
                        {message.sender}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
