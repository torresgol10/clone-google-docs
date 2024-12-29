"use client";

import { ReactNode } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

export function Room({ children }: { children: ReactNode }) {
    const params = useParams()

    return (
        <LiveblocksProvider publicApiKey={"pk_dev_b6nMbFM8nU-9PkZkxaRpO8leQzJYnwO8OyWHDQmFE3rol-R7yoGV5ZFO3AwzL_5r"}>
            <RoomProvider id={params.documentId as string}>
                <ClientSideSuspense fallback={<div>Loading…</div>}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}
