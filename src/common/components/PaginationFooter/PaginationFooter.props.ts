import { NumericLiteral } from "typescript";

export type PaginationFooterProps = {
    totalCount:number,
    pageSize:number,
    currentPage:number,
    onPageChange:(pageNumber:number) => void;
    onPageSizeChange:(pageSize:number) => void;
    pageSizeOptions?:number[];
}