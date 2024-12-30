import React, { useRef, useState } from "react";

import { BsCloudCheck, BsCloudSlash } from "react-icons/bs"
import { Id } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";
import { useStatus } from "@liveblocks/react";
import { LoaderIcon } from "lucide-react";

interface DocumentInputProps {
    title: string;
    id: Id<"documents">;
}
export default function DocumentInput({ title, id }: DocumentInputProps) {
    const status = useStatus()
    const [value, setValue] = useState(title)

    const [isError, setIsError] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const mutate = useMutation(api.documents.updateById)

    const debouncedUpdate = useDebounce(async (newValue: string) => {
        if (newValue === title) return

        setIsPending(true)
        try {
            await mutate({ id, title: newValue })
            toast.success('Document updated')
        } catch {
            toast.error('Something went wrong')
        } finally {
            setIsPending(false)
        }
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setValue(newValue)
        debouncedUpdate(newValue)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setIsPending(true)
        try {
            await mutate({ id, title: value })
            toast.success('Document updated')
            setIsEditing(false)
        } catch {
            toast.error('Something went wrong')
        } finally {
            setIsPending(false)
        }
    }

    const showLoader = isPending || status === "connecting" || status === "reconnecting"
    const showError = status === "disconnected"

    return (
        <div className="flex items-center gap-2">
            {isEditing ? (
                <form className="relative w-fit max-w-[50ch]" onSubmit={handleSubmit}>
                    <span className="invisible whitespace-pre px-1.5 text-lg">
                        {value || ' '}
                    </span>
                    <input
                        ref={inputRef}
                        value={value}
                        onChange={onChange}
                        onBlur={() => setIsEditing(true)}
                        className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"
                    />
                </form>
            ) : (
                <span
                    onClick={() => {
                        setIsEditing(true)
                        setTimeout(() => {
                            inputRef.current?.focus()
                        }, 0)
                    }}
                    className="text-lg px-1.5 cursor-pointer truncate">
                    {title}
                </span>
            )}
            {showError && <BsCloudSlash className="size-4" />}
            {!showError && !showLoader && <BsCloudCheck />}
            {showLoader && <LoaderIcon className="size-4 animate-spin text-muted-foreground" />}
            <BsCloudCheck />
        </div >
    )
}