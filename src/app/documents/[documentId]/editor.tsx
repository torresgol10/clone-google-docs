interface DocumentIdPageProps {
    params: Promise<{ documentId: string }>;
}

export default async function documentPage({ params }: DocumentIdPageProps) {
    const { documentId } = await params
    return (
        <div>
            Document Id: {documentId}
        </div>
    )
}