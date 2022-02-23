import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationView = ({ page, totalPage, handleChange }) => {
	const handlePreviousPage = () => {
		const newPage = page - 1;
		if (newPage >= 0) {
			handleChange(newPage);
		}
	};

	const handleNextPage = () => {
		const newPage = page + 1;
		if (newPage <= totalPage) {
			handleChange(newPage);
		}
	};
	const renderPageItem = () => {
		const items = [];
		for (let i = 1; i <= totalPage; i++) {
			items.push(i);
		}
		return items;
	};

	const isFirstPage = page === 1 ? true : false;
	const isLastPage = page >= totalPage ? true : false;
	return (
		<Pagination>
			{isFirstPage ? null : (
				<Pagination.Prev onClick={() => handlePreviousPage()} />
			)}
			{renderPageItem().map((item) => (
				<Pagination.Item
					active={item === page ? true : false}
					onClick={() => handleChange(item)}
				>
					{item}
				</Pagination.Item>
			))}
			{/* <Pagination.Item active>{1}</Pagination.Item>
			<Pagination.Item>{2}</Pagination.Item>
			<Pagination.Item>{3}</Pagination.Item>
			<Pagination.Ellipsis />
			<Pagination.Item>{8}</Pagination.Item>
			<Pagination.Item>{9}</Pagination.Item>
			<Pagination.Item>{10}</Pagination.Item> */}
			{isLastPage ? null : <Pagination.Next onClick={() => handleNextPage()} />}
		</Pagination>
	);
};

export default PaginationView;
