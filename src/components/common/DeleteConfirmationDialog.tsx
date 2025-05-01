
import React from "react";
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
import { Button, ButtonProps } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteConfirmationDialogProps {
  title: string;
  description: string;
  itemName: string;
  onConfirm: () => void;
  triggerButtonProps?: ButtonProps;
  triggerButtonText?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  children?: React.ReactNode;
}

export function DeleteConfirmationDialog({
  title,
  description,
  itemName,
  onConfirm,
  triggerButtonProps = { variant: "destructive", size: "sm" },
  triggerButtonText = "Supprimer",
  confirmButtonText = "Supprimer",
  cancelButtonText = "Annuler",
  children,
}: DeleteConfirmationDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children || (
          <Button {...triggerButtonProps}>
            <Trash2 className="mr-2 h-4 w-4" />
            {triggerButtonText}
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}{" "}
            {itemName && <span className="font-semibold">{itemName}</span>}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelButtonText}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {confirmButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
