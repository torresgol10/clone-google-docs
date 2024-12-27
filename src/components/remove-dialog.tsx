'use client'

import { AlertDialogAction, AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { type Id } from "../../convex/_generated/dataModel";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";

interface RemoveDialogProps {
    documentId: Id<"documents">;
    children: React.ReactNode
}

export default function RemoveDialog({ documentId, children }: RemoveDialogProps) {
    const remove = useMutation(api.documents.removeById)
    const [isRemoving, setIsRemoving] = useState(false)

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action canot be undone. This will permanently delete your document.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isRemoving}
                        onClick={async (e) => {
                            e.stopPropagation()
                            setIsRemoving(true)
                            await remove({ id: documentId })
                            setIsRemoving(false)
                        }}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}