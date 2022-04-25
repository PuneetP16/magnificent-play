import { Link } from "react-router-dom";
import "./CategoryCard.css";

export const CategoryCard = ({ category }) => {
	return (
		<li
			key={category._id}
			className="categories__list category_card__list"
		>
			<Link
				// onClick={() =>
				// 	dispatch({
				// 		type: "CATEGORY_SELECTION",
				// 		payload: prodCat.categoryName,
				// 	})
				// }
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
