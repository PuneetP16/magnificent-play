import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { filterAction } from "../../../store/filterSlice";
import "./CategoryCard.css";

export const CategoryCard = ({ category }) => {
	const dispatch = useDispatch();

	return (
		<li key={category._id} className="categories__list category_card__list">
			<Link
				onClick={() => {
					dispatch(filterAction.filterByCategory(category.categoryId));
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
