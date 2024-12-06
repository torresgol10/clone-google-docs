import Editor from "./editor";
import Toolbar from "./toolbar";

interface DocumentIdPageProps {
    params: Promise<{ documentId: string }>;
}

export default async function documentIdPage({ params }: DocumentIdPageProps) {
    const { documentId } = await params
    return (
        <div className="min-h-screen bg-[#FAFBFC]">
            <Toolbar />
            <Editor />
        </div>
    )
}