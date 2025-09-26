import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
	page: number;
	totalItems: number;
	perPage: number;
	onPageChange: (page: number) => void;
};

export function DynamicPagination({
	page,
	totalItems,
	perPage,
	onPageChange,
}: Props) {
	const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

	// Calculate which pages to show (max 2 buttons in the middle)
	let pages: number[] = [];
	if (totalPages <= 2) {
		pages = Array.from({ length: totalPages }, (_, i) => i + 1);
	} else if (page === 1) {
		pages = [1, 2];
	} else if (page === totalPages) {
		pages = [totalPages - 1, totalPages];
	} else {
		pages = [page, page + 1];
	}

	return (
		<Pagination className="w-fit mx-0">
			<PaginationContent>
				{/* Previous */}
				<PaginationItem>
					<PaginationPrevious
						href="#"
						aria-disabled={page === 1}
						className={page === 1 ? "pointer-events-none opacity-50" : ""}
						onClick={(e) => {
							e.preventDefault();
							if (page > 1) onPageChange(page - 1);
						}}
					/>
				</PaginationItem>

				{/* Show first page and ellipsis if needed */}
				{page > 2 && totalPages > 2 && (
					<>
						<PaginationItem>
							<PaginationLink
								href="#"
								isActive={page === 1}
								onClick={(e) => {
									e.preventDefault();
									onPageChange(1);
								}}
							>
								1
							</PaginationLink>
						</PaginationItem>
						{page > 3 && <PaginationEllipsis />}
					</>
				)}

				{/* Middle pages */}
				{pages.map((p) => (
					<PaginationItem key={p}>
						<PaginationLink
							href="#"
							isActive={p === page}
							onClick={(e) => {
								e.preventDefault();
								onPageChange(p);
							}}
						>
							{p}
						</PaginationLink>
					</PaginationItem>
				))}

				{/* Show last page and ellipsis if needed */}
				{page < totalPages - 1 && totalPages > 2 && (
					<>
						{page < totalPages - 2 && <PaginationEllipsis />}
						<PaginationItem>
							<PaginationLink
								href="#"
								isActive={page === totalPages}
								onClick={(e) => {
									e.preventDefault();
									onPageChange(totalPages);
								}}
							>
								{totalPages}
							</PaginationLink>
						</PaginationItem>
					</>
				)}

				{/* Next */}
				<PaginationItem>
					<PaginationNext
						href="#"
						aria-disabled={page === totalPages}
						className={
							page === totalPages ? "pointer-events-none opacity-50" : ""
						}
						onClick={(e) => {
							e.preventDefault();
							if (page < totalPages) onPageChange(page + 1);
						}}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
