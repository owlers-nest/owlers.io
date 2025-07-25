import { HStack } from "@chakra-ui/react";
import { PaginationRoot, PaginationNextTrigger, PaginationItems, PaginationPrevTrigger,  } from "../../components/ui/pagination"

interface Props {
    onPageChange: (currentPage: number) => void;
    limit: number;
    pages: number;
}

const Pagination = ({ onPageChange, limit, pages }: Props) => {
    
    const handleOnPageChange = (details: any) => {
        onPageChange(details.page as number)
    }

    return (
        <PaginationRoot count={pages} pageSize={limit} defaultPage={1} onPageChange={handleOnPageChange}>
            <HStack>
                <PaginationPrevTrigger />
                <PaginationItems />
                <PaginationNextTrigger />
            </HStack>
        </PaginationRoot>
    );
}

export default Pagination;
