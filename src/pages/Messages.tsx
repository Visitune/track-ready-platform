
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { format } from "date-fns";

const conversations = [
  {
    id: 1,
    supplier: "Fournitures Pro SAS",
    contact: "Jean Dupont",
    lastMessage: "Nous vous avons envoyé le certificat demandé.",
    date: new Date(2024, 5, 15, 14, 25),
    unread: false,
    avatar: "FP",
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
  },
  {
    id: 4,
    supplier: "FoodTech Solutions",
    contact: "Michael Brown",
    lastMessage: "Nous travaillons à mettre à jour notre déclaration REACH.",
    date: new Date(2024, 5, 14, 11, 45),
    unread: true,
    avatar: "FT",
  },
  {
    id: 5,
    supplier: "Organic Supplies Ltd",
    contact: "Emma Wilson",
    lastMessage: "Merci pour votre rappel, le document est en préparation.",
    date: new Date(2024, 5, 13, 9, 20),
    unread: false,
    avatar: "OS",
  },
];

// Sample messages for the first conversation
const messages = [
  {
    id: 1,
    sender: "system",
    content: "Conversation initiée concernant: Certification ISO 9001",
    timestamp: new Date(2024, 5, 14, 9, 0),
  },
  {
    id: 2,
    sender: "client",
    content:
      "Bonjour, nous avons besoin de votre certification ISO 9001 mise à jour. Pouvez-vous nous la transmettre ?",
    timestamp: new Date(2024, 5, 14, 9, 5),
    name: "Sophie Martin",
  },
  {
    id: 3,
    sender: "supplier",
    content:
      "Bonjour Sophie, bien sûr. Je vais préparer le document et vous l'envoyer dans la journée.",
    timestamp: new Date(2024, 5, 14, 10, 30),
    name: "Jean Dupont",
  },
  {
    id: 4,
    sender: "supplier",
    content:
      "Voici la certification demandée. N'hésitez pas si vous avez besoin d'autres documents.",
    timestamp: new Date(2024, 5, 15, 14, 25),
    name: "Jean Dupont",
    attachment: "ISO_9001_2024.pdf",
  },
];

export default function Messages() {
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="dashboard-title">Messages</h1>
      </div>

      <Tabs defaultValue="inbox" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="inbox">Boîte de réception</TabsTrigger>
          <TabsTrigger value="sent">Envoyés</TabsTrigger>
          <TabsTrigger value="archived">Archivés</TabsTrigger>
        </TabsList>
        
        <TabsContent value="inbox" className="space-y-4">
          <div className="flex">
            <div className="w-1/3 pr-4 border-r">
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher une conversation..."
                  className="w-full pl-8 bg-background"
                />
              </div>

              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer ${
                      conversation.id === 1
                        ? "bg-primary/10 border border-primary/20"
                        : "hover:bg-muted"
                    }`}
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
              </div>
            </div>

            <div className="w-2/3 pl-4">
              <Card>
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">
                        Fournitures Pro SAS
                      </CardTitle>
                      <CardDescription>
                        Sujet: Certification ISO 9001
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      Archiver
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex flex-col h-[400px]">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => {
                        if (message.sender === "system") {
                          return (
                            <div
                              key={message.id}
                              className="text-center text-xs text-muted-foreground py-2"
                            >
                              {message.content}
                              <div>
                                {format(message.timestamp, "dd/MM/yyyy HH:mm")}
                              </div>
                            </div>
                          );
                        }

                        const isClient = message.sender === "client";

                        return (
                          <div
                            key={message.id}
                            className={`flex ${
                              isClient ? "justify-end" : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-[80%] ${
                                isClient
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              } rounded-lg p-3`}
                            >
                              <div className="text-xs font-medium mb-1">
                                {message.name}
                              </div>
                              <div>{message.content}</div>
                              {message.attachment && (
                                <div className="mt-2 bg-white/10 rounded p-2 flex items-center gap-2">
                                  <FileText className="h-4 w-4" />
                                  <span className="text-sm">
                                    {message.attachment}
                                  </span>
                                </div>
                              )}
                              <div className="text-xs mt-1 text-right opacity-70">
                                {format(message.timestamp, "HH:mm")}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="border-t p-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Écrivez votre message..."
                          className="flex-1"
                        />
                        <Button>Envoyer</Button>
                      </div>
                    </div>
                  </div>
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

// Import missing icon
import { FileText } from "lucide-react";
