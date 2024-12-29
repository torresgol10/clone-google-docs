import { Room } from "./room";
import Editor from "./editor";
import Navbar from "./navbar";
import Toolbar from "./toolbar";

interface DocumentIdPageProps {
    params: Promise<{ documentId: string }>;
}

export default async function documentIdPage({ params }: DocumentIdPageProps) {
    const { documentId } = await params
    return (
        <div className="min-h-screen bg-[#FAFBFC]">
            <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 tight-0 z-10 bg-[#FAFBFD] print:hidden">
                <Navbar />
                <Toolbar />
            </div>
            <div className="pt-[114px] print:pt-0">
                <Room>
                    <Editor />
                </Room>
            </div>
        </div>
    )
}