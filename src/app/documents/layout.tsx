interface DocumentLayoutProps {
    children: React.ReactNode
}
export default function DocumentLayout({ children }: DocumentLayoutProps) {
    return (
        <div className="flex flex-col gap-y-4">
            <nav className="w-full bg-red-500">Dcoument navbar</nav>
            {children}
        </div>
    )
}