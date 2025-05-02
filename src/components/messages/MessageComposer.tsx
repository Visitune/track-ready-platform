
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, X, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MessageComposerProps {
  conversationId: number;
  onSendMessage: (message: string, files?: File[]) => void;
}

export default function MessageComposer({ conversationId, onSendMessage }: MessageComposerProps) {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleAddAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      
      // Vérifier la taille des fichiers
      const oversizedFiles = newFiles.filter(file => file.size > 10 * 1024 * 1024); // 10 MB
      if (oversizedFiles.length > 0) {
        toast({
          title: "Fichier trop volumineux",
          description: "Les fichiers ne doivent pas dépasser 10 Mo.",
          variant: "destructive",
        });
        return;
      }
      
      // Limiter le nombre total de pièces jointes
      if (attachments.length + newFiles.length > 5) {
        toast({
          title: "Trop de pièces jointes",
          description: "Vous ne pouvez pas ajouter plus de 5 pièces jointes.",
          variant: "destructive",
        });
        return;
      }
      
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    if (!message.trim() && attachments.length === 0) {
      toast({
        title: "Message vide",
        description: "Veuillez saisir un message ou ajouter une pièce jointe.",
        variant: "destructive",
      });
      return;
    }
    
    onSendMessage(message, attachments);
    setMessage("");
    setAttachments([]);
  };

  return (
    <div className="border-t p-4">
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {attachments.map((file, index) => (
            <div key={index} className="flex items-center bg-muted text-sm rounded-md px-2 py-1">
              <span className="truncate max-w-[180px]">{file.name}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5 ml-1" 
                onClick={() => handleRemoveAttachment(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex flex-col gap-2">
        <Textarea
          placeholder="Écrivez votre message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[80px]"
        />
        
        <div className="flex justify-between items-center">
          <div>
            <Input
              type="file"
              id="attachments"
              multiple
              className="hidden"
              onChange={handleAddAttachment}
            />
            <Button 
              variant="outline" 
              size="sm" 
              type="button"
              onClick={() => document.getElementById("attachments")?.click()}
            >
              <Paperclip className="mr-2 h-4 w-4" />
              Pièce jointe
            </Button>
          </div>
          
          <Button onClick={handleSend}>
            <Send className="mr-2 h-4 w-4" />
            Envoyer
          </Button>
        </div>
      </div>
    </div>
  );
}
