'use client'

import { type Id } from "../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface RenameDialogProps {
    documentId: Id<"documents">;
    initialTitle: string;
    children: React.ReactNode;
}

export default function RenameDialog({ documentId, initialTitle, children, }: RenameDialogProps) {
    const update = useMutation(api.documents.updateById)
    const [isUpdating, setIsUpdating] = useState(false)

    const [title, setTitle] = useState(initialTitle)
    const [open, setOpen] = useState(false)

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsUpdating(true)

        try {
            await update({
                id: documentId,
                title: title.trim() || "Untitled"
            })
            toast.success("Document renamed ")
        } catch (e) {
            toast.error("Something went wrong")
        }

        setIsUpdating(false)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent onClick={(e) => e.stopPropagation()}>
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            Rename Document
                        </DialogTitle>
                        <DialogDescription>
                            Enter a new name for this document
                        </DialogDescription>
                    </DialogHeader>
                    <div className="my-4">
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Document name"
                            onClick={(e) => { e.stopPropagation() }}
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="ghost"
                            disabled={isUpdating}
                            onClick={(e) => {
                                e.stopPropagation()
                                setOpen(false)
                            }}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isUpdating}
                            onClick={(e) => e.stopPropagation()}>
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}