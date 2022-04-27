import { useVideo } from "../../contexts";
import "./Filter.css";

export const Filter = () => {
	const {
		videoState: { categories },
	} = useVideo();
	return (
		<form className="filter_section" onSubmit={(e) => e.preventDefault()}>
			<div className="filter_container">
				<button className="filter_button btn--outline--primary">All</button>
				{categories.length > 0
					? categories.map((category) => {
							return (
								<button
									className="filter_button btn--outline--primary"
									key={category._id}
								>
									{category.categoryName}
								</button>
							);
					  })
					: null}
				<button className="filter_button sort_button btn--outline--primary">
					Sort by Date
				</button>
			</div>
		</form>
	);
};
