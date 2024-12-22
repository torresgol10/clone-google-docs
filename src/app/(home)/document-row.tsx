import { TableRow, TableCell } from "@/components/ui/table";
import { format } from "date-fns"
import { SiGoogledocs } from "react-icons/si"
import { Doc } from "../../../convex/_generated/dataModel";
import { BuildingIcon, CircleUserIcon, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentRowProps {
    document: Doc<"documents">;
}

export default function DocumentRow({ document }: DocumentRowProps) {
    return (
        <TableRow className="cursor-pointer">
            <TableCell className="w-[50px]">
                <SiGoogledocs className="size-6 fill-blue-500" />
            </TableCell>
            <TableCell className="font-medium md:w-[45%]">
                {document.title}
            </TableCell>
            <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
                {document?.orgnizationId ? <BuildingIcon className="size-4" /> : <CircleUserIcon className="size-4" />}
                {document?.orgnizationId ? "Organization" : "Personal"}
            </TableCell>
            <TableCell className="text-muted-foreground hidden md:table-cell">
                {format(new Date(document._creationTime), "MMM dd, yyyy")}
            </TableCell>
            <TableCell className="flex ml-auto justify-end">
                <Button variant='ghost' size="icon" className="rounded-full">
                    <MoreVertical />
                </Button>
            </TableCell>

        </TableRow>
    )
}