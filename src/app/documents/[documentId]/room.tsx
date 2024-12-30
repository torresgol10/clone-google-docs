"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import FullscreenLoader from "@/components/fullscreen-loader";
import { getDocuments, getUsers } from "./actions";
import { toast } from "sonner";
import { Id } from "../../../../convex/_generated/dataModel";

type User = {
    id: string;
    name: string;
    avatar: string;
}

export default function Room({ children }: { children: ReactNode }) {
    const params = useParams()

    const [users, setUsers] = useState<User[]>([])

    const fetchUser = useMemo(
        () => async () => {
            try {
                const list = await getUsers()
                setUsers(list)
            } catch {
                toast.error("Failed to fetch users")
            }
        },
        []
    )

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    return (
        <LiveblocksProvider
            authEndpoint={async () => {
                const endpoint = "/api/liveblocks-auth"
                const room = params.documentId as string

                const response = await fetch(endpoint, {
                    method: "POST",
                    body: JSON.stringify({ room })
                })
                return await response.json()
            }}
            throttle={16}
            resolveUsers={({ userIds }) => {
                return userIds.map(
                    (userId) => users.find((user) => user.id === userId) ?? undefined
                )
            }}
            resolveMentionSuggestions={({ text }) => {
                let filteredUsers = users
                if (text) {
                    filteredUsers = users.filter((user) => user.name.toLowerCase().includes(text.toLowerCase()))
                }

                return filteredUsers.map((user) => user.id)
            }}
            resolveRoomsInfo={async ({ roomIds }) => {
                const documents = await getDocuments(roomIds as Id<"documents">[])

                return documents.map((document) => ({
                    id: document.id,
                    name: document.name
                }))
            }}
        >
            <RoomProvider
                id={params.documentId as string}
                initialStorage={{ leftMargin: 56, rightMargin: 56 }}
            >
                <ClientSideSuspense fallback={<FullscreenLoader label="Room loading..." />}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}
