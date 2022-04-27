import { Link } from "react-router-dom";
import { useFilter } from "../../../contexts";
import "./CategoryCard.css";

export const CategoryCard = ({ category }) => {
	const { filterDispatch } = useFilter();

	return (
		<li key={category._id} className="categories__list category_card__list">
			<Link
				onClick={() => {
					filterDispatch({
						type: "CATEGORY",
						payload: category.categoryId,
					});
					console.log("sadf", category.categoryId);
				}}	
				to="/explore"
				className="categories__links"
			>
				<div className="category_card">
					<span className="catergories__name">{category.categoryName}</span>
				</div>
			</Link>
		</li>
	);
};
