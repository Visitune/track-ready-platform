import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import ConversationView from "@/components/messages/ConversationView";

// Définition du type Message pour correspondre à l'interface dans ConversationView
interface Message {
  id: number;
  content: string;
  sender: "system" | "client" | "supplier";
  name?: string;
  timestamp: Date;
  attachment?: string;
}

// Données d'exemple pour les fournisseurs
const suppliers = [
  { id: 1, name: "Fournitures Pro SAS", email: "contact@fournitures-pro.fr" },
  { id: 2, name: "EcoPack GmbH", email: "info@ecopack.de" },
  { id: 3, name: "Matières Premières Inc.", email: "info@matieres-premieres.ca" },
  { id: 4, name: "FoodTech Solutions", email: "contact@foodtechsolutions.com" },
];

const conversations = [
  {
    id: 1,
    supplier: "Fournitures Pro SAS",
    contact: "Jean Dupont",
    lastMessage: "Nous vous avons envoyé le certificat demandé.",
    date: new Date(2024, 5, 15, 14, 25),
    unread: false,
    avatar: "FP",
    subject: "Certification ISO 9001",
    messages: [
      {
        id: 1,
        sender: "system" as const,
        content: "Conversation initiée concernant: Certification ISO 9001",
        timestamp: new Date(2024, 5, 14, 9, 0),
      },
      {
        id: 2,
        sender: "client" as const,
        content:
          "Bonjour, nous avons besoin de votre certification ISO 9001 mise à jour. Pouvez-vous nous la transmettre ?",
        timestamp: new Date(2024, 5, 14, 9, 5),
        name: "Sophie Martin",
      },
      {
        id: 3,
        sender: "supplier" as const,
        content:
          "Bonjour Sophie, bien sûr. Je vais préparer le document et vous l'envoyer dans la journée.",
        timestamp: new Date(2024, 5, 14, 10, 30),
        name: "Jean Dupont",
      },
      {
        id: 4,
        sender: "supplier" as const,
        content:
          "Voici la certification demandée. N'hésitez pas si vous avez besoin d'autres documents.",
        timestamp: new Date(2024, 5, 15, 14, 25),
        name: "Jean Dupont",
        attachment: "ISO_9001_2024.pdf",
      },
    ],
  },
  {
    id: 2,
    supplier: "EcoPack GmbH",
    contact: "Klaus Meyer",
    lastMessage:
      "Pouvez-vous préciser quelle version du document vous avez besoin ?",
    date: new Date(2024, 5, 15, 10, 12),
    unread: true,
    avatar: "EG",
    subject: "Documentation RPET",
    messages: [
      {
        id: 1,
        sender: "system" as const,
        content: "Conversation initiée concernant: Documentation RPET",
        timestamp: new Date(2024, 5, 15, 9, 0),
      },
      {
        id: 2,
        sender: "client" as const,
        content: "Bonjour, pourriez-vous nous envoyer la documentation complète sur les bouchons RPET ?",
        timestamp: new Date(2024, 5, 15, 9, 15),
        name: "Paul Durand",
      },
      {
        id: 3,
        sender: "supplier" as const,
        content: "Pouvez-vous préciser quelle version du document vous avez besoin ?",
        timestamp: new Date(2024, 5, 15, 10, 12),
        name: "Klaus Meyer",
      },
    ],
  },
  {
    id: 3,
    supplier: "Matières Premières Inc.",
    contact: "Sarah Johnson",
    lastMessage:
      "Le certificat d'analyse sera disponible la semaine prochaine.",
    date: new Date(2024, 5, 14, 16, 30),
    unread: false,
    avatar: "MP",
    subject: "Certificat d'analyse",
    messages: [
      {
        id: 1,
        sender: "system" as const,
        content: "Conversation initiée concernant: Certificat d'analyse",
        timestamp: new Date(2024, 5, 14, 15, 0),
      },
      {
        id: 2,
        sender: "client" as const,
        content: "Bonjour, quand pouvons-nous espérer recevoir le certificat d'analyse du lot #456789 ?",
        timestamp: new Date(2024, 5, 14, 15, 30),
        name: "Sophie Martin",
      },
      {
        id: 3,
        sender: "supplier" as const,
        content: "Le certificat d'analyse sera disponible la semaine prochaine.",
        timestamp: new Date(2024, 5, 14, 16, 30),
        name: "Sarah Johnson",
      },
    ],
  },
];

export default function Messages() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [newMessageDialog, setNewMessageDialog] = useState(false);
  const [newMessageForm, setNewMessageForm] = useState({
    supplierId: "",
    subject: "",
    message: "",
  });
  
  // Filtrer les conversations en fonction du terme de recherche
  const filteredConversations = conversations.filter(conversation =>
    conversation.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conversation.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conversation.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Gérer l'archivage d'une conversation
  const handleArchiveConversation = (id: number) => {
    toast({
      title: "Conversation archivée",
      description: "Cette conversation a été déplacée dans les archives.",
    });
  };
  
  // Gérer l'envoi d'un nouveau message
  const handleNewMessage = () => {
    if (!newMessageForm.supplierId || !newMessageForm.subject || !newMessageForm.message) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs du formulaire.",
        variant: "destructive",
      });
      return;
    }
    
    const supplier = suppliers.find(s => s.id.toString() === newMessageForm.supplierId);
    if (!supplier) return;
    
    toast({
      title: "Message envoyé",
      description: `Votre message a été envoyé à ${supplier.name}.`,
    });
    
    setNewMessageDialog(false);
    setNewMessageForm({
      supplierId: "",
      subject: "",
      message: "",
    });
  };
  
  // Gérer les changements dans le formulaire de nouveau message
  const handleFormChange = (field: string, value: string) => {
    setNewMessageForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="dashboard-title">Messages</h1>
        
        <Dialog open={newMessageDialog} onOpenChange={setNewMessageDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Nouveau message</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Nouveau message</DialogTitle>
              <DialogDescription>
                Envoyer un nouveau message à un fournisseur
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Destinataire
                </label>
                <Select 
                  value={newMessageForm.supplierId} 
                  onValueChange={(value) => handleFormChange("supplierId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un fournisseur" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id.toString()}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Sujet
                </label>
                <Input 
                  value={newMessageForm.subject}
                  onChange={(e) => handleFormChange("subject", e.target.value)}
                  placeholder="Sujet du message"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Message
                </label>
                <Textarea 
                  value={newMessageForm.message}
                  onChange={(e) => handleFormChange("message", e.target.value)}
                  placeholder="Saisissez votre message..."
                  rows={4}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleNewMessage}>Envoyer</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="inbox" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="inbox">Boîte de réception</TabsTrigger>
          <TabsTrigger value="sent">Envoyés</TabsTrigger>
          <TabsTrigger value="archived">Archivés</TabsTrigger>
        </TabsList>
        
        <TabsContent value="inbox" className="space-y-4">
          <div className="flex h-[600px]">
            <div className="w-1/3 pr-4 border-r">
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher une conversation..."
                  className="w-full pl-8 bg-background"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="space-y-2 overflow-y-auto h-[540px]">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer ${
                      conversation.id === activeConversation.id
                        ? "bg-primary/10 border border-primary/20"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setActiveConversation(conversation)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {conversation.avatar}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-medium truncate">
                            {conversation.supplier}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {format(conversation.date, "HH:mm")}
                          </div>
                        </div>
                        
                        <div className="text-sm text-muted-foreground truncate">
                          {conversation.contact}
                        </div>
                        
                        <div className="text-sm truncate mt-1 flex items-center gap-2">
                          <span className={conversation.unread ? "font-medium" : ""}>
                            {conversation.lastMessage}
                          </span>
                          {conversation.unread && (
                            <Badge className="h-2 w-2 p-0 rounded-full bg-primary" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredConversations.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Aucune conversation trouvée.
                  </div>
                )}
              </div>
            </div>

            <div className="w-2/3 pl-4">
              <Card className="h-full">
                <CardContent className="p-0 h-full">
                  <ConversationView
                    conversation={activeConversation}
                    onArchive={handleArchiveConversation}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sent">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                Messages envoyés aux fournisseurs
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="archived">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                Conversations archivées
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
