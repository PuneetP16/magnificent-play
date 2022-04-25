import { CategoryCard } from "../Cards/CategoryCard/CategoryCard";

export const CategoryListing = ({ categories }) => {
	return categories.length > 0
		? categories.map((category) => {
				console.log(category._id);
				return <CategoryCard key={category._id} category={category} />;
		  })
		: null;
};
