import { usePagination } from "../../../hooks/usePagination";

interface PaginationProps {
    totalPages: number;
    page: number;
    changePage: (p: number) => void;
}


export default function Pagination({totalPages, page, changePage}: PaginationProps) {
    let pagesArray = usePagination(totalPages);

    return (
        <div className="page__wrapper">
            {
                pagesArray.map(p => 
                    <span 
                        key={p}
                        onClick={() => changePage(p)}
                        className={p === page? "page page__current" : "page"}>
                        {p}
                    </span>
                )
            }
        </div>
    );
};