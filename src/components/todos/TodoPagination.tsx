import {
    Pagination,
    PaginationContent,
    PaginationItem,

} from "@/components/ui/pagination.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ChevronLeftIcon} from "@heroicons/react/24/solid";
import {ChevronRightIcon} from "@heroicons/react/24/solid";

type propsPagination = {
    currentPage: number
    totalPages: number
    handlePageChange: (page: number) => void;
}
const TodoPagination = ({currentPage, totalPages, handlePageChange}: propsPagination) => {

    return (
        <>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <Button variant="secondary" disabled={currentPage === 1} size="icon"
                                onClick={() => handlePageChange(currentPage - 1)}>
                            <ChevronLeftIcon className="w-5 h-5 object-cover"/>
                        </Button>

                    </PaginationItem>
                    {Array.from({length: totalPages}, (_, index) => (
                        <PaginationItem key={index}>
                            <Button
                                variant={`${currentPage === index + 1 ? 'success' : 'ghost'}`}
                                size="icon"
                                onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </Button>

                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <Button variant="secondary" disabled={currentPage === totalPages}
                                size="icon"
                                onClick={() => handlePageChange(currentPage + 1)}>
                            <ChevronRightIcon className="w-5 h-5 object-cover"/>
                        </Button>

                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    );
};

export default TodoPagination;