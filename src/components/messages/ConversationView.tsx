
import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { FileText } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import MessageComposer from "./MessageComposer";
import { useToast } from "@/hooks/use-toast";

export interface Message {
  id: number;
  content: string;
  sender: "system" | "client" | "supplier";
  name?: string;
  timestamp: Date;
  attachment?: string;
}

interface ConversationViewProps {
  conversation: {
    id: number;
    supplier: string;
    subject?: string;
    messages: Message[];
  };
  onArchive: (id: number) => void;
}

export default function ConversationView({ conversation, onArchive }: ConversationViewProps) {
  const { toast } = useToast();

  const handleSendMessage = (messageText: string, files?: File[]) => {
    toast({
      title: "Message envoyé",
      description: `Message envoyé à ${conversation.supplier}`,
    });
    
    // Affiche les fichiers envoyés si présents
    if (files && files.length > 0) {
      console.log("Fichiers joints:", files.map(f => f.name).join(", "));
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-medium">
              {conversation.supplier}
            </h2>
            <p className="text-sm text-muted-foreground">
              {conversation.subject || "Sans sujet"}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => onArchive(conversation.id)}>
            Archiver
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages.map((message) => {
          if (message.sender === "system") {
            return (
              <div
                key={message.id}
                className="text-center text-xs text-muted-foreground py-2"
              >
                {message.content}
                <div>
                  {format(message.timestamp, "dd/MM/yyyy HH:mm", { locale: fr })}
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
              {!isClient && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="text-xs">
                    {conversation.supplier.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`max-w-[80%] ${
                  isClient
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                } rounded-lg p-3`}
              >
                <div className="text-xs font-medium mb-1">
                  {message.name || (isClient ? "Vous" : conversation.supplier)}
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
              
              {isClient && (
                <Avatar className="h-8 w-8 ml-2">
                  <AvatarFallback className="text-xs">
                    Vous
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          );
        })}
      </div>
      
      <MessageComposer 
        conversationId={conversation.id} 
        onSendMessage={handleSendMessage} 
      />
    </div>
  );
}
