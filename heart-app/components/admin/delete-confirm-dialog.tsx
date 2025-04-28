"use client"

import { AlertTriangle } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Register } from "@/lib/mock-data"

interface DeleteConfirmDialogProps {
  user: Register
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (userId: string) => void
}

export function DeleteConfirmDialog({ user, open, onOpenChange, onConfirm }: DeleteConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <AlertDialogTitle>Excluir Casal</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            Você tem certeza que deseja excluir o casal <strong>{user.names || user.username}</strong>? Esta ação não
            pode ser desfeita e todos os dados associados serão permanentemente removidos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => onConfirm(user.id)}
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
